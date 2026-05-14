import React from 'react';
import ToolCard from './ToolCard';
import { useTools } from '../../hooks/useTools';

const SimilarTools = ({ categoryId, currentToolId }) => {
  const { tools, loading } = useTools({ categoryId, limit: 5 });
  
  // Filter out the current tool and limit to 4
  const similarTools = tools.filter(t => t.id !== currentToolId).slice(0, 4);

  if (!loading && similarTools.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold mb-6">Similar Tools</h3>
      <div className="flex flex-col gap-4">
        {similarTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default SimilarTools;
