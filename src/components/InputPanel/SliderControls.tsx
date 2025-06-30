import React from 'react';

interface SliderControlsProps {
  profile: { [key: string]: number };
  onChange: (key: string, value: number) => void;
  title: string;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  profile,
  onChange,
  title
}) => {
  return (
    <div className="space-y-6">
      <p className="text-cool-text-light">Adjust the {title.toLowerCase()} profile:</p>
      {Object.entries(profile).map(([key, value]) => (
        <div key={key} className="space-y-3">
          <label className="flex justify-between text-sm font-medium">
            <span className="capitalize text-cool-text">{key}</span>
            <span className="text-cool-accent font-semibold">{(value * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={(e) => onChange(key, parseFloat(e.target.value))}
            className="cool-slider"
          />
        </div>
      ))}
    </div>
  );
};

export default SliderControls;