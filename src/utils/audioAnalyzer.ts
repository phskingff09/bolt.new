import * as Tone from 'tone';

export class AudioAnalyzer {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  async analyzeAudioFile(file: File): Promise<any> {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    return {
      tempo: this.calculateTempo(channelData, sampleRate),
      pitch: this.extractPitches(channelData, sampleRate),
      volume: this.calculateRMS(channelData),
      harmony: this.extractHarmonics(channelData, sampleRate),
      rhythm: this.extractRhythm(channelData, sampleRate),
      frequency: this.getFrequencySpectrum(channelData),
      spectralCentroid: this.calculateSpectralCentroid(channelData, sampleRate),
      spectralRolloff: this.calculateSpectralRolloff(channelData, sampleRate),
      mfcc: this.calculateMFCC(channelData, sampleRate),
      chroma: this.calculateChroma(channelData, sampleRate),
      tonnetz: this.calculateTonnetz(channelData, sampleRate)
    };
  }

  private calculateTempo(data: Float32Array, sampleRate: number): number {
    const windowSize = Math.floor(sampleRate * 0.1); // 100ms windows
    const hopSize = Math.floor(windowSize / 2);
    const onsets: number[] = [];
    
    for (let i = 0; i < data.length - windowSize; i += hopSize) {
      const window = data.slice(i, i + windowSize);
      const energy = this.calculateRMS(window);
      
      if (i > 0) {
        const prevWindow = data.slice(i - hopSize, i - hopSize + windowSize);
        const prevEnergy = this.calculateRMS(prevWindow);
        
        if (energy > prevEnergy * 1.3) { // Onset detection threshold
          onsets.push(i / sampleRate);
        }
      }
    }
    
    if (onsets.length < 2) return 120; // Default tempo
    
    const intervals = onsets.slice(1).map((onset, i) => onset - onsets[i]);
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    
    return Math.round(60 / avgInterval); // Convert to BPM
  }

  private extractPitches(data: Float32Array, sampleRate: number): number[] {
    const windowSize = 2048;
    const pitches: number[] = [];
    
    for (let i = 0; i < data.length - windowSize; i += windowSize / 2) {
      const window = data.slice(i, i + windowSize);
      const pitch = this.autocorrelationPitch(window, sampleRate);
      if (pitch > 0) pitches.push(pitch);
    }
    
    return pitches;
  }

  private autocorrelationPitch(buffer: Float32Array, sampleRate: number): number {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    const GOOD_ENOUGH_CORRELATION = 0.9;

    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    
    if (rms < 0.01) return -1;

    let lastCorrelation = 1;
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
      }
      correlation = 1 - (correlation / MAX_SAMPLES);
      
