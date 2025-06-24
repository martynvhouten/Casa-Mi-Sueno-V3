import { Handler, HandlerEvent } from '@netlify/functions';
import { generateSitemap } from '../../src/utils/sitemap';

type Headers = Record<string, string>;

export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    const headers: Headers = {
      'Allow': 'GET',
      'Content-Type': 'application/json'
    };

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const sitemap = generateSitemap();
    
    const headers: Headers = {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      'Access-Control-Allow-Origin': 'https://casamisueno.nl',
      'Access-Control-Allow-Methods': 'GET',
      'X-Content-Type-Options': 'nosniff'
    };

    return {
      statusCode: 200,
      headers,
      body: sitemap
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Log detailed error for debugging but return generic message to user
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Detailed error:', errorMessage);
    
    const headers: Headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    };

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error while generating sitemap' })
    };
  }
}; 