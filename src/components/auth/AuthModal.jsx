import React from 'react';
import Modal from '../ui/Modal';
import AuthForm from './AuthForm';
import GoogleButton from './GoogleButton';
import { Link } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, type = 'login' }) => {
  const isLogin = type === 'login';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLogin ? 'Welcome Back' : 'Create an Account'}>
      <div className="p-1">
        <p className="text-sm text-text-muted mb-6">
          {isLogin 
            ? 'Sign in to access your bookmarks, reviews, and personalized recommendations.' 
            : 'Join thousands of professionals discovering the best AI tools.'}
        </p>

        <AuthForm type={type} />

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-white/10"></div>
          <span className="px-3 text-xs text-text-muted uppercase">Or</span>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>

        <GoogleButton />

        <div className="mt-6 text-center text-sm text-text-muted">
          {isLogin ? (
            <p>Don't have an account? <Link to="/signup" onClick={onClose} className="text-accent hover:text-white transition-colors">Sign up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login" onClick={onClose} className="text-accent hover:text-white transition-colors">Log in</Link></p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