      if (correlation > GOOD_ENOUGH_CORRELATION && correlation > lastCorrelation) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        const shift = (bestCorrelation - lastCorrelation) / (2 * (2 * bestCorrelation - lastCorrelation - correlation));
        return sampleRate / (bestOffset + shift);
      }
      lastCorrelation = correlation;
    }
    
    if (bestCorrelation > 0.01) {
      return sampleRate / bestOffset;
    }
    return -1;
  }

  private calculateRMS(data: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
    }
    return Math.sqrt(sum / data.length);
  }

  private extractHarmonics(data: Float32Array, sampleRate: number): number[] {
    const fft = this.performFFT(data);
    const harmonics: number[] = [];
    const fundamentalFreq = this.findFundamentalFrequency(fft, sampleRate);
    
    for (let harmonic = 2; harmonic <= 10; harmonic++) {
      const harmonicFreq = fundamentalFreq * harmonic;
      const bin = Math.round(harmonicFreq * fft.length / sampleRate);
      if (bin < fft.length) {
        harmonics.push(fft[bin]);
      }
    }
    
    return harmonics;
  }

  private extractRhythm(data: Float32Array, sampleRate: number): number[] {
    const beatTracker = this.detectBeats(data, sampleRate);
    return beatTracker.slice(0, 16); // Return first 16 beat strengths
  }

  private detectBeats(data: Float32Array, sampleRate: number): number[] {
    const windowSize = Math.floor(sampleRate * 0.05); // 50ms windows
    const beats: number[] = [];
    
    for (let i = 0; i < data.length - windowSize; i += windowSize) {
      const window = data.slice(i, i + windowSize);
      const energy = this.calculateRMS(window);
      beats.push(energy);
    }
    
    return beats;
  }

  private getFrequencySpectrum(data: Float32Array): number[] {
    return this.performFFT(data).slice(0, 64); // Return first 64 frequency bins
  }

  private performFFT(data: Float32Array): number[] {
    // Simple FFT implementation for frequency analysis
    const N = data.length;
    const spectrum: number[] = new Array(N / 2);
    
    for (let k = 0; k < N / 2; k++) {
      let real = 0;
      let imag = 0;
      
      for (let n = 0; n < N; n++) {
        const angle = -2 * Math.PI * k * n / N;
        real += data[n] * Math.cos(angle);
        imag += data[n] * Math.sin(angle);
      }
      
      spectrum[k] = Math.sqrt(real * real + imag * imag);
    }
    
    return spectrum;
  }

  private findFundamentalFrequency(spectrum: number[], sampleRate: number): number {
    let maxMagnitude = 0;
    let fundamentalBin = 0;
    
    for (let i = 1; i < spectrum.length; i++) {
      if (spectrum[i] > maxMagnitude) {
        maxMagnitude = spectrum[i];
        fundamentalBin = i;
      }
    }
    
    return fundamentalBin * sampleRate / (spectrum.length * 2);
  }

  private calculateSpectralCentroid(data: Float32Array, sampleRate: number): number {
    const spectrum = this.performFFT(data);
    let weightedSum = 0;
    let magnitudeSum = 0;
    
    for (let i = 0; i < spectrum.length; i++) {
      const frequency = i * sampleRate / (spectrum.length * 2);
      weightedSum += frequency * spectrum[i];
      magnitudeSum += spectrum[i];
    }
    
    return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
  }

  private calculateSpectralRolloff(data: Float32Array, sampleRate: number): number {
    const spectrum = this.performFFT(data);
    const totalEnergy = spectrum.reduce((sum, mag) => sum + mag, 0);
    const threshold = totalEnergy * 0.85; // 85% rolloff
    
    let cumulativeEnergy = 0;
    for (let i = 0; i < spectrum.length; i++) {
      cumulativeEnergy += spectrum[i];
      if (cumulativeEnergy >= threshold) {
        return i * sampleRate / (spectrum.length * 2);
      }
    }
    
    return sampleRate / 2; // Nyquist frequency
  }

  private calculateMFCC(data: Float32Array, sampleRate: number): number[] {
    // Simplified MFCC calculation
    const spectrum = this.performFFT(data);
    const melFilters = this.createMelFilterBank(spectrum.length, sampleRate);
    const mfcc: number[] = [];
    
    for (let i = 0; i < 13; i++) { // 13 MFCC coefficients
      let sum = 0;
      for (let j = 0; j < spectrum.length; j++) {
        sum += spectrum[j] * melFilters[i][j];
      }
      mfcc.push(Math.log(sum + 1e-10)); // Add small value to avoid log(0)
    }
    
    return mfcc;
  }

  private createMelFilterBank(spectrumLength: number, sampleRate: number): number[][] {
    const numFilters = 13;
    const filters: number[][] = [];
    
    for (let i = 0; i < numFilters; i++) {
      const filter = new Array(spectrumLength).fill(0);
      const centerFreq = 1000 * Math.pow(2, i / 12); // Mel scale approximation
      const centerBin = Math.round(centerFreq * spectrumLength * 2 / sampleRate);
      
      // Triangular filter
      for (let j = Math.max(0, centerBin - 10); j < Math.min(spectrumLength, centerBin + 10); j++) {
        filter[j] = 1 - Math.abs(j - centerBin) / 10;
      }
      
      filters.push(filter);
    }
    
    return filters;
  }

  private calculateChroma(data: Float32Array, sampleRate: number): number[] {
    const spectrum = this.performFFT(data);
    const chroma = new Array(12).fill(0); // 12 pitch classes
    
    for (let i = 1; i < spectrum.length; i++) {
      const frequency = i * sampleRate / (spectrum.length * 2);
      const pitchClass = Math.round(12 * Math.log2(frequency / 440)) % 12;
      if (pitchClass >= 0) {
        chroma[pitchClass] += spectrum[i];
      }
    }
    
    return chroma;
  }

  private calculateTonnetz(data: Float32Array, sampleRate: number): number[] {
    const chroma = this.calculateChroma(data, sampleRate);
    const tonnetz: number[] = [];
    
    // Tonal centroid features based on chroma
    const r1 = Math.sin(Math.PI * 7 / 6);
    const r2 = Math.cos(Math.PI * 7 / 6);
    const r3 = Math.sin(Math.PI * 3 / 2);
    
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0;
    
    for (let i = 0; i < 12; i++) {
      const angle = i * Math.PI / 6;
      x1 += chroma[i] * Math.cos(angle);
      y1 += chroma[i] * Math.sin(angle);
      x2 += chroma[i] * Math.cos(angle * 2);
      y2 += chroma[i] * Math.sin(angle * 2);
      x3 += chroma[i] * Math.cos(angle * 3);
      y3 += chroma[i] * Math.sin(angle * 3);
    }
    
    tonnetz.push(x1, y1, x2, y2, x3, y3);
    return tonnetz;
  }
}