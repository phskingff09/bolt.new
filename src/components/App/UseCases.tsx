import React from 'react';
import { Eye, Palette, Zap } from 'lucide-react';

const UseCases: React.FC = () => {
  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold mb-12 text-cool-text">Revolutionary Applications</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
          <h4 className="text-xl font-bold mb-4 text-blue-900">Accessibility Technology</h4>
          <p className="text-blue-700 leading-relaxed">Enable visually impaired users to "see" through sound, or deaf users to "hear" through visual patterns and haptic feedback</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Palette className="h-8 w-8 text-purple-600" />
          </div>
          <h4 className="text-xl font-bold mb-4 text-purple-900">Creative Arts</h4>
          <p className="text-purple-700 leading-relaxed">Transform musical compositions into visual masterpieces, or create immersive soundscapes from photographs and paintings</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold mb-4 text-emerald-900">Scientific Research</h4>
          <p className="text-emerald-700 leading-relaxed">Study cross-modal perception, analyze sensory data patterns, and understand neural connectivity in unprecedented detail</p>
        </div>
      </div>
    </div>
  );
};

export default UseCases;