import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import AuthForm from '../components/auth/AuthForm';

const SignupPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden"
    >
      <SEO title="Sign Up - StackAi" />
      
      {/* Background elements */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-syne text-white mb-2">Create an Account</h1>
          <p className="text-gray-400">Join our community to discover and review AI tools.</p>
        </div>
        
        <AuthForm type="signup" />
      </div>
    </motion.div>
  );
};

export default SignupPage;
