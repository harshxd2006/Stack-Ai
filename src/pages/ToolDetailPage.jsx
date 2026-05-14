import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import ToolDetailHero from '../components/tools/ToolDetailHero';
import ToolExtendedDetails from '../components/tools/ToolExtendedDetails';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import RatingOverview from '../components/reviews/RatingOverview';
import SimilarTools from '../components/tools/SimilarTools';
import { useAuth } from '../context/AuthContext';
import { useTools } from '../hooks/useTools';
import Skeleton from '../components/ui/Skeleton';

const ToolDetailPage = () => {
  const { slug: toolSlug } = useParams();
  const { user } = useAuth();
  const { tools, loading } = useTools({ slug: toolSlug });
  
  const tool = tools?.[0];

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <Skeleton className="w-full h-64 rounded-2xl max-w-7xl mx-auto" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Tool not found</h1>
        <p className="text-gray-400">The tool you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <SEO title={`${tool.name || toolSlug} - StackAi`} />
      
      <ToolDetailHero tool={tool} />
      
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          <ToolExtendedDetails tool={tool} />
          
          <section id="reviews">
            <h2 className="text-3xl font-bold font-syne text-white mb-8">Reviews</h2>
            <RatingOverview />
            
            <div className="mt-8 mb-12">
              <ReviewForm toolId={toolSlug} />
            </div>
            
            <ReviewList toolId={toolSlug} />
          </section>
        </div>
        
        <div className="space-y-8">
          <SimilarTools categoryId={tool?.category_id} currentToolId={tool?.id} />
        </div>
      </div>
    </motion.div>
  );
};

export default ToolDetailPage;
