import { AudioFeatures, ImageFeatures, TasteProfile, SmellProfile, EmotionalState, VisualParameters, AudioParameters, GeneratedImageParams } from '../types/synesthesia';
import { AudioAnalyzer } from './audioAnalyzer';
import { ImageAnalyzer } from './imageAnalyzer';
import { AudioConverters } from './converters/audioConverters';
import { ImageConverters } from './converters/imageConverters';
import { TasteConverters } from './converters/tasteConverters';
import { SmellConverters } from './converters/smellConverters';
import { EmotionConverters } from './converters/emotionConverters';
import { ImageGenerator } from './generators/imageGenerator';

export class SynesthesiaEngine {
  private static audioAnalyzer = new AudioAnalyzer();
  private static imageAnalyzer = new ImageAnalyzer();

  // Analysis methods
  static async analyzeAudio(file: File): Promise<AudioFeatures> {
    return await this.audioAnalyzer.analyzeAudioFile(file);
  }

  static async analyzeImage(file: File): Promise<ImageFeatures> {
    return await this.imageAnalyzer.analyzeImage(file);
  }

  // Audio conversion methods
  static audioToVisual(audioFeatures: AudioFeatures): VisualParameters {
    return AudioConverters.audioToVisual(audioFeatures);
  }

  static audioToTaste(audioFeatures: AudioFeatures): TasteProfile {
    return AudioConverters.audioToTaste(audioFeatures);
  }

  static audioToSmell(audioFeatures: AudioFeatures): SmellProfile {
    return AudioConverters.audioToSmell(audioFeatures);
  }

  // Image conversion methods
  static imageToAudio(imageFeatures: ImageFeatures): AudioParameters {
    return ImageConverters.imageToAudio(imageFeatures);
  }

  static imageToTaste(imageFeatures: ImageFeatures): TasteProfile {
    return ImageConverters.imageToTaste(imageFeatures);
  }

  static imageToSmell(imageFeatures: ImageFeatures): SmellProfile {
    return ImageConverters.imageToSmell(imageFeatures);
  }

  // Taste conversion methods
  static tasteToVisual(tasteProfile: TasteProfile): VisualParameters {
    return TasteConverters.tasteToVisual(tasteProfile);
  }

  static tasteToAudio(tasteProfile: TasteProfile): AudioParameters {
    return TasteConverters.tasteToAudio(tasteProfile);
  }

  static tasteToSmell(tasteProfile: TasteProfile): SmellProfile {
    return TasteConverters.tasteToSmell(tasteProfile);
  }

  // Smell conversion methods
  static smellToVisual(smellProfile: SmellProfile): VisualParameters {
    return SmellConverters.smellToVisual(smellProfile);
  }

  static smellToAudio(smellProfile: SmellProfile): AudioParameters {
    return SmellConverters.smellToAudio(smellProfile);
  }

  static smellToTaste(smellProfile: SmellProfile): TasteProfile {
    return SmellConverters.smellToTaste(smellProfile);
  }

  // Emotion conversion methods
  static emotionToVisual(emotionalState: EmotionalState): VisualParameters {
    return EmotionConverters.emotionToVisual(emotionalState);
  }

  static emotionToTaste(emotionalState: EmotionalState): TasteProfile {
    return EmotionConverters.emotionToTaste(emotionalState);
  }

  static emotionToSmell(emotionalState: EmotionalState): SmellProfile {
    return EmotionConverters.emotionToSmell(emotionalState);
  }

  static emotionToAudio(emotionalState: EmotionalState): AudioParameters {
    return EmotionConverters.emotionToAudio(emotionalState);
  }

  // Image generation
  static generateImageParams(visualParams: VisualParameters): GeneratedImageParams {
    return ImageGenerator.generateImageParams(visualParams);
  }
}