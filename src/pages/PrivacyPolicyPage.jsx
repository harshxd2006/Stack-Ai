import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-screen"
    >
      <SEO title="Privacy Policy - Stack AI" />
      
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-2xl border border-white/10 mt-10">
        <h1 className="text-4xl font-bold font-syne mb-8 text-white">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              When you use Stack AI, we may collect information that you provide to us directly, such as your email address and profile information when you register for an account. We also automatically collect certain information about your device and how you interact with our platform, including IP addresses, browser types, and usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and content</li>
              <li>Process your account registration and authentication</li>
              <li>Communicate with you about updates, security alerts, and support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our official support channels.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
