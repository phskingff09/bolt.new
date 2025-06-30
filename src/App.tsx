import React, { useState, useRef, useCallback } from 'react';
import { Waves, Sparkles, Home } from 'lucide-react';
import LandingPage from './components/LandingPage';
import InputPanel from './components/InputPanel';
import ControlPanel from './components/ControlPanel';
import OutputPanel from './components/OutputPanel';
import ArtworkCanvas from './components/ArtworkCanvas';
import FeatureShowcase from './components/App/FeatureShowcase';
import TechnicalCapabilities from './components/App/TechnicalCapabilities';
import UseCases from './components/App/UseCases';
import { SynesthesiaEngine } from './utils/synesthesiaEngine';
import { AudioGenerator } from './utils/generators/audioGenerator';
import { InputType, OutputType, StyleType, VisualParameters, TasteProfile, SmellProfile, EmotionalState, AudioParameters, GeneratedImageParams } from './types/synesthesia';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentInput, setCurrentInput] = useState<InputType>('audio');
  const [currentOutput, setCurrentOutput] = useState<OutputType>('visual');
  const [style, setStyle] = useState<StyleType>('abstract');
  const [resolution, setResolution] = useState(1024);
  const [complexity, setComplexity] = useState(0.6);
  const [intensity, setIntensity] = useState(0.7);
  const [visualParams, setVisualParams] = useState<VisualParameters>({
    colors: ['#8B5CF6', '#14B8A6', '#F97316'],
    movement: 0.5,
    intensity: 0.7,
    complexity: 0.6,
    balance: 0.5,
    rhythm: [0.5, 0.7, 0.3, 0.8, 0.4, 0.9, 0.2, 0.6],
    forms: ['abstract'],
    texture: 0.5,
    temperature: 0.5
  });
  const [tasteProfile, setTasteProfile] = useState<TasteProfile | undefined>();
  const [smellProfile, setSmellProfile] = useState<SmellProfile | undefined>();
  const [emotionalState, setEmotionalState] = useState<EmotionalState | undefined>();
  const [audioParams, setAudioParams] = useState<AudioParameters | undefined>();
  const [generatedImageParams, setGeneratedImageParams] = useState<GeneratedImageParams | undefined>();
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const canvasRef = useRef<any>(null);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const handleReturnToLanding = () => {
    setShowLanding(true);
  };

  const handleInputChange = useCallback(async (type: InputType, data: any) => {
    setIsGenerating(true);
    
    try {
      let newParams: VisualParameters;
      let newTasteProfile: TasteProfile | undefined;
      let newSmellProfile: SmellProfile | undefined;
      let newEmotionalState: EmotionalState | undefined;
      let newAudioParams: AudioParameters | undefined;

      switch (type) {
        case 'audio':
          const audioFeatures = await SynesthesiaEngine.analyzeAudio(data);
          newParams = SynesthesiaEngine.audioToVisual(audioFeatures);
          newTasteProfile = SynesthesiaEngine.audioToTaste(audioFeatures);
          newSmellProfile = SynesthesiaEngine.audioToSmell(audioFeatures);
          break;
          
        case 'image':
          const imageFeatures = await SynesthesiaEngine.analyzeImage(data);
          newParams = SynesthesiaEngine.audioToVisual({
            tempo: 120,
            pitch: [440],
            volume: imageFeatures.brightness,
            harmony: [imageFeatures.contrast],
            rhythm: [imageFeatures.texture],
            frequency: imageFeatures.spatialFrequency.slice(0, 10),
            spectralCentroid: imageFeatures.complexity * 2000,
            spectralRolloff: 4000,
            mfcc: imageFeatures.colorHistogram.slice(0, 13).map(h => h / 100),
            chroma: new Array(12).fill(0.1),
            tonnetz: new Array(6).fill(0.1)
          });
          
          newTasteProfile = SynesthesiaEngine.imageToTaste(imageFeatures);
          newSmellProfile = SynesthesiaEngine.imageToSmell(imageFeatures);
          newAudioParams = SynesthesiaEngine.imageToAudio(imageFeatures);
          break;
          
        case 'taste':
          const taste = data as TasteProfile;
          newParams = SynesthesiaEngine.tasteToVisual(taste);
          newTasteProfile = taste;
          newSmellProfile = SynesthesiaEngine.tasteToSmell(taste);
          newAudioParams = SynesthesiaEngine.tasteToAudio(taste);
          break;
          
        case 'smell':
          const smell = data as SmellProfile;
          newParams = SynesthesiaEngine.smellToVisual(smell);
          newSmellProfile = smell;
          newTasteProfile = SynesthesiaEngine.smellToTaste(smell);
          newAudioParams = SynesthesiaEngine.smellToAudio(smell);
          break;
          
        case 'emotion':
          const emotion = data as EmotionalState;
          newParams = SynesthesiaEngine.emotionToVisual(emotion);
          newEmotionalState = emotion;
          newTasteProfile = SynesthesiaEngine.emotionToTaste(emotion);
          newSmellProfile = SynesthesiaEngine.emotionToSmell(emotion);
          newAudioParams = SynesthesiaEngine.emotionToAudio(emotion);
          break;
          
        default:
          return;
      }

      setVisualParams(newParams);
      setTasteProfile(newTasteProfile);
      setSmellProfile(newSmellProfile);
      setEmotionalState(newEmotionalState);
      setAudioParams(newAudioParams);
      setGeneratedImageParams(SynesthesiaEngine.generateImageParams(newParams));
      setShouldGenerate(true);
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShouldGenerate(true);
  };

  const handleGenerationComplete = () => {
    setShouldGenerate(false);
    setIsGenerating(false);
  };

  const handleExport = () => {
    if (canvasRef.current?.exportCanvas) {
      canvasRef.current.exportCanvas();
    }
  };

  const handleGenerateImage = () => {
    if (generatedImageParams) {
      console.log('Generating image with params:', generatedImageParams);
      alert('Image generation would be implemented with an AI service like DALL-E, Midjourney, or Stable Diffusion API');
    }
  };

  const handleGenerateAudio = () => {
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
        console.error('Error generating audio:', error);
      }
    }
  };

  const handleExportOutput = (type: OutputType) => {
    switch (type) {
      case 'visual':
        handleExport();
        break;
      case 'audio':
        if (audioParams) {
          const audioData = JSON.stringify(audioParams, null, 2);
          const blob = new Blob([audioData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `audio-params-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
        break;
      case 'taste':
        if (tasteProfile) {
          const tasteData = JSON.stringify(tasteProfile, null, 2);
          const blob = new Blob([tasteData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `taste-profile-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
        break;
      case 'smell':
        if (smellProfile) {
          const smellData = JSON.stringify(smellProfile, null, 2);
          const blob = new Blob([smellData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `smell-profile-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
        break;
      case 'emotion':
        if (emotionalState) {
          const emotionData = JSON.stringify(emotionalState, null, 2);
          const blob = new Blob([emotionData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `emotion-state-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
        break;
      case 'image':
        if (generatedImageParams) {
          const imageData = JSON.stringify(generatedImageParams, null, 2);
          const blob = new Blob([imageData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `image-params-${Date.now()}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
        break;
    }
  };

  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen bg-cool-bg relative">
      {/* Top Left Badge for Main App */}
      <div className="absolute top-6 left-6 z-50">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-110 transition-transform duration-300"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Powered by Bolt.new" 
            className="w-12 h-12 md:w-16 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </a>
      </div>

      {/* Return to Landing Button - Icon Only */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleReturnToLanding}
          className="bg-cool-accent text-white p-3 rounded-cool font-medium transition-all duration-200 hover:shadow-cool-hover hover:scale-105 flex items-center justify-center"
          title="Return to Landing Page"
        >
          <Home size={20} />
        </button>
      </div>

      {/* Header */}
      <header className="bg-cool-card border-b border-cool-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-cool-accent p-3 rounded-cool">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-cool-text">
                  Synesthesia AI
                </h1>
                <p className="text-cool-text-light text-sm mt-1">Advanced cross-modal sensory intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-cool-text-light">
              <Sparkles size={16} className="text-cool-accent" />
              <span>Neural sensory transformation</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <InputPanel
              onInputChange={handleInputChange}
              currentInput={currentInput}
              onInputTypeChange={setCurrentInput}
            />
          </div>

          <div>
            <ArtworkCanvas
              ref={canvasRef}
              visualParams={visualParams}
              style={style}
              resolution={resolution}
              complexity={complexity}
              intensity={intensity}
              shouldGenerate={shouldGenerate}
              onGenerationComplete={handleGenerationComplete}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ControlPanel
                style={style}
                onStyleChange={setStyle}
                resolution={resolution}
                onResolutionChange={setResolution}
                complexity={complexity}
                onComplexityChange={setComplexity}
                intensity={intensity}
                onIntensityChange={setIntensity}
                onGenerate={handleGenerate}
                onExport={handleExport}
                isGenerating={isGenerating}
              />
            </div>
            
            <div>
              <OutputPanel
                currentOutput={currentOutput}
                onOutputTypeChange={setCurrentOutput}
                tasteProfile={tasteProfile}
                smellProfile={smellProfile}
                emotionalState={emotionalState}
                audioParams={audioParams}
                onExportOutput={handleExportOutput}
                onGenerateImage={handleGenerateImage}
                onGenerateAudio={handleGenerateAudio}
              />
            </div>
          </div>
        </div>

        <FeatureShowcase />
        <TechnicalCapabilities />
        <UseCases />
      </main>

      {/* Footer with Email and Powered By Badge */}
      <footer className="border-t border-cool-border mt-24 bg-cool-card relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center text-cool-text-light">
            <p className="text-lg">Advancing the frontiers of artificial synesthesia through computational neuroscience</p>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="/logotext_poweredby_360w.png" 
              alt="Powered by Bolt.new" 
              className="h-6 md:h-8 opacity-60 hover:opacity-80 transition-opacity duration-300"
            />
          </a>
          <div className="text-cool-text-light text-sm">
            <a 
              href="mailto:thankful.yash@gmail.com"
              className="hover:text-cool-accent transition-colors duration-300"
            >
              thankful.yash@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;