import { SmellProfile, VisualParameters, AudioParameters, TasteProfile } from '../../types/synesthesia';

export class SmellConverters {
  static smellToVisual(smellProfile: SmellProfile): VisualParameters {
    const colors = this.smellToColors(smellProfile);
    
    return {
      colors,
      movement: smellProfile.spicy * 0.8 + smellProfile.fresh * 0.6,
      intensity: smellProfile.intensity,
      complexity: (smellProfile.woody + smellProfile.chemical) * 0.5,
      balance: smellProfile.floral * 0.7 + smellProfile.fresh * 0.5,
      rhythm: this.smellToRhythm(smellProfile),
      forms: this.determineFormsFromSmell(smellProfile),
      texture: (smellProfile.woody + smellProfile.earthy) / 2,
      temperature: (smellProfile.spicy + smellProfile.fresh) / 2
    };
  }

  static smellToAudio(smellProfile: SmellProfile): AudioParameters {
    const frequencies: number[] = [];
    const amplitudes: number[] = [];
    
    // Map smell components to specific frequencies with proper scaling
    if (smellProfile.floral > 0.1) {
      const freq = 659.25 + (smellProfile.floral * 300); // E5 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.floral * 0.7);
    }
    if (smellProfile.fruity > 0.1) {
      const freq = 783.99 + (smellProfile.fruity * 250); // G5 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.fruity * 0.8);
    }
    if (smellProfile.woody > 0.1) {
      const freq = 196 + (smellProfile.woody * 120); // G3 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.woody * 0.6);
    }
    if (smellProfile.spicy > 0.1) {
      const freq = 1174.66 + (smellProfile.spicy * 400); // D6 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.spicy * 0.5);
    }
    if (smellProfile.fresh > 0.1) {
      const freq = 880 + (smellProfile.fresh * 320); // A5 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.fresh * 0.7);
    }
    if (smellProfile.earthy > 0.1) {
      const freq = 164.81 + (smellProfile.earthy * 80); // E3 + variation
      frequencies.push(freq);
      amplitudes.push(smellProfile.earthy * 0.6);
    }
    
    // Ensure we have at least one frequency
    if (frequencies.length === 0) {
      frequencies.push(440);
      amplitudes.push(0.3);
    }
    
    return {
      frequency: frequencies,
      amplitude: amplitudes,
      harmonics: [0.6, 0.4, 0.3, 0.2],
      tempo: Math.round(70 + smellProfile.intensity * 100),
      timbre: smellProfile.chemical > 0.5 ? 'square' : 'triangle',
      duration: 4 + smellProfile.intensity * 6
    };
  }

  static smellToTaste(smellProfile: SmellProfile): TasteProfile {
    return {
      sweet: (smellProfile.floral + smellProfile.fruity) / 2,
      sour: smellProfile.fresh * 0.7,
      bitter: (smellProfile.woody + smellProfile.chemical) / 2,
      salty: smellProfile.earthy * 0.6,
      umami: smellProfile.earthy * 0.8,
      intensity: smellProfile.intensity,
      temperature: (smellProfile.spicy + smellProfile.fresh) / 2,
      texture: smellProfile.woody * 0.8
    };
  }

  private static smellToColors(smell: SmellProfile): string[] {
    const colors: string[] = [];
    
    if (smell.floral > 0.3) colors.push('#ec4899', '#f97316');
    if (smell.fruity > 0.3) colors.push('#f59e0b', '#84cc16');
    if (smell.woody > 0.3) colors.push('#92400e', '#451a03');
    if (smell.spicy > 0.3) colors.push('#dc2626', '#ea580c');
    if (smell.fresh > 0.3) colors.push('#06b6d4', '#10b981');
    if (smell.earthy > 0.3) colors.push('#78716c', '#57534e');
    if (smell.chemical > 0.3) colors.push('#6b7280', '#374151');
    
    return colors.length > 0 ? colors : ['#6b7280'];
  }

  private static smellToRhythm(smell: SmellProfile): number[] {
    const rhythm: number[] = [];
    const length = Math.floor(8 + smell.intensity * 16);
    
    for (let i = 0; i < length; i++) {
      let value = 0.5;
      value += smell.floral * Math.sin(i * 0.6) * 0.3;
      value += smell.spicy * Math.sin(i * 1.5) * 0.4;
      value += smell.fresh * Math.sin(i * 0.4) * 0.3;
      rhythm.push(Math.max(0, Math.min(1, value)));
    }
    
    return rhythm;
  }

  private static determineFormsFromSmell(smell: SmellProfile): any[] {
    const forms = [];
    if (smell.floral > 0.5) forms.push('organic');
    if (smell.chemical > 0.5) forms.push('geometric');
    if (smell.woody > 0.5) forms.push('abstract');
    if (smell.fresh > 0.5) forms.push('flowing');
    return forms.length > 0 ? forms : ['flowing'];
  }
}