import { ImageFeatures, TasteProfile, SmellProfile, AudioParameters } from '../../types/synesthesia';

export class ImageConverters {
  static imageToAudio(imageFeatures: ImageFeatures): AudioParameters {
    const baseFreq = 440;
    const frequencies: number[] = [];
    const amplitudes: number[] = [];
    
    imageFeatures.dominantColors.forEach((color, index) => {
      const hue = this.colorToHue(color);
      const freq = baseFreq * Math.pow(2, (hue / 360) * 2);
      frequencies.push(freq);
      amplitudes.push(imageFeatures.brightness * (1 - index * 0.1));
    });
    
    const harmonics = imageFeatures.spatialFrequency.slice(0, 10).map(sf => sf / 100);
    
    return {
      frequency: frequencies,
      amplitude: amplitudes,
      harmonics,
      tempo: Math.round(60 + imageFeatures.complexity * 120),
      timbre: this.textureToTimbre(imageFeatures.texture),
      duration: 5 + imageFeatures.edges * 10
    };
  }

  static imageToTaste(imageFeatures: ImageFeatures): TasteProfile {
    const dominantHues = this.extractHuesFromColors(imageFeatures.dominantColors);
    
    return {
      sweet: this.hueToSweetness(dominantHues),
      sour: imageFeatures.contrast * 0.8,
      bitter: (1 - imageFeatures.brightness) * 0.7,
      salty: imageFeatures.edges * 0.6,
      umami: imageFeatures.texture * 0.5,
      intensity: imageFeatures.saturation,
      temperature: this.brightnessToTemperature(imageFeatures.brightness),
      texture: imageFeatures.texture
    };
  }

  static imageToSmell(imageFeatures: ImageFeatures): SmellProfile {
    const dominantHues = this.extractHuesFromColors(imageFeatures.dominantColors);
    
    return {
      floral: this.hueToFloral(dominantHues),
      fruity: this.saturationToFruity(imageFeatures.saturation),
      woody: this.textureToWoody(imageFeatures.texture),
      spicy: imageFeatures.contrast * 0.7,
      fresh: imageFeatures.brightness * 0.8,
      earthy: (1 - imageFeatures.brightness) * imageFeatures.texture,
      chemical: imageFeatures.complexity * 0.3,
      intensity: (imageFeatures.saturation + imageFeatures.contrast) / 2
    };
  }

  private static colorToHue(color: string): number {
    const match = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (!match) return 0;
    
    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    if (delta === 0) return 0;
    
    let hue = 0;
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    
    return (hue * 60 + 360) % 360;
  }

  private static textureToTimbre(texture: number): string {
    if (texture < 0.25) return 'sine';
    if (texture < 0.5) return 'triangle';
    if (texture < 0.75) return 'sawtooth';
    return 'square';
  }

  private static extractHuesFromColors(colors: string[]): number[] {
    return colors.map(color => this.colorToHue(color));
  }

  private static hueToSweetness(hues: number[]): number {
    let sweetness = 0;
    hues.forEach(hue => {
      if ((hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)) {
        sweetness += 0.8;
      } else if (hue >= 60 && hue <= 120) {
        sweetness += 0.3;
      }
    });
    return Math.min(1, sweetness / hues.length);
  }

  private static brightnessToTemperature(brightness: number): number {
    return brightness;
  }

  private static hueToFloral(hues: number[]): number {
    let floral = 0;
    hues.forEach(hue => {
      if (hue >= 270 && hue <= 330) {
        floral += 0.9;
      } else if (hue >= 330 && hue <= 360) {
        floral += 0.6;
      }
    });
    return Math.min(1, floral / hues.length);
  }

  private static saturationToFruity(saturation: number): number {
    return saturation;
  }

  private static textureToWoody(texture: number): number {
    return texture;
  }
}