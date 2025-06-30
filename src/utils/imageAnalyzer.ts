export class ImageAnalyzer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async analyzeImage(file: File): Promise<any> {
    const img = await this.loadImage(file);
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0);
    
    const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
    const pixels = imageData.data;
    
    return {
      dominantColors: this.extractDominantColors(pixels),
      brightness: this.calculateBrightness(pixels),
      contrast: this.calculateContrast(pixels),
      saturation: this.calculateSaturation(pixels),
      hue: this.extractHueDistribution(pixels),
      texture: this.calculateTexture(pixels, img.width, img.height),
      edges: this.detectEdges(pixels, img.width, img.height),
      complexity: this.calculateComplexity(pixels, img.width, img.height),
      colorHistogram: this.createColorHistogram(pixels),
      spatialFrequency: this.calculateSpatialFrequency(pixels, img.width, img.height)
    };
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  private extractDominantColors(pixels: Uint8ClampedArray): string[] {
    const colorCounts = new Map<string, number>();
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      // Quantize colors to reduce noise
      const qR = Math.floor(r / 32) * 32;
      const qG = Math.floor(g / 32) * 32;
      const qB = Math.floor(b / 32) * 32;
      
      const color = `rgb(${qR},${qG},${qB})`;
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    }
    
    // Sort by frequency and return top 5
    return Array.from(colorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);
  }

  private calculateBrightness(pixels: Uint8ClampedArray): number {
    let totalBrightness = 0;
    const pixelCount = pixels.length / 4;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      // Luminance formula
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      totalBrightness += brightness;
    }
    
    return totalBrightness / pixelCount / 255; // Normalize to 0-1
  }

  private calculateContrast(pixels: Uint8ClampedArray): number {
    const brightness = this.calculateBrightness(pixels) * 255;
    let variance = 0;
    const pixelCount = pixels.length / 4;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      const pixelBrightness = 0.299 * r + 0.587 * g + 0.114 * b;
      variance += Math.pow(pixelBrightness - brightness, 2);
    }
    
    return Math.sqrt(variance / pixelCount) / 255; // Normalize to 0-1
  }

  private calculateSaturation(pixels: Uint8ClampedArray): number {
    let totalSaturation = 0;
    const pixelCount = pixels.length / 4;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i] / 255;
      const g = pixels[i + 1] / 255;
      const b = pixels[i + 2] / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      
      totalSaturation += saturation;
    }
    
    return totalSaturation / pixelCount;
  }

  private extractHueDistribution(pixels: Uint8ClampedArray): number[] {
    const hueHistogram = new Array(360).fill(0);
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i] / 255;
      const g = pixels[i + 1] / 255;
      const b = pixels[i + 2] / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      
      if (delta === 0) continue;
      
      let hue = 0;
      if (max === r) {
        hue = ((g - b) / delta) % 6;
      } else if (max === g) {
        hue = (b - r) / delta + 2;
      } else {
        hue = (r - g) / delta + 4;
      }
      
      hue = Math.round(hue * 60);
      if (hue < 0) hue += 360;
      
      hueHistogram[hue]++;
    }
    
    return hueHistogram;
  }

  private calculateTexture(pixels: Uint8ClampedArray, width: number, height: number): number {
    // Calculate texture using local binary patterns
    let textureValue = 0;
    const radius = 1;
    
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        const centerIdx = (y * width + x) * 4;
        const centerGray = this.rgbToGray(pixels[centerIdx], pixels[centerIdx + 1], pixels[centerIdx + 2]);
        
        let pattern = 0;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            if (dx === 0 && dy === 0) continue;
            
            const neighborIdx = ((y + dy) * width + (x + dx)) * 4;
            const neighborGray = this.rgbToGray(pixels[neighborIdx], pixels[neighborIdx + 1], pixels[neighborIdx + 2]);
            
            if (neighborGray >= centerGray) {
              pattern++;
            }
          }
        }
        
        textureValue += pattern;
      }
    }
    
    return textureValue / ((width - 2 * radius) * (height - 2 * radius) * 8); // Normalize
  }

  private detectEdges(pixels: Uint8ClampedArray, width: number, height: number): number {
    // Sobel edge detection
    const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    
    let edgeStrength = 0;
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const gray = this.rgbToGray(pixels[idx], pixels[idx + 1], pixels[idx + 2]);
            
            gx += gray * sobelX[ky + 1][kx + 1];
            gy += gray * sobelY[ky + 1][kx + 1];
          }
        }
        
        edgeStrength += Math.sqrt(gx * gx + gy * gy);
      }
    }
    
    return edgeStrength / ((width - 2) * (height - 2) * 255); // Normalize
  }

  private calculateComplexity(pixels: Uint8ClampedArray, width: number, height: number): number {
    // Calculate complexity using entropy
    const histogram = new Array(256).fill(0);
    const pixelCount = pixels.length / 4;
    
    for (let i = 0; i < pixels.length; i += 4) {
      const gray = Math.round(this.rgbToGray(pixels[i], pixels[i + 1], pixels[i + 2]));
      histogram[gray]++;
    }
    
    let entropy = 0;
    for (let i = 0; i < 256; i++) {
      if (histogram[i] > 0) {
        const probability = histogram[i] / pixelCount;
        entropy -= probability * Math.log2(probability);
      }
    }
    
    return entropy / 8; // Normalize to 0-1 (max entropy is 8 for 8-bit)
  }

  private createColorHistogram(pixels: Uint8ClampedArray): number[] {
    const histogram = new Array(256).fill(0);
    
    for (let i = 0; i < pixels.length; i += 4) {
      const gray = Math.round(this.rgbToGray(pixels[i], pixels[i + 1], pixels[i + 2]));
      histogram[gray]++;
    }
    
    return histogram;
  }

  private calculateSpatialFrequency(pixels: Uint8ClampedArray, width: number, height: number): number[] {
    // Simple 2D FFT approximation for spatial frequency analysis
    const frequencies: number[] = [];
    const blockSize = 8;
    
    for (let y = 0; y < height - blockSize; y += blockSize) {
      for (let x = 0; x < width - blockSize; x += blockSize) {
        const block: number[] = [];
        
        for (let by = 0; by < blockSize; by++) {
          for (let bx = 0; bx < blockSize; bx++) {
            const idx = ((y + by) * width + (x + bx)) * 4;
            const gray = this.rgbToGray(pixels[idx], pixels[idx + 1], pixels[idx + 2]);
            block.push(gray);
          }
        }
        
        const blockFreq = this.calculateBlockFrequency(block);
        frequencies.push(blockFreq);
      }
    }
    
    return frequencies.slice(0, 64); // Return first 64 frequency components
  }

  private calculateBlockFrequency(block: number[]): number {
    // Simple frequency measure based on variance
    const mean = block.reduce((sum, val) => sum + val, 0) / block.length;
    const variance = block.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / block.length;
    return Math.sqrt(variance);
  }

  private rgbToGray(r: number, g: number, b: number): number {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }
}