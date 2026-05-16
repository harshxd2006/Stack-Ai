import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import ChatBot from '../ui/ChatBot';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <ChatBot />
    </div>
  );
};

export default PageLayout;
