import React from 'react';
import { useTools } from '../../hooks/useTools';
import ToolCard from '../tools/ToolCard';

const TrendingSection = () => {
  const { tools, loading } = useTools({ limit: 4 });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
          <p className="text-text-muted">The most popular AI tools this week</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!loading && tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
