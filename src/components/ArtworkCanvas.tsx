import React, { useRef, useEffect, useState } from 'react';
import { VisualParameters, StyleType } from '../types/synesthesia';

interface ArtworkCanvasProps {
  visualParams: VisualParameters;
  style: StyleType;
  resolution: number;
  complexity: number;
  intensity: number;
  shouldGenerate: boolean;
  onGenerationComplete: () => void;
}

const ArtworkCanvas = React.forwardRef<any, ArtworkCanvasProps>(({
  visualParams,
  style,
  resolution,
  complexity,
  intensity,
  shouldGenerate,
  onGenerationComplete
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastParams, setLastParams] = useState<string>('');

  // Helper function to add alpha to color strings
  const addAlphaToColor = (color: string, alpha: number): string => {
    if (color.startsWith('hsl(')) {
      // Convert HSL to HSLA
      const hslValues = color.slice(4, -1); // Remove 'hsl(' and ')'
      return `hsla(${hslValues}, ${alpha / 255})`;
    } else if (color.startsWith('#')) {
      // For hex colors, append alpha as hex
      const alphaHex = Math.round(alpha).toString(16).padStart(2, '0');
      return color + alphaHex;
    } else {
      // For other formats, try to append alpha directly
      return color + Math.round(alpha).toString(16).padStart(2, '0');
    }
  };

  // Auto-generate when parameters change
  useEffect(() => {
    const currentParams = JSON.stringify({ visualParams, style, resolution, complexity, intensity });
    if (currentParams !== lastParams) {
      setLastParams(currentParams);
      generateArtwork();
    }
  }, [visualParams, style, resolution, complexity, intensity]);

  // Also generate when explicitly requested
  useEffect(() => {
    if (shouldGenerate && !isGenerating) {
      generateArtwork();
    }
  }, [shouldGenerate]);

  const generateArtwork = async () => {
    if (!canvasRef.current || isGenerating) return;
    
    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsGenerating(false);
      onGenerationComplete();
      return;
    }

    // Set canvas size
    canvas.width = resolution;
    canvas.height = resolution;

    // Clear canvas with a subtle background
    const gradient = ctx.createLinearGradient(0, 0, resolution, resolution);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#111111');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, resolution, resolution);

    // Generate artwork based on style and parameters
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        switch (style) {
          case 'abstract':
            drawAbstractArt(ctx, resolution, visualParams, complexity, intensity);
            break;
          case 'geometric':
            drawGeometricArt(ctx, resolution, visualParams, complexity, intensity);
            break;
          case 'organic':
            drawOrganicArt(ctx, resolution, visualParams, complexity, intensity);
            break;
          case 'hybrid':
            drawHybridArt(ctx, resolution, visualParams, complexity, intensity);
            break;
        }
        resolve(void 0);
      });
    });

    setIsGenerating(false);
    onGenerationComplete();
  };

  const drawAbstractArt = (ctx: CanvasRenderingContext2D, size: number, params: VisualParameters, complexity: number, intensity: number) => {
    const numElements = Math.floor(50 + complexity * 200);
    
    for (let i = 0; i < numElements; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * (size * 0.1) * intensity;
      const color = params.colors[Math.floor(Math.random() * params.colors.length)];
      
      // Create flowing, organic shapes
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, addAlphaToColor(color, 128 * intensity));
      gradient.addColorStop(1, addAlphaToColor(color, 0));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Create flowing shapes based on movement parameter
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const r = radius * (1 + Math.sin(angle * params.movement * 3) * 0.3);
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        
        if (angle === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  };

  const drawGeometricArt = (ctx: CanvasRenderingContext2D, size: number, params: VisualParameters, complexity: number, intensity: number) => {
    const numShapes = Math.floor(20 + complexity * 80);
    
    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const shapeSize = Math.random() * (size * 0.15) * intensity;
      const color = params.colors[Math.floor(Math.random() * params.colors.length)];
      const sides = Math.floor(3 + Math.random() * 5);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI * 2);
      
      // Create geometric patterns
      const fillAlpha = Math.floor(128 + intensity * 127);
      ctx.fillStyle = addAlphaToColor(color, fillAlpha);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 + intensity * 4;
      
      ctx.beginPath();
      for (let j = 0; j < sides; j++) {
        const angle = (j / sides) * Math.PI * 2;
        const px = Math.cos(angle) * shapeSize;
        const py = Math.sin(angle) * shapeSize;
        
        if (j === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawOrganicArt = (ctx: CanvasRenderingContext2D, size: number, params: VisualParameters, complexity: number, intensity: number) => {
    const numFlows = Math.floor(10 + complexity * 40);
    
    for (let i = 0; i < numFlows; i++) {
      const startX = Math.random() * size;
      const startY = Math.random() * size;
      const color = params.colors[Math.floor(Math.random() * params.colors.length)];
      
      const strokeAlpha = Math.floor(64 + intensity * 191);
      ctx.strokeStyle = addAlphaToColor(color, strokeAlpha);
      ctx.lineWidth = 1 + intensity * 5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      let x = startX;
      let y = startY;
      
      // Create flowing, organic lines
      for (let step = 0; step < 100; step++) {
        const angle = Math.sin(step * 0.1 + i) * params.movement * Math.PI;
        const stepSize = (2 + intensity * 8) * params.balance;
        
        x += Math.cos(angle) * stepSize;
        y += Math.sin(angle) * stepSize;
        
        // Keep within bounds
        if (x < 0 || x > size || y < 0 || y > size) break;
        
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    }
  };

  const drawHybridArt = (ctx: CanvasRenderingContext2D, size: number, params: VisualParameters, complexity: number, intensity: number) => {
    // Combine elements from all styles
    drawAbstractArt(ctx, size, params, complexity * 0.3, intensity * 0.7);
    drawGeometricArt(ctx, size, params, complexity * 0.4, intensity * 0.5);
    drawOrganicArt(ctx, size, params, complexity * 0.3, intensity * 0.8);
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `synesthesia-artwork-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Expose export function to parent
  React.useImperativeHandle(ref, () => ({
    exportCanvas
  }));

  return (
    <div className="cool-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-cool-text">Live Generated Artwork</h2>
        {isGenerating && (
          <div className="flex items-center space-x-3 text-cool-accent">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-cool-accent border-t-transparent"></div>
            <span className="text-sm font-medium">Generating...</span>
          </div>
        )}
      </div>
      
      <div className="bg-gray-100 rounded-cool overflow-hidden border border-cool-border">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-full max-h-96 object-contain"
          style={{ 
            imageRendering: 'pixelated',
            background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      </div>
      
      <div className="mt-4 text-sm text-cool-text-light text-center">
        Artwork updates automatically as you adjust input parameters
      </div>
    </div>
  );
});

ArtworkCanvas.displayName = 'ArtworkCanvas';

export default ArtworkCanvas;