import { EmotionalState, VisualParameters, TasteProfile, SmellProfile, AudioParameters } from '../../types/synesthesia';

export class EmotionConverters {
  static emotionToVisual(emotionalState: EmotionalState): VisualParameters {
    const colors = this.emotionToColors(emotionalState);
    
    return {
      colors,
      movement: emotionalState.excitement * 0.7 + emotionalState.anger * 0.8,
      intensity: (emotionalState.joy + emotionalState.anger + emotionalState.excitement) / 3,
      complexity: emotionalState.contemplation * 0.8 + emotionalState.melancholy * 0.6,
      balance: emotionalState.peace * 0.9 + emotionalState.contemplation * 0.5,
      rhythm: this.emotionToRhythm(emotionalState),
      forms: this.determineFormsFromEmotion(emotionalState),
      texture: emotionalState.contemplation,
      temperature: (emotionalState.joy + emotionalState.anger) / 2
    };
  }

  static emotionToTaste(emotionalState: EmotionalState): TasteProfile {
    return {
      sweet: emotionalState.joy * 0.9,
      sour: emotionalState.anger * 0.6 + emotionalState.excitement * 0.3,
      bitter: emotionalState.melancholy * 0.8 + emotionalState.anger * 0.4,
      salty: emotionalState.contemplation * 0.5,
      umami: emotionalState.peace * 0.7,
      intensity: (emotionalState.joy + emotionalState.anger + emotionalState.excitement) / 3,
      temperature: (emotionalState.joy + emotionalState.anger) / 2,
      texture: emotionalState.contemplation * 0.8
    };
  }

  static emotionToSmell(emotionalState: EmotionalState): SmellProfile {
    return {
      floral: emotionalState.joy * 0.8 + emotionalState.peace * 0.6,
      fruity: emotionalState.joy * 0.7 + emotionalState.excitement * 0.5,
      woody: emotionalState.contemplation * 0.8 + emotionalState.peace * 0.4,
      spicy: emotionalState.anger * 0.9 + emotionalState.excitement * 0.6,
      fresh: emotionalState.peace * 0.9 + emotionalState.joy * 0.5,
      earthy: emotionalState.melancholy * 0.7 + emotionalState.contemplation * 0.6,
      chemical: emotionalState.anger * 0.5,
      intensity: (emotionalState.joy + emotionalState.anger + emotionalState.excitement) / 3
    };
  }

  static emotionToAudio(emotionalState: EmotionalState): AudioParameters {
    const frequencies: number[] = [];
    const amplitudes: number[] = [];
    
    // Map emotions to specific frequencies with proper scaling
    if (emotionalState.joy > 0.1) {
      const freq = 523.25 + (emotionalState.joy * 400); // C5 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.joy * 0.8);
    }
    if (emotionalState.melancholy > 0.1) {
      const freq = 196 + (emotionalState.melancholy * 150); // G3 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.melancholy * 0.6);
    }
    if (emotionalState.anger > 0.1) {
      const freq = 1174.66 + (emotionalState.anger * 500); // D6 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.anger * 0.7);
    }
    if (emotionalState.peace > 0.1) {
      const freq = 329.63 + (emotionalState.peace * 200); // E4 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.peace * 0.5);
    }
    if (emotionalState.excitement > 0.1) {
      const freq = 880 + (emotionalState.excitement * 600); // A5 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.excitement * 0.9);
    }
    if (emotionalState.contemplation > 0.1) {
      const freq = 246.94 + (emotionalState.contemplation * 180); // B3 + variation
      frequencies.push(freq);
      amplitudes.push(emotionalState.contemplation * 0.4);
    }
    
    // Ensure we have at least one frequency
    if (frequencies.length === 0) {
      frequencies.push(440);
      amplitudes.push(0.3);
    }
    
    return {
      frequency: frequencies,
      amplitude: amplitudes,
      harmonics: [0.7, 0.5, 0.3, 0.2],
      tempo: Math.round(60 + (emotionalState.excitement + emotionalState.anger) * 80),
      timbre: emotionalState.anger > 0.5 ? 'square' : 'sine',
      duration: 4 + (emotionalState.joy + emotionalState.peace) * 4
    };
  }

  private static emotionToColors(emotion: EmotionalState): string[] {
    const colors: string[] = [];
    
    if (emotion.joy > 0.3) colors.push('#fbbf24', '#f59e0b');
    if (emotion.melancholy > 0.3) colors.push('#1e40af', '#3730a3');
    if (emotion.anger > 0.3) colors.push('#dc2626', '#b91c1c');
    if (emotion.peace > 0.3) colors.push('#059669', '#047857');
    if (emotion.excitement > 0.3) colors.push('#7c2d12', '#ea580c');
    if (emotion.contemplation > 0.3) colors.push('#7c3aed', '#5b21b6');
    
    return colors.length > 0 ? colors : ['#6b7280'];
  }

  private static emotionToRhythm(emotion: EmotionalState): number[] {
    const rhythm: number[] = [];
    const length = Math.floor(8 + emotion.excitement * 16);
    
    for (let i = 0; i < length; i++) {
      let value = 0.5;
      value += emotion.joy * Math.sin(i * 0.8) * 0.4;
      value += emotion.anger * Math.sin(i * 2.0) * 0.5;
      value += emotion.peace * Math.sin(i * 0.2) * 0.3;
      rhythm.push(Math.max(0, Math.min(1, value)));
    }
    
    return rhythm;
  }

  private static determineFormsFromEmotion(emotion: EmotionalState): any[] {
    const forms = [];
    if (emotion.peace > 0.5) forms.push('organic');
    if (emotion.anger > 0.5) forms.push('geometric');
    if (emotion.contemplation > 0.5) forms.push('abstract');
    if (emotion.joy > 0.5) forms.push('flowing');
    return forms.length > 0 ? forms : ['flowing'];
  }
}