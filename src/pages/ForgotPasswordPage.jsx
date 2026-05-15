import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import PasswordStrength from '../components/auth/PasswordStrength';

const ForgotPasswordPage = () => {
  const { resetPassword, verifyResetOtp, updatePassword } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await verifyResetOtp(email, otp);
      if (error) throw error;
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await updatePassword(newPassword);
      if (error) throw error;
      navigate('/login', { state: { message: 'Password updated successfully! Please log in.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden"
    >
      <SEO title="Reset Password - StackAi" />
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-syne text-white mb-2">Reset Password</h1>
          <p className="text-[#737373]">
            {step === 1 && "Enter your email to receive a reset code."}
            {step === 2 && "Enter your email and the 8-digit code you received."}
            {step === 3 && "Enter your new password."}
          </p>
        </div>
        
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#262626]">
          {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendEmail} 
                className="space-y-4"
              >
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </Button>
                <div className="text-center mt-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="text-sm text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                  >
                    Already have a code?
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOtp} 
                className="space-y-4"
              >
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="8-Digit Reset Code"
                  type="text"
                  placeholder="12345678"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
                <div className="text-center mt-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-sm text-[#737373] hover:text-white transition-colors"
                  >
                    Need a new code?
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleUpdatePassword} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  {newPassword && <PasswordStrength password={newPassword} />}
                </div>
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#737373] hover:text-white transition-colors">
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
