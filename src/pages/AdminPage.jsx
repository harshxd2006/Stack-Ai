import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import AIDescriptionGenerator from '../components/admin/AIDescriptionGenerator';

const AdminPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24 min-h-screen"
    >
      <SEO title="Admin Tools - StackAi" description="Admin tools for managing AI tools on Stack AI platform." />

      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4 text-white">
          Admin Dashboard
        </h1>
        <p className="text-[#737373] max-w-2xl mx-auto font-dm-sans">
          Manage platform data and generate new tool entries.
        </p>
      </div>

      <AIDescriptionGenerator />
    </motion.div>
  );
};

export default AdminPage;
