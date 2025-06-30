import React, { useEffect } from 'react';
import { Download, Play, Palette, Volume2, Coffee, Flower, Image as ImageIcon, Heart } from 'lucide-react';
import { OutputType, TasteProfile, SmellProfile, EmotionalState, AudioParameters } from '../types/synesthesia';
import { AudioGenerator } from '../utils/generators/audioGenerator';
import { ContinuousAudioGenerator } from '../utils/generators/continuousAudioGenerator';
import ProfileDisplay from './OutputPanel/ProfileDisplay';
import AudioControls from './OutputPanel/AudioControls';

interface OutputPanelProps {
  onOutputTypeChange: (type: OutputType) => void;
  currentOutput: OutputType;
  tasteProfile?: TasteProfile;
  smellProfile?: SmellProfile;
  emotionalState?: EmotionalState;
  audioParams?: AudioParameters;
  onExportOutput: (type: OutputType) => void;
  onGenerateImage?: () => void;
  onGenerateAudio?: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  onOutputTypeChange,
  currentOutput,
  tasteProfile,
  smellProfile,
  emotionalState,
  audioParams,
  onExportOutput,
  onGenerateImage,
  onGenerateAudio
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const outputTypes: { type: OutputType; icon: React.ReactNode; label: string }[] = [
    { type: 'visual', icon: <Palette size={18} />, label: 'Visual Art' },
    { type: 'audio', icon: <Volume2 size={18} />, label: 'Audio' },
    { type: 'taste', icon: <Coffee size={18} />, label: 'Taste Profile' },
    { type: 'smell', icon: <Flower size={18} />, label: 'Smell Profile' },
    { type: 'emotion', icon: <Heart size={18} />, label: 'Emotion State' },
    { type: 'image', icon: <ImageIcon size={18} />, label: 'Generated Image' }
  ];

  // Update continuous audio when parameters change
  useEffect(() => {
    if (audioParams && isPlaying) {
      ContinuousAudioGenerator.updateAudioParams(audioParams);
    }
  }, [audioParams, isPlaying]);

  // Check if audio is playing on component mount
  useEffect(() => {
    setIsPlaying(ContinuousAudioGenerator.isAudioPlaying());
  }, []);

  const toggleContinuousAudio = async () => {
    if (audioParams) {
      try {
        const newPlayingState = await ContinuousAudioGenerator.toggleAudio(audioParams);
        setIsPlaying(newPlayingState);
      } catch (error) {
        console.error('Error toggling continuous audio:', error);
        setIsPlaying(false);
      }
    }
  };

  const downloadGeneratedAudio = () => {
    if (audioParams) {
      try {
        const wavBlob = AudioGenerator.generateAudioFile(audioParams);
        const url = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `generated-audio-${Date.now()}.wav`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating audio file:', error);
      }
    }
  };

  const exportAsCSV = (profile: any, filename: string) => {
    const csvContent = [
      'Component,Percentage',
      ...Object.entries(profile).map(([key, value]) => `${key},${((value as number) * 100).toFixed(2)}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cool-card p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-cool-text">Output Formats</h2>
      
      {/* Output Type Selector */}
      <div className="grid grid-cols-2 gap-3">
        {outputTypes.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onOutputTypeChange(type)}
            className={`p-4 rounded-cool transition-all duration-200 flex items-center space-x-3 ${
              currentOutput === type
                ? 'bg-cool-accent text-white shadow-cool-hover'
                : 'bg-white border border-cool-border text-cool-text hover:bg-gray-50 hover:shadow-cool'
            }`}
          >
            {icon}
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Visual Output */}
      {currentOutput === 'visual' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-cool p-4">
            <h3 className="font-medium text-indigo-800 mb-2">Live Visual Generation</h3>
            <p className="text-sm text-indigo-700">
              Visual artwork updates automatically as you adjust input parameters
            </p>
          </div>
          <button
            onClick={() => onExportOutput('visual')}
            className="cool-button w-full flex items-center justify-center space-x-3"
          >
            <Download size={18} />
            <span>Export Visual Art</span>
          </button>
        </div>
      )}

      {/* Generated Image Output */}
      {currentOutput === 'image' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-cool p-4">
            <h3 className="font-medium text-indigo-800 mb-2">AI Generated Image</h3>
            <p className="text-sm text-indigo-700">
              Generate realistic images based on sensory input analysis
            </p>
          </div>
          
          <div className="flex space-x-3">
            {onGenerateImage && (
              <button
                onClick={onGenerateImage}
                className="cool-button flex items-center space-x-2"
              >
                <ImageIcon size={18} />
                <span>Generate Image</span>
              </button>
            )}
            <button
              onClick={() => onExportOutput('image')}
              className="cool-button-secondary flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Export Params</span>
            </button>
          </div>
        </div>
      )}

      {/* Audio Output */}
      {currentOutput === 'audio' && audioParams && (
        <AudioControls
          audioParams={audioParams}
          isPlaying={isPlaying}
          onToggleAudio={toggleContinuousAudio}
          onDownloadAudio={downloadGeneratedAudio}
        />
      )}

      {/* Taste Profile Output */}
      {currentOutput === 'taste' && tasteProfile && (
        <div className="space-y-6">
          <ProfileDisplay
            profile={tasteProfile}
            title="Taste Profile"
            colorScheme="orange"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onExportOutput('taste')}
              className="cool-button flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => exportAsCSV(tasteProfile, `taste-profile-${Date.now()}.csv`)}
              className="cool-button-secondary flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* Smell Profile Output */}
      {currentOutput === 'smell' && smellProfile && (
        <div className="space-y-6">
          <ProfileDisplay
            profile={smellProfile}
            title="Smell Profile"
            colorScheme="green"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onExportOutput('smell')}
              className="cool-button flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => exportAsCSV(smellProfile, `smell-profile-${Date.now()}.csv`)}
              className="cool-button-secondary flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* Emotion State Output */}
      {currentOutput === 'emotion' && emotionalState && (
        <div className="space-y-6">
          <ProfileDisplay
            profile={emotionalState}
            title="Emotional State"
            colorScheme="pink"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onExportOutput('emotion')}
              className="cool-button flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => exportAsCSV(emotionalState, `emotion-state-${Date.now()}.csv`)}
              className="cool-button-secondary flex items-center justify-center space-x-2"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;