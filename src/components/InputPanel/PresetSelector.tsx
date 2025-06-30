import React from 'react';
import { Star } from 'lucide-react';

interface PresetSelectorProps {
  presets: { [key: string]: any };
  onLoadPreset: (presetName: string) => void;
  title: string;
  colorScheme: string;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  onLoadPreset,
  title,
  colorScheme
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <Star className={`text-${colorScheme}-600`} size={16} />
        <span className={`text-sm font-medium text-${colorScheme}-800`}>{title}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(presets).map((presetName) => (
          <button
            key={presetName}
            onClick={() => onLoadPreset(presetName)}
            className={`px-3 py-2 text-xs bg-${colorScheme}-100 hover:bg-${colorScheme}-200 text-${colorScheme}-800 rounded-lg transition-colors duration-200 border border-${colorScheme}-200`}
          >
            {presetName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;