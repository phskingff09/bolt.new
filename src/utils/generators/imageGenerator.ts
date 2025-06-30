import { VisualParameters, GeneratedImageParams } from '../../types/synesthesia';

export class ImageGenerator {
  static generateImageParams(visualParams: VisualParameters): GeneratedImageParams {
    const style = this.determineImageStyle(visualParams);
    const composition = this.determineComposition(visualParams);
    const mood = this.determineMood(visualParams);
    const elements = this.determineElements(visualParams);
    
    return {
      style,
      colors: visualParams.colors,
      composition,
      mood,
      elements
    };
  }

  private static determineImageStyle(visualParams: VisualParameters): string {
    if (visualParams.complexity > 0.7) return 'surreal';
    if (visualParams.movement > 0.6) return 'dynamic';
    if (visualParams.balance > 0.7) return 'minimalist';
    if (visualParams.texture > 0.6) return 'textured';
    return 'abstract';
  }

  private static determineComposition(visualParams: VisualParameters): string {
    if (visualParams.balance > 0.7) return 'symmetrical';
    if (visualParams.movement > 0.6) return 'diagonal';
    if (visualParams.complexity > 0.6) return 'complex';
    return 'centered';
  }

  private static determineMood(visualParams: VisualParameters): string {
    if (visualParams.temperature > 0.7) return 'warm';
    if (visualParams.temperature < 0.3) return 'cool';
    if (visualParams.intensity > 0.7) return 'energetic';
    if (visualParams.intensity < 0.3) return 'calm';
    return 'balanced';
  }

  private static determineElements(visualParams: VisualParameters): string[] {
    const elements = [];
    if (visualParams.forms.includes('organic')) elements.push('organic shapes');
    if (visualParams.forms.includes('geometric')) elements.push('geometric patterns');
    if (visualParams.texture > 0.5) elements.push('textured surfaces');
    if (visualParams.movement > 0.5) elements.push('flowing lines');
    return elements.length > 0 ? elements : ['abstract forms'];
  }
}