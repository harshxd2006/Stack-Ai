import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { useTools } from '../hooks/useTools';
import GSAPRingCarousel from '../components/ui/GSAPRingCarousel';
import Skeleton from '../components/ui/Skeleton';

const CategoryPage = () => {
  const { slug: categorySlug } = useParams();
  const { tools, loading } = useTools({ categorySlug });
  const navigate = useNavigate();

  // Format tools for the carousel
  const carouselItems = (tools || []).map((tool, index) => ({
    id: tool.id || index.toString(),
    title: tool.name,
    subtitle: tool.pricing_model || 'Premium',
    slug: tool.slug,
    image: tool.logo_url || `https://picsum.photos/id/${(index * 22) + 12}/600/400/`
  }));

  const handleToolClick = (item) => {
    navigate(`/tool/${item.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center"
    >
      <SEO title={`Category: ${categorySlug} - StackAi`} />
      
      <div className="mb-10 text-center relative z-20 w-full">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4 text-white capitalize drop-shadow-md">
          {categorySlug?.replace(/-/g, ' ')} AI Tools
        </h1>
        <p className="text-[#737373] max-w-2xl mx-auto">
          Explore the best tools for {categorySlug?.replace(/-/g, ' ')}. Drag left or right to explore the interactive ring.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[500px] w-full">
          <Skeleton className="w-[250px] h-[350px] rounded-2xl" />
        </div>
      ) : carouselItems.length > 0 ? (
        <div className="w-full flex justify-center items-center">
          <GSAPRingCarousel items={carouselItems} onItemClick={handleToolClick} />
        </div>
      ) : (
        <div className="text-center py-20 bg-card/30 border border-[#262626] rounded-2xl max-w-3xl mx-auto">
          <h3 className="text-xl text-white font-medium mb-2">No tools found</h3>
          <p className="text-[#737373]">There are currently no AI tools listed in this category.</p>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryPage;
