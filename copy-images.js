const fs = require('fs');
const path = require('path');

const srcDir = "C:/Users/Yash/.gemini/antigravity/brain/34249927-89e2-4f2e-a4c6-fd8b34b381f8";
const destDir = "c:/Users/Yash/Desktop/New metrobrain-tech/public/services";

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

try {
  const files = fs.readdirSync(srcDir);
  let count = 0;
  
  files.forEach(f => {
    // Only copy the new icon files
    if (f.startsWith('icon_') && f.endsWith('.png')) { 
      // Extract base name like icon_web.png from icon_web_1776807752050.png
      const match = f.match(/^(icon_[a-zA-Z]+)_/);
      if (match) {
        const baseName = match[1] + '.png';
        fs.copyFileSync(path.join(srcDir, f), path.join(destDir, baseName)); 
        console.log(`Copied ${baseName}`);
        count++; 
      }
    }
  });
  
  console.log(`Successfully copied ${count} images!`);
} catch (e) {
  console.error(e);
}
