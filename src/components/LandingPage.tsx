import React from 'react';
import { ArrowRight, Sparkles, Waves, Palette, Brain, Zap, Eye } from 'lucide-react';
import { LavaLamp } from './ui/fluid-blob';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Thin Header for Spacing */}
      <header className="relative z-30 h-16 bg-transparent"></header>
      
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <LavaLamp />
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-teal-900/40 z-10"></div>
      
      {/* Top Left Badge - New Circular Logo */}
      <div className="absolute top-6 left-6 z-30">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-110 transition-transform duration-300"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Powered by Bolt.new" 
            className="w-16 h-16 md:w-20 md:h-20 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </a>
      </div>
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-6 lg:px-8 -mt-16">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo/Icon with Neural Network Effect */}
          <div className="mb-12 flex justify-center relative">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-full border border-white/20 relative">
              <Brain className="h-16 w-16 text-white" />
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-8 mix-blend-screen">
            Synesthesia AI
          </h1>
          
          {/* Revolutionary Subtitle */}
          <p className="text-2xl md:text-3xl text-white/95 mb-6 leading-relaxed max-w-4xl mx-auto mix-blend-screen font-light">
            The world's first <span className="font-semibold text-cyan-300">neural cross-modal intelligence</span> system
          </p>
          
          <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto mix-blend-screen">
            Experience impossible sensory fusion through advanced computational neuroscience. Transform any sense into any other with mathematical precision.
          </p>
          
          {/* Advanced Feature Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 flex items-center space-x-3 hover:bg-white/15 transition-all duration-300">
              <Waves className="h-6 w-6 text-cyan-300" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Audio Analysis</div>
                <div className="text-white/70 text-xs">FFT • MFCC • Spectral</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 flex items-center space-x-3 hover:bg-white/15 transition-all duration-300">
              <Eye className="h-6 w-6 text-emerald-300" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Vision Processing</div>
                <div className="text-white/70 text-xs">Edge • Texture • Color</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 flex items-center space-x-3 hover:bg-white/15 transition-all duration-300">
              <Palette className="h-6 w-6 text-purple-300" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Taste Mapping</div>
                <div className="text-white/70 text-xs">Molecular • Receptor</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 flex items-center space-x-3 hover:bg-white/15 transition-all duration-300">
              <Sparkles className="h-6 w-6 text-orange-300" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Scent Analysis</div>
                <div className="text-white/70 text-xs">Chemical • Olfactory</div>
              </div>
            </div>
          </div>

          {/* Technical Capabilities */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <Zap className="h-7 w-7 mr-3 text-yellow-300" />
              Revolutionary Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Real Binary Analysis</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• True audio FFT with pitch detection</li>
                  <li>• Pixel-level image processing</li>
                  <li>• Mathematical feature extraction</li>
                  <li>• No fake data or simulations</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Cross-Modal Generation</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Generate real audio files (WAV)</li>
                  <li>• Create visual art from sound</li>
                  <li>• Quantified taste/smell profiles</li>
                  <li>• Bidirectional conversion</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={onEnterApp}
            className="group bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 backdrop-blur-sm text-white px-12 py-5 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50 flex items-center space-x-4 mx-auto shadow-2xl"
          >
            <span>Enter Neural Interface</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          {/* Bottom Technical Description */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-white/70">
                <div className="text-white font-semibold mb-2">Computational Neuroscience</div>
                <div className="text-sm">Neural pathway simulation and cross-modal correlation algorithms</div>
              </div>
              <div className="text-white/70">
                <div className="text-white font-semibold mb-2">Advanced Signal Processing</div>
                <div className="text-sm">Real-time FFT, spectral analysis, and feature extraction</div>
              </div>
              <div className="text-white/70">
                <div className="text-white font-semibold mb-2">Perceptual Mapping</div>
                <div className="text-sm">Mathematical models of human sensory perception</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with Email and Powered By Badge */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-6">
        <div className="flex justify-between items-end">
          {/* Bottom Left - Rectangular Logo */}
          <div>
            <a 
              href="https://bolt.new/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:scale-105 transition-transform duration-300"
            >
              <img 
                src="/logotext_poweredby_360w.png" 
                alt="Powered by Bolt.new" 
                className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          </div>
          
          {/* Bottom Right - Email */}
          <div className="text-white/70 text-sm">
            <a 
              href="mailto:thankful.yash@gmail.com"
              className="hover:text-white transition-colors duration-300"
            >
              thankful.yash@gmail.com
            </a>
          </div>
        </div>
      </footer>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-cyan-300/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-4 h-4 bg-purple-300/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-32 w-5 h-5 bg-emerald-300/35 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-32 right-20 w-3 h-3 bg-orange-300/45 rounded-full animate-pulse delay-1500"></div>
      <div className="absolute top-1/3 left-10 w-2 h-2 bg-white/50 rounded-full animate-pulse delay-700"></div>
      <div className="absolute top-2/3 right-16 w-4 h-4 bg-yellow-300/30 rounded-full animate-pulse delay-300"></div>
    </div>
  );
};

export default LandingPage;