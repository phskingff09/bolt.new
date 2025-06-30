import React from 'react';

interface ProfileDisplayProps {
  profile: { [key: string]: number };
  title: string;
  colorScheme: string;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  profile,
  title,
  colorScheme
}) => {
  return (
    <div className={`bg-${colorScheme}-50 border border-${colorScheme}-200 rounded-cool p-4`}>
      <h3 className={`font-medium text-${colorScheme}-800 mb-4`}>Live {title}</h3>
      <div className="space-y-3">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className={`capitalize text-${colorScheme}-700 font-medium`}>{key}:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-24 h-2 bg-${colorScheme}-200 rounded-full`}>
                <div 
                  className={`h-full bg-${colorScheme}-500 rounded-full transition-all duration-300`}
                  style={{ width: `${value * 100}%` }}
                />
              </div>
              <span className={`text-${colorScheme}-600 font-semibold text-sm w-12`}>
                {(value * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDisplay;