import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 max-w-4xl min-h-[80vh]"
    >
      <SEO title="Your Profile - StackAi" />
      
      <div className="bg-card/50 border border-white/5 rounded-2xl p-8 mb-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar 
            src={user?.user_metadata?.avatar_url} 
            fallback={user?.email?.charAt(0).toUpperCase()} 
            size="xl" 
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold font-syne text-white mb-2">
              {user?.user_metadata?.full_name || 'User Profile'}
            </h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Log Out
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block">Email</span>
              <span className="text-gray-200">{user?.email}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Joined</span>
              <span className="text-gray-200">{new Date(user?.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Activity</h2>
          <p className="text-gray-400">Your recent reviews and interactions will appear here.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
