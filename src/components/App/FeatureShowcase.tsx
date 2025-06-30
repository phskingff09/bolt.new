import React from 'react';
import { Waves, Eye, Zap, Palette, Sparkles } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  return (
    <div className="mt-24">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold text-cool-text mb-6">Revolutionary Sensory Intelligence</h2>
        <p className="text-xl text-cool-text-light max-w-4xl mx-auto leading-relaxed">
          Experience the world's first true cross-modal AI that understands and translates between all human senses using advanced computational neuroscience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {/* Audio Analysis */}
        <div className="cool-card p-10 text-center hover:shadow-cool-hover transition-all duration-300 group hover:-translate-y-2">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-cool w-24 h-24 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Waves className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-cool-text">Neural Audio Processing</h3>
          <p className="text-cool-text-light leading-relaxed mb-6 text-base">
            Advanced FFT analysis extracts tempo, pitch harmonics, MFCC coefficients, and spectral features from any audio file with mathematical precision
          </p>
          <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-700 font-medium">
            Real-time frequency domain analysis • Harmonic extraction • Rhythm pattern recognition
          </div>
        </div>
        
        {/* Image Analysis */}
        <div className="cool-card p-10 text-center hover:shadow-cool-hover transition-all duration-300 group hover:-translate-y-2">
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-cool w-24 h-24 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Eye className="h-12 w-12 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-cool-text">Computer Vision Intelligence</h3>
          <p className="text-cool-text-light leading-relaxed mb-6 text-base">
            Pixel-level analysis extracts color histograms, texture patterns, edge detection, and spatial frequency data from any image format
          </p>
          <div className="bg-emerald-50 rounded-lg p-4 text-sm text-emerald-700 font-medium">
            Sobel edge detection • Color space analysis • Texture entropy calculation
          </div>
        </div>
        
        {/* Cross-Modal Generation */}
        <div className="cool-card p-10 text-center hover:shadow-cool-hover transition-all duration-300 group hover:-translate-y-2">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-cool w-24 h-24 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Zap className="h-12 w-12 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold mb-6 text-cool-text">Synesthetic Translation</h3>
          <p className="text-cool-text-light leading-relaxed mb-6 text-base">
            Bidirectional conversion between all sensory modalities using neuromorphic algorithms and perceptual mapping systems
          </p>
          <div className="bg-orange-50 rounded-lg p-4 text-sm text-orange-700 font-medium">
            Neural pathway simulation • Perceptual space mapping • Cross-modal correlation
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;