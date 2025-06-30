export interface AudioFeatures {
  tempo: number;
  pitch: number[];
  volume: number;
  harmony: number[];
  rhythm: number[];
  frequency: number[];
  spectralCentroid: number;
  spectralRolloff: number;
  mfcc: number[];
  chroma: number[];
  tonnetz: number[];
}

export interface ImageFeatures {
  dominantColors: string[];
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number[];
  texture: number;
  edges: number;
  complexity: number;
  colorHistogram: number[];
  spatialFrequency: number[];
}

export interface TasteProfile {
  sweet: number;
  sour: number;
  bitter: number;
  salty: number;
  umami: number;
  intensity: number;
  temperature: number;
  texture: number;
}

export interface SmellProfile {
  floral: number;
  fruity: number;
  woody: number;
  spicy: number;
  fresh: number;
  earthy: number;
  chemical: number;
  intensity: number;
}

export interface EmotionalState {
  joy: number;
  melancholy: number;
  anger: number;
  peace: number;
  excitement: number;
  contemplation: number;
}

export interface VisualParameters {
  colors: string[];
  movement: number;
  intensity: number;
  complexity: number;
  balance: number;
  rhythm: number[];
  forms: FormType[];
  texture: number;
  temperature: number;
}

export interface AudioParameters {
  frequency: number[];
  amplitude: number[];
  harmonics: number[];
  tempo: number;
  timbre: string;
  duration: number;
}

export interface GeneratedImageParams {
  style: string;
  colors: string[];
  composition: string;
  mood: string;
  elements: string[];
}

export type FormType = 'organic' | 'geometric' | 'abstract' | 'flowing';
export type InputType = 'audio' | 'image' | 'taste' | 'smell' | 'emotion';
export type OutputType = 'visual' | 'audio' | 'taste' | 'smell' | 'emotion' | 'image';
export type StyleType = 'abstract' | 'geometric' | 'organic' | 'hybrid';