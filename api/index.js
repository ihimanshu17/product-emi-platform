const http = require('http');
const https = require('https');

// Lazily load compiled Express app from server/dist/app
let app;
function getApp() {
  if (!app) {
    const appModule = require('../server/dist/app');
    app = appModule.default || appModule.app || appModule;
  }
  return app;
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // If external Render backend URL is configured, attempt proxying
  const backendUrl = process.env.RENDER_BACKEND_URL || process.env.BACKEND_URL;

  if (backendUrl) {
    try {
      const targetUrl = new URL(req.url || '/', backendUrl);
      const client = targetUrl.protocol === 'https:' ? https : http;

      const proxyReq = client.request(
        targetUrl,
        {
          method: req.method,
          headers: {
            ...req.headers,
            host: targetUrl.host,
          },
        },
        (proxyRes) => {
          if (proxyRes.statusCode && proxyRes.statusCode < 500) {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
          } else {
            getApp()(req, res);
          }
        }
      );

      proxyReq.on('error', () => {
        getApp()(req, res);
      });

      if (req.body) {
        proxyReq.write(typeof req.body === 'string' ? req.body : JSON.stringify(req.body));
      }
      proxyReq.end();
      return;
    } catch {
      // Fallback
    }
  }

  // Native high-fidelity Express backend execution
  try {
    return getApp()(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: 'Internal Server Error',
      message: err.message
    }));
  }
};
