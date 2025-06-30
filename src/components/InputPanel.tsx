import React, { useState, useEffect } from 'react';
import { Upload, Palette, Heart, Volume2, Image, Zap, Download, Shuffle } from 'lucide-react';
import { InputType, TasteProfile, SmellProfile, EmotionalState } from '../types/synesthesia';
import { SampleGenerator } from '../utils/generators/sampleGenerator';
import PresetSelector from './InputPanel/PresetSelector';
import SliderControls from './InputPanel/SliderControls';
import { FAMOUS_TASTE_PRESETS, FAMOUS_SMELL_PRESETS, FAMOUS_EMOTION_PRESETS } from '../utils/presets';

interface InputPanelProps {
  onInputChange: (type: InputType, data: any) => void;
  currentInput: InputType;
  onInputTypeChange: (type: InputType) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  onInputChange,
  currentInput,
  onInputTypeChange
}) => {
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>({
    sweet: 0.5,
    sour: 0.3,
    bitter: 0.2,
    salty: 0.4,
    umami: 0.6,
    intensity: 0.7,
    temperature: 0.5,
    texture: 0.4
  });

  const [smellProfile, setSmellProfile] = useState<SmellProfile>({
    floral: 0.4,
    fruity: 0.6,
    woody: 0.3,
    spicy: 0.2,
    fresh: 0.7,
    earthy: 0.3,
    chemical: 0.1,
    intensity: 0.6
  });

  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    joy: 0.6,
    melancholy: 0.3,
    anger: 0.1,
    peace: 0.8,
    excitement: 0.5,
    contemplation: 0.4
  });

  // Auto-trigger updates when profiles change and input type matches
  useEffect(() => {
    if (currentInput === 'taste') {
      onInputChange('taste', tasteProfile);
    }
  }, [tasteProfile, currentInput, onInputChange]);

  useEffect(() => {
    if (currentInput === 'smell') {
      onInputChange('smell', smellProfile);
    }
  }, [smellProfile, currentInput, onInputChange]);

  useEffect(() => {
    if (currentInput === 'emotion') {
      onInputChange('emotion', emotionalState);
    }
  }, [emotionalState, currentInput, onInputChange]);

  // Trigger initial update when switching to these input types
  useEffect(() => {
    if (currentInput === 'taste') {
      onInputChange('taste', tasteProfile);
    } else if (currentInput === 'smell') {
      onInputChange('smell', smellProfile);
    } else if (currentInput === 'emotion') {
      onInputChange('emotion', emotionalState);
    }
  }, [currentInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onInputChange(currentInput, file);
    }
  };

  const handleTasteChange = (taste: string, value: number) => {
    const newProfile = { ...tasteProfile, [taste]: value };
    setTasteProfile(newProfile);
  };

  const handleSmellChange = (smell: string, value: number) => {
    const newProfile = { ...smellProfile, [smell]: value };
    setSmellProfile(newProfile);
  };

  const handleEmotionChange = (emotion: string, value: number) => {
    const newState = { ...emotionalState, [emotion]: value };
    setEmotionalState(newState);
  };

  const loadSampleImage = async () => {
    try {
      const file = await SampleGenerator.loadSampleImage();
      onInputChange('image', file);
    } catch (error) {
      console.error('Failed to load sample image:', error);
    }
  };

  const loadSampleAudio = async () => {
    try {
      const file = await SampleGenerator.generateSampleAudio();
      onInputChange('audio', file);
    } catch (error) {
      console.error('Failed to generate sample audio:', error);
    }
  };

  const loadPreset = (presetName: string) => {
    if (currentInput === 'taste' && FAMOUS_TASTE_PRESETS[presetName]) {
      setTasteProfile(FAMOUS_TASTE_PRESETS[presetName]);
    } else if (currentInput === 'smell' && FAMOUS_SMELL_PRESETS[presetName]) {
      setSmellProfile(FAMOUS_SMELL_PRESETS[presetName]);
    } else if (currentInput === 'emotion' && FAMOUS_EMOTION_PRESETS[presetName]) {
      setEmotionalState(FAMOUS_EMOTION_PRESETS[presetName]);
    }
  };

  const resetToDefaults = () => {
    if (currentInput === 'taste') {
      const defaultTaste = {
        sweet: 0.5,
        sour: 0.3,
        bitter: 0.2,
        salty: 0.4,
        umami: 0.6,
        intensity: 0.7,
        temperature: 0.5,
        texture: 0.4
      };
      setTasteProfile(defaultTaste);
    } else if (currentInput === 'smell') {
      const defaultSmell = {
        floral: 0.4,
        fruity: 0.6,
        woody: 0.3,
        spicy: 0.2,
        fresh: 0.7,
        earthy: 0.3,
        chemical: 0.1,
        intensity: 0.6
      };
      setSmellProfile(defaultSmell);
    } else if (currentInput === 'emotion') {
      const defaultEmotion = {
        joy: 0.6,
        melancholy: 0.3,
        anger: 0.1,
        peace: 0.8,
        excitement: 0.5,
        contemplation: 0.4
      };
      setEmotionalState(defaultEmotion);
    }
  };

  const randomizeProfile = () => {
    if (currentInput === 'taste') {
      const randomTaste: TasteProfile = {
        sweet: Math.random(),
        sour: Math.random(),
        bitter: Math.random(),
        salty: Math.random(),
        umami: Math.random(),
        intensity: Math.random(),
        temperature: Math.random(),
        texture: Math.random()
      };
      setTasteProfile(randomTaste);
    } else if (currentInput === 'smell') {
      const randomSmell: SmellProfile = {
        floral: Math.random(),
        fruity: Math.random(),
        woody: Math.random(),
        spicy: Math.random(),
        fresh: Math.random(),
        earthy: Math.random(),
        chemical: Math.random(),
        intensity: Math.random()
      };
      setSmellProfile(randomSmell);
    } else if (currentInput === 'emotion') {
      const randomEmotion: EmotionalState = {
        joy: Math.random(),
        melancholy: Math.random(),
        anger: Math.random(),
        peace: Math.random(),
        excitement: Math.random(),
        contemplation: Math.random()
      };
      setEmotionalState(randomEmotion);
    }
  };

  const getCurrentPresets = () => {
    if (currentInput === 'taste') return FAMOUS_TASTE_PRESETS;
    if (currentInput === 'smell') return FAMOUS_SMELL_PRESETS;
    if (currentInput === 'emotion') return FAMOUS_EMOTION_PRESETS;
    return {};
  };

  return (
    <div className="cool-card p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-cool-text">Sensory Input</h2>
      
      {/* Input Type Selector */}
      <div className="flex flex-wrap gap-3">
        {(['audio', 'image', 'taste', 'smell', 'emotion'] as InputType[]).map((type) => (
          <button
            key={type}
            onClick={() => onInputTypeChange(type)}
            className={`px-5 py-3 rounded-cool font-medium transition-all duration-200 flex items-center space-x-3 ${
              currentInput === type
                ? 'bg-cool-accent text-white shadow-cool-hover'
                : 'bg-white border border-cool-border text-cool-text hover:bg-gray-50 hover:shadow-cool'
            }`}
          >
            {type === 'audio' && <Volume2 size={18} />}
            {type === 'image' && <Image size={18} />}
            {type === 'taste' && <Palette size={18} />}
            {type === 'smell' && <Palette size={18} />}
            {type === 'emotion' && <Heart size={18} />}
            <span className="capitalize">{type}</span>
          </button>
        ))}
      </div>

      {/* Audio Input */}
      {currentInput === 'audio' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-cool p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-blue-600" size={16} />
              <span className="text-sm font-medium text-blue-800">Real Audio Analysis</span>
            </div>
            <p className="text-sm text-blue-700">
              Analyzes tempo, pitch, harmonics, MFCC, chroma features, and spectral characteristics
            </p>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <button
              onClick={loadSampleAudio}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Load Sample Audio</span>
            </button>
          </div>
          
          <label className="block">
            <div className="border-2 border-dashed border-cool-border rounded-cool p-12 text-center hover:border-cool-accent hover:bg-cool-accent hover:bg-opacity-5 transition-all duration-200 cursor-pointer">
              <Upload className="mx-auto mb-4 text-cool-accent" size={40} />
              <p className="text-cool-text font-medium mb-2">Upload Audio File</p>
              <p className="text-sm text-cool-text-light">MP3, WAV, or other audio formats</p>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>
        </div>
      )}

      {/* Image Input */}
      {currentInput === 'image' && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-cool p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-green-600" size={16} />
              <span className="text-sm font-medium text-green-800">Real Image Analysis</span>
            </div>
            <p className="text-sm text-green-700">
              Extracts colors, brightness, contrast, texture, edges, and spatial frequency data
            </p>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <button
              onClick={loadSampleImage}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Load Sample Image</span>
            </button>
          </div>
          
          <label className="block">
            <div className="border-2 border-dashed border-cool-border rounded-cool p-12 text-center hover:border-cool-accent hover:bg-cool-accent hover:bg-opacity-5 transition-all duration-200 cursor-pointer">
              <Upload className="mx-auto mb-4 text-cool-accent" size={40} />
              <p className="text-cool-text font-medium mb-2">Upload Image File</p>
              <p className="text-sm text-cool-text-light">JPG, PNG, or other image formats</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>
        </div>
      )}

      {/* Taste Input */}
      {currentInput === 'taste' && (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-cool p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-orange-600" size={16} />
              <span className="text-sm font-medium text-orange-800">Live Taste Profile Analysis</span>
            </div>
            <p className="text-sm text-orange-700">
              Real-time cross-modal generation as you adjust taste percentages
            </p>
          </div>

          <PresetSelector
            presets={getCurrentPresets()}
            onLoadPreset={loadPreset}
            title="Famous Tastes"
            colorScheme="orange"
          />

          <div className="flex space-x-3 mb-4">
            <button
              onClick={resetToDefaults}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Palette size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={randomizeProfile}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Shuffle size={16} />
              <span>Random</span>
            </button>
          </div>

          <SliderControls
            profile={tasteProfile}
            onChange={handleTasteChange}
            title="Taste"
          />
        </div>
      )}

      {/* Smell Input */}
      {currentInput === 'smell' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-cool p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-purple-600" size={16} />
              <span className="text-sm font-medium text-purple-800">Live Smell Profile Analysis</span>
            </div>
            <p className="text-sm text-purple-700">
              Real-time cross-modal generation as you adjust scent percentages
            </p>
          </div>

          <PresetSelector
            presets={getCurrentPresets()}
            onLoadPreset={loadPreset}
            title="Famous Scents"
            colorScheme="purple"
          />

          <div className="flex space-x-3 mb-4">
            <button
              onClick={resetToDefaults}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Palette size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={randomizeProfile}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Shuffle size={16} />
              <span>Random</span>
            </button>
          </div>

          <SliderControls
            profile={smellProfile}
            onChange={handleSmellChange}
            title="Smell"
          />
        </div>
      )}

      {/* Emotion Input */}
      {currentInput === 'emotion' && (
        <div className="space-y-6">
          <div className="bg-pink-50 border border-pink-200 rounded-cool p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="text-pink-600" size={16} />
              <span className="text-sm font-medium text-pink-800">Live Emotional State Analysis</span>
            </div>
            <p className="text-sm text-pink-700">
              Real-time cross-modal generation as you adjust emotional intensities
            </p>
          </div>

          <PresetSelector
            presets={getCurrentPresets()}
            onLoadPreset={loadPreset}
            title="Famous Emotions"
            colorScheme="pink"
          />

          <div className="flex space-x-3 mb-4">
            <button
              onClick={resetToDefaults}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Heart size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={randomizeProfile}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Shuffle size={16} />
              <span>Random</span>
            </button>
          </div>

          <SliderControls
            profile={emotionalState}
            onChange={handleEmotionChange}
            title="Emotion"
          />
        </div>
      )}
    </div>
  );
};

export default InputPanel;