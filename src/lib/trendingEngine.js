/**
 * Pure JavaScript Z-score anomaly detection for trending tools.
 */

/**
 * Calculate the Z-Score of a specific value against an array of all values.
 * Z-score = (X - μ) / σ
 */
export function calculateZScore(currentValue, allValues) {
  if (!allValues || allValues.length === 0) return 0;
  
  const mean = allValues.reduce((a, b) => a + b, 0) / allValues.length;
  
  const variance = allValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / allValues.length;
  const stdDev = Math.sqrt(variance);
  
  if (stdDev === 0) return 0; // Avoid division by zero when all values are identical
  
  return (currentValue - mean) / stdDev;
}

/**
 * Helper: Get the number of views in the last N days.
 */
export function getViewsLastNDays(viewsArray, n) {
  if (!viewsArray || !viewsArray.length) return 0;
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - n);
  
  return viewsArray.filter(view => new Date(view.viewed_at) >= cutoffDate).length;
}

/**
 * Helper: Get the rolling average of views per day over a given window.
 */
export function getRollingAverage(viewsArray, windowSizeDays = 30) {
  const total = getViewsLastNDays(viewsArray, windowSizeDays);
  return total / windowSizeDays;
}

/**
 * Main Engine: Processes a raw views dataset and detects trending tools using Z-scores.
 * 
 * @param {Object} viewsData - Object grouped by tool_id: { "tool-1": [{ viewed_at: "..." }], "tool-2": [...] }
 * @returns {Array} - Array of tools sorted by Z-score (descending) with assigned statuses.
 */
export function detectTrendingTools(viewsData) {
  const tools = Object.keys(viewsData);
  if (tools.length === 0) return [];

  // We compare each tool's velocity (views in last 7 days) against the population
  const currentWindowViews = tools.map(tool => ({
    id: tool,
    views: getViewsLastNDays(viewsData[tool], 7),
    totalViews: viewsData[tool].length,
  }));

  const allViewCounts = currentWindowViews.map(t => t.views);

  return currentWindowViews.map(tool => {
    const zScore = calculateZScore(tool.views, allViewCounts);
    
    let label = "➡️ Stable";
    let color = "#888888"; // Gray
    
    if (zScore >= 1.5) {
      label = "🔥 Trending";
      color = "#FF4B4B"; // Red
    } else if (zScore >= 0.5) {
      label = "📈 Rising";
      color = "#7C3AED"; // Violet
    } else if (zScore <= -1.0) {
      label = "📉 Declining";
      color = "#FF8F00"; // Orange
    }

    return {
      ...tool,
      zScore: Number(zScore.toFixed(2)),
      statusLabel: label,
      statusColor: color
    };
  }).sort((a, b) => b.zScore - a.zScore);
}
