const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const targetDir = 'c:/Users/harsh/OneDrive/Desktop/stackAI/stack-AI/src';

walkDir(targetDir, (filePath) => {
  if (!filePath.endsWith('.jsx')) return;
  if (filePath.replace(/\\/g, '/').endsWith('/pages/IntroLandingPage.jsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Background and borders
  content = content.replace(/bg-\[\#0A0A0F\]/gi, 'bg-[#09090B]');
  content = content.replace(/bg-\[\#12121A\]/gi, 'bg-[#141414]');
  content = content.replace(/border-white\/5/g, 'border-[#262626]');
  content = content.replace(/border-white\/10/g, 'border-[#262626]');
  
  // Muted text
  content = content.replace(/text-gray-400/g, 'text-[#737373]');
  content = content.replace(/text-gray-500/g, 'text-[#737373]');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Secondary replacements complete.");
