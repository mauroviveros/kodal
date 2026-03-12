import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { code } = params;

  // Add your redirect logic here
  const targetUrl = `https://example.com/${code}`;

  return new Response(null, {
    status: 301,
    headers: {
      'Location': targetUrl,
    },
  });
};
