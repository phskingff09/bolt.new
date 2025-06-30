import React from 'react';
import { StyleType } from '../types/synesthesia';
import { Palette, Grid, Waves, Shuffle, Download, Play } from 'lucide-react';

interface ControlPanelProps {
  style: StyleType;
  onStyleChange: (style: StyleType) => void;
  resolution: number;
  onResolutionChange: (resolution: number) => void;
  complexity: number;
  onComplexityChange: (complexity: number) => void;
  intensity: number;
  onIntensityChange: (intensity: number) => void;
  onGenerate: () => void;
  onExport: () => void;
  isGenerating: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  style,
  onStyleChange,
  resolution,
  onResolutionChange,
  complexity,
  onComplexityChange,
  intensity,
  onIntensityChange,
  onGenerate,
  onExport,
  isGenerating
}) => {
  const styles: { type: StyleType; icon: React.ReactNode; label: string }[] = [
    { type: 'abstract', icon: <Palette size={18} />, label: 'Abstract' },
    { type: 'geometric', icon: <Grid size={18} />, label: 'Geometric' },
    { type: 'organic', icon: <Waves size={18} />, label: 'Organic' },
    { type: 'hybrid', icon: <Shuffle size={18} />, label: 'Hybrid' }
  ];

  return (
    <div className="cool-card p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-cool-text">Generation Controls</h2>
      
      {/* Style Selection */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-cool-text">Artistic Style</label>
        <div className="grid grid-cols-2 gap-3">
          {styles.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => onStyleChange(type)}
              className={`p-4 rounded-cool transition-all duration-200 flex items-center space-x-3 ${
                style === type
                  ? 'bg-cool-accent text-white shadow-cool-hover'
                  : 'bg-white border border-cool-border text-cool-text hover:bg-gray-50 hover:shadow-cool'
              }`}
            >
              {icon}
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resolution Control */}
      <div className="space-y-4">
        <label className="flex justify-between text-sm font-medium">
          <span className="text-cool-text">Resolution</span>
          <span className="text-cool-accent font-semibold">{resolution}x{resolution}</span>
        </label>
        <select
          value={resolution}
          onChange={(e) => onResolutionChange(parseInt(e.target.value))}
          className="cool-input w-full"
        >
          <option value={512}>512x512</option>
          <option value={1024}>1024x1024</option>
          <option value={2048}>2048x2048</option>
          <option value={4096}>4096x4096</option>
        </select>
      </div>

      {/* Complexity Control */}
      <div className="space-y-4">
        <label className="flex justify-between text-sm font-medium">
          <span className="text-cool-text">Complexity</span>
          <span className="text-cool-accent font-semibold">{(complexity * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={complexity}
          onChange={(e) => onComplexityChange(parseFloat(e.target.value))}
          className="cool-slider"
        />
      </div>

      {/* Intensity Control */}
      <div className="space-y-4">
        <label className="flex justify-between text-sm font-medium">
          <span className="text-cool-text">Intensity</span>
          <span className="text-cool-accent font-semibold">{(intensity * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={intensity}
          onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
          className="cool-slider"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-6">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="cool-button w-full flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={18} />
          <span>{isGenerating ? 'Generating...' : 'Generate Artwork'}</span>
        </button>
        
        <button
          onClick={onExport}
          className="cool-button-secondary w-full flex items-center justify-center space-x-3"
        >
          <Download size={18} />
          <span>Export High-Res</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;