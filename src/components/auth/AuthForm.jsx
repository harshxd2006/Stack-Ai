import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import PasswordStrength from './PasswordStrength';

const AuthForm = ({ type = 'login' }) => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLogin = type === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn({ email, password });
        if (error) throw error;
        navigate('/');
      } else {
        const { error } = await signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        navigate('/login', { state: { message: 'Check your email to confirm your account.' } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}
      
      {!isLogin && (
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      )}
      
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && password && <PasswordStrength password={password} />}
      </div>

      {isLogin && (
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-[#7C3AED] hover:text-[#6D28D9] transition-colors">Forgot password?</Link>
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );
};

export default AuthForm;
