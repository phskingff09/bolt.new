import { AudioFeatures, TasteProfile, SmellProfile, VisualParameters } from '../../types/synesthesia';

export class AudioConverters {
  static audioToVisual(audioFeatures: AudioFeatures): VisualParameters {
    const colors = this.audioToColors(audioFeatures);
    
    return {
      colors,
      movement: this.normalizeValue(audioFeatures.tempo, 60, 180),
      intensity: audioFeatures.volume,
      complexity: audioFeatures.spectralCentroid / 4000,
      balance: this.calculateHarmonyBalance(audioFeatures.harmony),
      rhythm: audioFeatures.rhythm.slice(0, 16),
      forms: this.determineFormsFromAudio(audioFeatures),
      texture: this.mfccToTexture(audioFeatures.mfcc),
      temperature: this.chromaToTemperature(audioFeatures.chroma)
    };
  }

  static audioToTaste(audioFeatures: AudioFeatures): TasteProfile {
    return {
      sweet: this.frequencyToSweetness(audioFeatures.frequency),
      sour: audioFeatures.spectralCentroid / 4000,
      bitter: (1 - audioFeatures.volume) * 0.8,
      salty: this.rhythmToSaltiness(audioFeatures.rhythm),
      umami: this.harmonicComplexity(audioFeatures.harmony),
      intensity: audioFeatures.volume,
      temperature: this.tempoToTemperature(audioFeatures.tempo),
      texture: this.mfccToTexture(audioFeatures.mfcc)
    };
  }

  static audioToSmell(audioFeatures: AudioFeatures): SmellProfile {
    return {
      floral: this.highFrequencyToFloral(audioFeatures.frequency),
      fruity: this.harmonicRichnessToFruity(audioFeatures.harmony),
      woody: this.lowFrequencyToWoody(audioFeatures.frequency),
      spicy: audioFeatures.spectralCentroid / 4000,
      fresh: audioFeatures.volume * 0.8,
      earthy: this.bassContentToEarthy(audioFeatures.frequency),
      chemical: this.noiseContentToChemical(audioFeatures.mfcc),
      intensity: (audioFeatures.volume + audioFeatures.spectralCentroid / 4000) / 2
    };
  }

  private static audioToColors(audio: AudioFeatures): string[] {
    const colors: string[] = [];
    
    audio.mfcc.forEach((coeff, index) => {
      if (index < 5) {
        const hue = Math.abs(coeff) * 30 + index * 60;
        const saturation = Math.min(100, Math.abs(coeff) * 50 + 50);
        const lightness = 50 + audio.volume * 30;
        colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
      }
    });
    
    const maxChroma = Math.max(...audio.chroma);
    const dominantPitch = audio.chroma.indexOf(maxChroma);
    const pitchHue = dominantPitch * 30;
    colors.push(`hsl(${pitchHue}, 70%, 60%)`);
    
    return colors.length > 0 ? colors : ['hsl(0, 0%, 50%)'];
  }

  private static frequencyToSweetness(frequencies: number[]): number {
    const highFreqs = frequencies.filter(f => f > 1000).length;
    return Math.min(1, highFreqs / frequencies.length * 2);
  }

  private static rhythmToSaltiness(rhythm: number[]): number {
    const variance = this.calculateVariance(rhythm);
    return Math.min(1, variance * 2);
  }

  private static harmonicComplexity(harmonies: number[]): number {
    if (harmonies.length === 0) return 0;
    const complexity = harmonies.reduce((sum, h, i) => sum + h * (i + 1), 0) / harmonies.length;
    return Math.min(1, complexity / 10);
  }

  private static tempoToTemperature(tempo: number): number {
    return this.normalizeValue(tempo, 60, 180);
  }

  private static highFrequencyToFloral(frequencies: number[]): number {
    const highFreqs = frequencies.filter(f => f > 2000);
    const avgHigh = highFreqs.reduce((sum, f) => sum + f, 0) / highFreqs.length || 0;
    return Math.min(1, avgHigh / 4000);
  }

  private static harmonicRichnessToFruity(harmonies: number[]): number {
    const richness = harmonies.reduce((sum, h) => sum + h, 0) / harmonies.length || 0;
    return Math.min(1, richness * 2);
  }

  private static lowFrequencyToWoody(frequencies: number[]): number {
    const lowFreqs = frequencies.filter(f => f < 500).length;
    return Math.min(1, lowFreqs / frequencies.length * 2);
  }

  private static bassContentToEarthy(frequencies: number[]): number {
    const bassFreqs = frequencies.filter(f => f < 200).length;
    return Math.min(1, bassFreqs / frequencies.length * 3);
  }

  private static noiseContentToChemical(mfcc: number[]): number {
    const variance = this.calculateVariance(mfcc);
    return Math.min(1, variance / 5);
  }

  private static mfccToTexture(mfcc: number[]): number {
    const mean = mfcc.reduce((sum, val) => sum + val, 0) / mfcc.length;
    const variance = mfcc.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / mfcc.length;
    return Math.min(1, Math.sqrt(variance) / 10);
  }

  private static chromaToTemperature(chroma: number[]): number {
    const majorKeys = [0, 2, 4, 5, 7, 9, 11];
    let warmth = 0;
    
    majorKeys.forEach(key => {
      warmth += chroma[key];
    });
    
    const totalChroma = chroma.reduce((sum, val) => sum + val, 0);
    return totalChroma > 0 ? warmth / totalChroma : 0.5;
  }

  private static determineFormsFromAudio(audio: AudioFeatures): any[] {
    const forms = [];
    if (audio.harmony.length > 5) forms.push('organic');
    if (audio.tempo > 120) forms.push('geometric');
    if (audio.volume > 0.7) forms.push('abstract');
    if (audio.spectralCentroid > 2000) forms.push('flowing');
    return forms.length > 0 ? forms : ['flowing'];
  }

  private static normalizeValue(value: number, min: number, max: number): number {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }

  private static calculateHarmonyBalance(harmonies: number[]): number {
    if (harmonies.length === 0) return 0.5;
    const variance = this.calculateVariance(harmonies);
    return 1 - Math.min(1, variance / 1000);
  }

  private static calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length;
  }
}