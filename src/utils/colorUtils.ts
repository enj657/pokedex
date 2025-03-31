export const getLuminance = (hex: string) => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
  
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  export const adjustLightnessLarge = (hex: string, percent: number) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
  
    const factor = percent / 30;
  
    if (r > 150 && g > 150 && b < 100) {
      r = Math.floor(r + (factor * (r > 128 ? -30 : 30)));
      g = Math.floor(g + (factor * (g > 128 ? -30 : 30)));
      b = Math.floor(b + (factor * (b > 128 ? -20 : 20)));
    } else {
      r = Math.floor(r + (factor * (r > 128 ? -50 : 50)));
      g = Math.floor(g + (factor * (g > 128 ? -50 : 50)));
      b = Math.floor(b + (factor * (b > 128 ? -50 : 50)));
    }
  
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
  
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  export const adjustLightnessSmall = (hex: string, percent: number) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
  
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));
  
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  export const isDarkColor = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 128;
  };
  