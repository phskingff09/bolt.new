import { TasteProfile, VisualParameters, AudioParameters, SmellProfile } from '../../types/synesthesia';

export class TasteConverters {
  static tasteToVisual(tasteProfile: TasteProfile): VisualParameters {
    const colors = this.tasteToColors(tasteProfile);
    
    return {
      colors,
      movement: tasteProfile.sour * 0.8 + tasteProfile.bitter * 0.3,
      intensity: tasteProfile.intensity,
      complexity: (tasteProfile.umami + tasteProfile.bitter) * 0.5,
      balance: tasteProfile.sweet * 0.6 + tasteProfile.salty * 0.4,
      rhythm: this.tasteToRhythm(tasteProfile),
      forms: this.determineFormsFromTaste(tasteProfile),
      texture: tasteProfile.texture,
      temperature: tasteProfile.temperature
    };
  }

  static tasteToAudio(tasteProfile: TasteProfile): AudioParameters {
    const frequencies: number[] = [];
    const amplitudes: number[] = [];
    
    // Map taste components to specific frequencies with proper scaling
    if (tasteProfile.sweet > 0.1) {
      const freq = 523.25 + (tasteProfile.sweet * 200); // C5 + variation
      frequencies.push(freq);
      amplitudes.push(tasteProfile.sweet * 0.8);
    }
    if (tasteProfile.sour > 0.1) {
      const freq = 1046.5 + (tasteProfile.sour * 400); // C6 + variation
      frequencies.push(freq);
      amplitudes.push(tasteProfile.sour * 0.6);
    }
    if (tasteProfile.bitter > 0.1) {
      const freq = 146.83 + (tasteProfile.bitter * 100); // D3 + variation
      frequencies.push(freq);
      amplitudes.push(tasteProfile.bitter * 0.7);
    }
    if (tasteProfile.salty > 0.1) {
      const freq = 329.63 + (tasteProfile.salty * 150); // E4 + variation
      frequencies.push(freq);
      amplitudes.push(tasteProfile.salty * 0.5);
    }
    if (tasteProfile.umami > 0.1) {
      const freq = 220 + (tasteProfile.umami * 180); // A3 + variation
      frequencies.push(freq);
      amplitudes.push(tasteProfile.umami * 0.6);
    }
    
    // Ensure we have at least one frequency
    if (frequencies.length === 0) {
      frequencies.push(440);
      amplitudes.push(0.3);
    }
    
    return {
      frequency: frequencies,
      amplitude: amplitudes,
      harmonics: [0.5, 0.3, 0.2, 0.1],
      tempo: Math.round(60 + tasteProfile.intensity * 120),
      timbre: tasteProfile.texture > 0.5 ? 'sawtooth' : 'sine',
      duration: 3 + tasteProfile.intensity * 5
    };
  }

  static tasteToSmell(tasteProfile: TasteProfile): SmellProfile {
    return {
      floral: tasteProfile.sweet * 0.8,
      fruity: (tasteProfile.sweet + tasteProfile.sour) / 2,
      woody: tasteProfile.bitter * 0.7,
      spicy: tasteProfile.sour * 0.6,
      fresh: (tasteProfile.sour + tasteProfile.salty) / 2,
      earthy: tasteProfile.umami * 0.8,
      chemical: tasteProfile.bitter * 0.4,
      intensity: tasteProfile.intensity
    };
  }

  private static tasteToColors(taste: TasteProfile): string[] {
    const colors: string[] = [];
    
    if (taste.sweet > 0.3) colors.push('#f472b6', '#fbbf24');
    if (taste.sour > 0.3) colors.push('#22d3ee', '#84cc16');
    if (taste.bitter > 0.3) colors.push('#6b21a8', '#1f2937');
    if (taste.umami > 0.3) colors.push('#059669', '#92400e');
    if (taste.salty > 0.3) colors.push('#e5e7eb', '#9ca3af');
    
    return colors.length > 0 ? colors : ['#6b7280'];
  }

  private static tasteToRhythm(taste: TasteProfile): number[] {
    const rhythm: number[] = [];
    const length = Math.floor(8 + taste.intensity * 16);
    
    for (let i = 0; i < length; i++) {
      let value = 0.5;
      value += taste.sweet * Math.sin(i * 0.5) * 0.3;
      value += taste.sour * Math.sin(i * 1.2) * 0.4;
      value += taste.bitter * Math.sin(i * 0.3) * 0.2;
      rhythm.push(Math.max(0, Math.min(1, value)));
    }
    
    return rhythm;
  }

  private static determineFormsFromTaste(taste: TasteProfile): any[] {
    const forms = [];
    if (taste.sweet > 0.5) forms.push('organic');
    if (taste.sour > 0.5) forms.push('geometric');
    if (taste.bitter > 0.5) forms.push('abstract');
    if (taste.texture > 0.5) forms.push('flowing');
    return forms.length > 0 ? forms : ['flowing'];
  }
}