import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-[#262626] bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <Link to="/" className="text-2xl font-display font-bold text-gradient">
            Stack AI
          </Link>
          <p className="mt-2 text-text-muted max-w-xs">
            Discover the best AI tools to supercharge your workflow and creativity.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/search" className="hover:text-accent transition-colors">Browse Tools</Link></li>
              <li><Link to="/#categories" className="hover:text-accent transition-colors">Categories</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Submit a Tool</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[#262626] py-6 text-center text-sm text-text-muted">
        <p>&copy; {new Date().getFullYear()} Stack AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
