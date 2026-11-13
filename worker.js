export default {
  async fetch(request, env, ctx) {
    // این آدرسی است که در Cloudflare ساختیم
    const WORKER_HOST = "cool-snowflake-2b94.ha4363873.workers.dev";
    
    // این کلید امنیتی است که در Apps Script گذاشتیم
    const ZYRLN_RELAY_KEY = env.ZYRLN_RELAY_KEY || "mysecretkey123456";

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }

    try {
      const targetUrl = new URL(request.url);
      targetUrl.hostname = WORKER_HOST;
      
      const newRequest = new Request(targetUrl, request);
      
      if (ZYRLN_RELAY_KEY) {
        newRequest.headers.set('X-Zyrln-Key', ZYRLN_RELAY_KEY);
      }

      return await fetch(newRequest);
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
};
