import { TasteProfile, SmellProfile, EmotionalState } from '../types/synesthesia';

// Famous presets for taste
export const FAMOUS_TASTE_PRESETS: { [key: string]: TasteProfile } = {
  'Dark Chocolate': {
    sweet: 0.3,
    sour: 0.1,
    bitter: 0.8,
    salty: 0.1,
    umami: 0.2,
    intensity: 0.9,
    temperature: 0.3,
    texture: 0.7
  },
  'Fresh Strawberry': {
    sweet: 0.9,
    sour: 0.3,
    bitter: 0.0,
    salty: 0.0,
    umami: 0.1,
    intensity: 0.8,
    temperature: 0.6,
    texture: 0.4
  },
  'Aged Wine': {
    sweet: 0.2,
    sour: 0.6,
    bitter: 0.4,
    salty: 0.1,
    umami: 0.7,
    intensity: 0.9,
    temperature: 0.4,
    texture: 0.3
  },
  'Sea Salt Caramel': {
    sweet: 0.8,
    sour: 0.1,
    bitter: 0.2,
    salty: 0.7,
    umami: 0.3,
    intensity: 0.8,
    temperature: 0.7,
    texture: 0.6
  },
  'Espresso Coffee': {
    sweet: 0.1,
    sour: 0.3,
    bitter: 0.9,
    salty: 0.0,
    umami: 0.4,
    intensity: 1.0,
    temperature: 0.9,
    texture: 0.2
  },
  'Lemon Tart': {
    sweet: 0.7,
    sour: 0.9,
    bitter: 0.1,
    salty: 0.1,
    umami: 0.0,
    intensity: 0.8,
    temperature: 0.5,
    texture: 0.5
  }
};

// Famous presets for smell
export const FAMOUS_SMELL_PRESETS: { [key: string]: SmellProfile } = {
  'Rose Garden': {
    floral: 0.9,
    fruity: 0.2,
    woody: 0.1,
    spicy: 0.0,
    fresh: 0.7,
    earthy: 0.2,
    chemical: 0.0,
    intensity: 0.8
  },
  'Ocean Breeze': {
    floral: 0.1,
    fruity: 0.0,
    woody: 0.0,
    spicy: 0.0,
    fresh: 1.0,
    earthy: 0.2,
    chemical: 0.3,
    intensity: 0.7
  },
  'Pine Forest': {
    floral: 0.0,
    fruity: 0.0,
    woody: 0.9,
    spicy: 0.1,
    fresh: 0.6,
    earthy: 0.8,
    chemical: 0.0,
    intensity: 0.8
  },
  'Vanilla Perfume': {
    floral: 0.6,
    fruity: 0.3,
    woody: 0.4,
    spicy: 0.2,
    fresh: 0.3,
    earthy: 0.1,
    chemical: 0.1,
    intensity: 0.9
  },
  'Cinnamon Spice': {
    floral: 0.1,
    fruity: 0.2,
    woody: 0.6,
    spicy: 0.9,
    fresh: 0.2,
    earthy: 0.4,
    chemical: 0.0,
    intensity: 0.8
  },
  'Fresh Lavender': {
    floral: 0.8,
    fruity: 0.1,
    woody: 0.3,
    spicy: 0.0,
    fresh: 0.9,
    earthy: 0.2,
    chemical: 0.0,
    intensity: 0.7
  },
  'Campfire Smoke': {
    floral: 0.0,
    fruity: 0.0,
    woody: 0.8,
    spicy: 0.3,
    fresh: 0.1,
    earthy: 0.9,
    chemical: 0.6,
    intensity: 0.9
  }
};

// Famous presets for emotions
export const FAMOUS_EMOTION_PRESETS: { [key: string]: EmotionalState } = {
  'Pure Love': {
    joy: 0.9,
    melancholy: 0.1,
    anger: 0.0,
    peace: 0.8,
    excitement: 0.7,
    contemplation: 0.3
  },
  'Deep Sadness': {
    joy: 0.1,
    melancholy: 0.9,
    anger: 0.2,
    peace: 0.2,
    excitement: 0.0,
    contemplation: 0.8
  },
  'Burning Rage': {
    joy: 0.0,
    melancholy: 0.3,
    anger: 1.0,
    peace: 0.0,
    excitement: 0.8,
    contemplation: 0.1
  },
  'Zen Meditation': {
    joy: 0.4,
    melancholy: 0.1,
    anger: 0.0,
    peace: 1.0,
    excitement: 0.0,
    contemplation: 0.9
  },
  'Euphoric Joy': {
    joy: 1.0,
    melancholy: 0.0,
    anger: 0.0,
    peace: 0.6,
    excitement: 0.9,
    contemplation: 0.2
  },
  'Nostalgic Memory': {
    joy: 0.6,
    melancholy: 0.7,
    anger: 0.0,
    peace: 0.5,
    excitement: 0.2,
    contemplation: 0.8
  },
  'Creative Flow': {
    joy: 0.7,
    melancholy: 0.2,
    anger: 0.0,
    peace: 0.6,
    excitement: 0.6,
    contemplation: 0.9
  },
  'Anxious Worry': {
    joy: 0.2,
    melancholy: 0.6,
    anger: 0.4,
    peace: 0.1,
    excitement: 0.7,
    contemplation: 0.8
  }
};