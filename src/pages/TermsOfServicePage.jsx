import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const TermsOfServicePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-screen"
    >
      <SEO title="Terms of Service - Stack AI" />
      
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-2xl border border-[#262626] mt-10">
        <h1 className="text-4xl font-bold font-syne mb-8 text-white">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Stack AI, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform. These terms govern your access to and use of all content, features, and functionality provided by Stack AI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. User Accounts</h2>
            <p>
              To access certain features of the platform, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Acceptable Use</h2>
            <p className="mb-2">When using Stack AI, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Submit false, misleading, or malicious reviews or ratings</li>
              <li>Attempt to scrape, data-mine, or extract content from the platform without permission</li>
              <li>Interfere with or disrupt the security, integrity, or performance of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>
              The Stack AI platform, including its original content, design, logo, and features, is owned by Stack AI and is protected by international copyright, trademark, and other intellectual property laws. Third-party tool logos and names belong to their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>
              Stack AI is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of the tools listed on our platform.
            </p>
            <p className="text-sm text-[#737373] mt-6">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;
