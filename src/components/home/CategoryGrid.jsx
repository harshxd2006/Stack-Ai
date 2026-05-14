import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { CATEGORIES } from '../../utils/constants';
import GSAPRingCarousel from '../ui/GSAPRingCarousel';

const CategoryGrid = () => {
  const { categories: dbCategories, loading } = useCategories();
  const navigate = useNavigate();
  
  // Use dbCategories if available, otherwise fallback to the default static list
  const displayCategories = dbCategories?.length > 0 ? dbCategories : CATEGORIES;

  // Format categories for the carousel
  const carouselItems = displayCategories.map((cat, index) => ({
    id: cat.slug || cat.id || index.toString(),
    title: cat.name,
    slug: cat.slug,
    // Provide some varied images based on index for the carousel backgrounds
    image: `https://picsum.photos/id/${(index * 15) + 40}/600/400/`
  }));

  const handleCategoryClick = (item) => {
    navigate(`/category/${item.slug}`);
  };

  return (
    <section id="categories" className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-accent/5 blur-[150px] pointer-events-none rounded-full" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }} />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-syne text-white">Browse by Category</h2>
          <Link to="/search" className="text-accent hover:text-accent-hover font-medium">View All &rarr;</Link>
        </div>
      </div>

      <div className="w-full relative z-10">
        <GSAPRingCarousel items={carouselItems} onItemClick={handleCategoryClick} />
      </div>
    </section>
  );
};

export default CategoryGrid;
