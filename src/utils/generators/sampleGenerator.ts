export class SampleGenerator {
  static async generateSampleAudio(): Promise<File> {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 3;
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate;
        channelData[i] = 
          0.3 * Math.sin(2 * Math.PI * 440 * t) +
          0.2 * Math.sin(2 * Math.PI * 554.37 * t) +
          0.15 * Math.sin(2 * Math.PI * 659.25 * t) +
          0.1 * Math.sin(2 * Math.PI * 880 * t);
      }
      
      const wavBlob = this.audioBufferToWav(buffer);
      return new File([wavBlob], 'sample-chord.wav', { type: 'audio/wav' });
    } catch (error) {
      console.error('Failed to generate sample audio:', error);
      throw error;
    }
  }

  static async loadSampleImage(): Promise<File> {
    try {
      const response = await fetch('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800');
      const blob = await response.blob();
      return new File([blob], 'sample-sunset.jpg', { type: 'image/jpeg' });
    } catch (error) {
      console.error('Failed to load sample image:', error);
      throw error;
    }
  }

  private static audioBufferToWav(buffer: AudioBuffer): Blob {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channelData = buffer.getChannelData(0);
    
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }
}