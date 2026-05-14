import React from 'react';
import { Link } from 'react-router-dom';
import ToolCard from '../tools/ToolCard';
import { useTools } from '../../hooks/useTools';
import Skeleton from '../ui/Skeleton';

const FeaturedTools = () => {
  const { tools, loading } = useTools({ featured: true, limit: 4 });

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
            <p className="text-text-muted">Hand-picked by our editorial team</p>
          </div>
          <Link to="/search" className="text-accent hover:text-accent-hover font-medium">Discover More &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-4 space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : tools.length > 0 ? (
            tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-text-muted">
              No featured tools found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
