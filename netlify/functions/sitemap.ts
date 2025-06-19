import { Handler } from '@netlify/functions';
import { generateSitemap } from '../../src/utils/sitemap';

export const handler: Handler = async () => {
  try {
    const sitemap = generateSitemap();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: sitemap
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error generating sitemap' })
    };
  }
}; 