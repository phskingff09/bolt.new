export class ContinuousAudioGenerator {
  private static audioContext: AudioContext | null = null;
  private static masterGain: GainNode | null = null;
  private static oscillators: OscillatorNode[] = [];
  private static gainNodes: GainNode[] = [];
  private static isPlaying = false;
  private static currentParams: any = null;

  static async initializeAudio(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Lower volume
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  static async startContinuousAudio(audioParams: any): Promise<void> {
    await this.initializeAudio();
    
    if (this.isPlaying) {
      this.updateAudioParams(audioParams);
      return;
    }

    this.isPlaying = true;
    this.currentParams = audioParams;
    this.createOscillators(audioParams);
  }

  static stopContinuousAudio(): void {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    
    this.gainNodes.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {
        // Gain node might already be disconnected
      }
    });
    
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
    this.currentParams = null;
  }

  static updateAudioParams(audioParams: any): void {
    if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

    // Store new parameters
    this.currentParams = audioParams;

    // Smoothly update existing oscillators
    const currentTime = this.audioContext.currentTime;
    const transitionTime = 0.1; // 100ms transition

    // Update frequencies and amplitudes of existing oscillators
    for (let i = 0; i < Math.min(this.oscillators.length, audioParams.frequency.length); i++) {
      const oscillator = this.oscillators[i];
      const gainNode = this.gainNodes[i];
      
      if (oscillator && gainNode) {
        // Update frequency smoothly
        const newFreq = Math.max(80, Math.min(2000, audioParams.frequency[i] || 440));
        oscillator.frequency.linearRampToValueAtTime(newFreq, currentTime + transitionTime);
        
        // Update amplitude smoothly
        const newAmplitude = Math.min(0.06, (audioParams.amplitude[i] || 0.05) * 0.6);
        gainNode.gain.linearRampToValueAtTime(newAmplitude, currentTime + transitionTime);
      }
    }

    // If we need more oscillators, create them
    if (audioParams.frequency.length > this.oscillators.length) {
      this.addOscillators(audioParams, this.oscillators.length);
    }
    
    // If we have too many oscillators, remove some
    if (audioParams.frequency.length < this.oscillators.length) {
      this.removeExcessOscillators(audioParams.frequency.length);
    }
  }

  private static createOscillators(audioParams: any): void {
    if (!this.audioContext || !this.masterGain) return;

    const currentTime = this.audioContext.currentTime;
    
    // Limit to 6 oscillators for performance
    const maxOscillators = Math.min(6, audioParams.frequency.length);
    
    for (let i = 0; i < maxOscillators; i++) {
      this.createSingleOscillator(audioParams, i, currentTime);
    }
  }

  private static createSingleOscillator(audioParams: any, index: number, startTime: number): void {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    // Set frequency with bounds checking
    const frequency = Math.max(80, Math.min(2000, audioParams.frequency[index] || 440));
    oscillator.frequency.setValueAtTime(frequency, startTime);
    
    // Set waveform based on timbre or index
    const waveforms: OscillatorType[] = ['sine', 'triangle', 'sawtooth'];
    let waveformIndex = 0;
    
    if (audioParams.timbre) {
      switch (audioParams.timbre) {
        case 'sine': waveformIndex = 0; break;
        case 'triangle': waveformIndex = 1; break;
        case 'sawtooth': waveformIndex = 2; break;
        case 'square': waveformIndex = 2; break; // Use sawtooth instead of square for smoother sound
        default: waveformIndex = index % waveforms.length;
      }
    } else {
      waveformIndex = index % waveforms.length;
    }
    
    oscillator.type = waveforms[waveformIndex];
    
    // Set amplitude with smooth envelope and bounds checking
    const amplitude = Math.min(0.06, (audioParams.amplitude[index] || 0.05) * 0.6);
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(amplitude, startTime + 0.1);
    
    // Add subtle vibrato for organic feel
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    
    lfo.frequency.setValueAtTime(3 + Math.random() * 2, startTime); // 3-5 Hz vibrato
    lfoGain.gain.setValueAtTime(frequency * 0.005, startTime); // 0.5% vibrato depth
    lfo.type = 'sine';
    
    oscillator.start(startTime);
    lfo.start(startTime);
    
    this.oscillators.push(oscillator);
    this.gainNodes.push(gainNode);
  }

  private static addOscillators(audioParams: any, startIndex: number): void {
    if (!this.audioContext) return;

    const currentTime = this.audioContext.currentTime;
    const maxOscillators = Math.min(6, audioParams.frequency.length);
    
    for (let i = startIndex; i < maxOscillators; i++) {
      this.createSingleOscillator(audioParams, i, currentTime);
    }
  }

  private static removeExcessOscillators(targetCount: number): void {
    const currentTime = this.audioContext?.currentTime || 0;
    
    while (this.oscillators.length > targetCount && this.oscillators.length > 0) {
      const oscillator = this.oscillators.pop();
      const gainNode = this.gainNodes.pop();
      
      if (oscillator && gainNode) {
        // Fade out before stopping
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.1);
        
        setTimeout(() => {
          try {
            oscillator.stop();
            oscillator.disconnect();
            gainNode.disconnect();
          } catch (e) {
            // Already stopped/disconnected
          }
        }, 150);
      }
    }
  }

  static isAudioPlaying(): boolean {
    return this.isPlaying;
  }

  static async toggleAudio(audioParams: any): Promise<boolean> {
    if (this.isPlaying) {
      this.stopContinuousAudio();
      return false;
    } else {
      await this.startContinuousAudio(audioParams);
      return true;
    }
  }

  static getCurrentParams(): any {
    return this.currentParams;
  }
}