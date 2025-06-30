import React from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { AudioParameters } from '../../types/synesthesia';

interface AudioControlsProps {
  audioParams: AudioParameters;
  isPlaying: boolean;
  onToggleAudio: () => void;
  onDownloadAudio: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  audioParams,
  isPlaying,
  onToggleAudio,
  onDownloadAudio
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-cool p-4">
        <h3 className="font-medium text-purple-800 mb-2">Continuous Live Audio</h3>
        <div className="space-y-2 text-sm text-purple-700">
          <p><strong>Tempo:</strong> {audioParams.tempo} BPM</p>
          <p><strong>Duration:</strong> Continuous</p>
          <p><strong>Timbre:</strong> {audioParams.timbre}</p>
          <p><strong>Frequencies:</strong> {audioParams.frequency.slice(0, 3).map(f => f.toFixed(0)).join(', ')} Hz...</p>
          <p><strong>Harmonics:</strong> {audioParams.harmonics.length} components</p>
        </div>
        <div className="mt-3 p-2 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-600">
            🎵 Audio updates smoothly as you adjust sliders
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onToggleAudio}
          className={`cool-button flex items-center justify-center space-x-2 ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : ''
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          <span>{isPlaying ? 'Stop' : 'Play'}</span>
        </button>
        <button
          onClick={onDownloadAudio}
          className="cool-button-secondary flex items-center justify-center space-x-2"
        >
          <Download size={18} />
          <span>Download WAV</span>
        </button>
      </div>
    </div>
  );
};

export default AudioControls;