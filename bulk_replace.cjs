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

  // Specific file replacements BEFORE global generic to avoid conflicts
  const filename = path.basename(filePath);

  if (['Navbar.jsx', 'Footer.jsx', 'MobileMenu.jsx'].includes(filename)) {
    content = content.replace(/bg-\[\#0A0A0F\]/g, 'bg-[#09090B]');
    content = content.replace(/bg-bg/g, 'bg-[#09090B]');
    content = content.replace(/border-white\/5/g, 'border-[#262626]');
    content = content.replace(/border-white\/10/g, 'border-[#262626]');
  }

  if (filename === 'Button.jsx') {
    content = content.replace(/bg-accent hover:bg-accent-hover/g, 'bg-[#7C3AED] hover:bg-[#6D28D9]');
    content = content.replace(/bg-teal hover:bg-teal\/90/g, 'bg-[#5B21B6] hover:bg-[#4C1D95]');
  }

  if (['ToolCard.jsx', 'ToolDetailHero.jsx', 'ToolGrid.jsx', 'ToolList.jsx'].includes(filename)) {
    content = content.replace(/rgba\(108,\s*99,\s*255/g, 'rgba(124, 58, 237');
    content = content.replace(/rgba\(0,\s*212,\s*170/g, 'rgba(124, 58, 237');
    content = content.replace(/rgba\(108,99,255/g, 'rgba(124,58,237');
    content = content.replace(/rgba\(0,212,170/g, 'rgba(124,58,237');
  }

  if (filename === 'PricingBadge.jsx') {
    content = content.replace(/bg-teal\/10 text-teal border-teal\/20/g, 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/20');
    content = content.replace(/bg-teal\/10 text-teal/g, 'bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/20');
  }

  // Global replacements
  content = content.replace(/from-\[\#6C63FF\] to-\[\#00D4AA\]/g, 'from-[#7C3AED] to-[#6D28D9]');
  content = content.replace(/from-accent to-teal/g, 'from-accent to-[#6D28D9]');
  content = content.replace(/from-accent to-teal\/[0-9]+/g, 'from-accent to-[#6D28D9]');
  
  content = content.replace(/text-teal/g, 'text-accent');
  content = content.replace(/bg-teal/g, 'bg-accent');
  content = content.replace(/border-teal/g, 'border-accent');
  content = content.replace(/shadow-teal/g, 'shadow-accent');
  content = content.replace(/to-teal/g, 'to-[#6D28D9]');
  content = content.replace(/from-teal/g, 'from-accent');
  content = content.replace(/ring-teal/g, 'ring-accent');

  content = content.replace(/text-\[\#00D4AA\]/g, 'text-[#7C3AED]');
  content = content.replace(/bg-\[\#00D4AA\]/g, 'bg-[#7C3AED]');
  content = content.replace(/border-\[\#00D4AA\]/g, 'border-[#7C3AED]');
  content = content.replace(/from-\[\#00D4AA\]/g, 'from-[#7C3AED]');
  content = content.replace(/to-\[\#00D4AA\]/g, 'to-[#6D28D9]');

  content = content.replace(/#00D4AA/gi, '#7C3AED');
  content = content.replace(/#6C63FF/gi, '#7C3AED');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Replacements complete.");
