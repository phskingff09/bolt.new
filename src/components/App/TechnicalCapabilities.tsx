import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

const TechnicalCapabilities: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-cool-accent/5 via-purple-500/5 to-indigo-500/5 rounded-2xl p-16 mb-20 border border-cool-border/50">
      <h3 className="text-4xl font-bold text-center mb-16 text-cool-text">Advanced Computational Engine</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h4 className="text-2xl font-semibold text-cool-text flex items-center">
            <div className="bg-cool-accent/10 p-3 rounded-lg mr-4">
              <Palette className="h-7 w-7 text-cool-accent" />
            </div>
            Sensory Input Processing
          </h4>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Audio Analysis:</span>
                  <span className="text-cool-text-light ml-2">Real-time FFT, autocorrelation pitch detection, MFCC feature extraction, chroma analysis</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Visual Processing:</span>
                  <span className="text-cool-text-light ml-2">HSV color space analysis, Sobel edge detection, texture entropy, spatial frequency decomposition</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Chemical Sensing:</span>
                  <span className="text-cool-text-light ml-2">Molecular structure simulation, olfactory receptor modeling, taste bud activation patterns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h4 className="text-2xl font-semibold text-cool-text flex items-center">
            <div className="bg-cool-accent/10 p-3 rounded-lg mr-4">
              <Sparkles className="h-7 w-7 text-cool-accent" />
            </div>
            Output Generation
          </h4>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Visual Art:</span>
                  <span className="text-cool-text-light ml-2">Procedural generation with style transfer, color harmony algorithms, composition rules</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Audio Synthesis:</span>
                  <span className="text-cool-text-light ml-2">Additive synthesis, harmonic series generation, envelope shaping, WAV export</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-cool-border/30 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-pink-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-cool-text">Sensory Profiles:</span>
                  <span className="text-cool-text-light ml-2">Quantified taste/smell percentages, molecular composition mapping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalCapabilities;