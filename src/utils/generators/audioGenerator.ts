export class AudioGenerator {
  static generateAudioFile(audioParams: any): Blob {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = Math.min(audioParams.duration, 10);
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate;
        let sample = 0;
        
        audioParams.frequency.forEach((freq: number, index: number) => {
          if (index >= 8) return;
          const amplitude = Math.min(0.1, audioParams.amplitude[index] || 0.05);
          const envelope = Math.exp(-t * 2);
          sample += amplitude * envelope * Math.sin(2 * Math.PI * freq * t);
        });
        
        channelData[i] = Math.max(-1, Math.min(1, sample));
      }
      
      return this.audioBufferToWav(buffer);
    } catch (error) {
      console.error('Error generating audio file:', error);
      throw error;
    }
  }

  static playAudio(audioParams: any): void {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = Math.min(audioParams.duration, 10);
      
      audioParams.frequency.forEach((freq: number, index: number) => {
        if (index >= 8) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = audioParams.timbre as OscillatorType;
        
        const amplitude = Math.min(0.1, audioParams.amplitude[index] || 0.05);
        gainNode.gain.setValueAtTime(amplitude, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + duration);
      });
    } catch (error) {
      console.error('Error playing audio:', error);
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