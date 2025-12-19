import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

// 从环境变量获取后端地址，支持自定义端口
// 默认先尝试使用K8S服务名称，如果失败则回退到localhost:8001
let BACKEND_URL = process.env.VITE_API_BASE_URL ||
  process.env.BACKEND_SERVICE_URL ||
  'http://10.10.11.90:32560';

// 如果BACKEND_URL没有协议前缀，自动添加http://
// 这样可以兼容CloudOS模板变量只传入服务名称的情况
if (BACKEND_URL && !BACKEND_URL.startsWith('http://') && !BACKEND_URL.startsWith('https://')) {
  BACKEND_URL = `http://${BACKEND_URL}`;
  console.log(`[配置] 后端地址缺少协议前缀，已自动补全: ${BACKEND_URL}`);
}

// 检查是否包含端口号，如果是K8S服务名称且没有端口号，自动补全:8000
// 判断依据：URL中包含'li-auto-backend-service'且没有端口号
if (BACKEND_URL && BACKEND_URL.includes('li-auto-backend-service')) {
  try {
    const url = new URL(BACKEND_URL);
    // 如果没有显式指定端口（默认80或443），补全为8000
    if (!BACKEND_URL.match(/:\d+$/)) {
      BACKEND_URL = `${url.protocol}//${url.hostname}:8000${url.pathname}`;
      console.log(`[配置] 后端地址缺少端口号，已自动补全: ${BACKEND_URL}`);
    }
  } catch (e) {
    console.warn(`[配置警告] 无法解析后端URL: ${BACKEND_URL}`, e.message);
  }
}

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'li-auto-frontend' });
});

// API代理 - 将/api/*请求转发到后端服务
app.use(createProxyMiddleware('/api', {
  target: BACKEND_URL,
  changeOrigin: true,
  timeout: 10000,  // 增加超时时间到10秒
  proxyTimeout: 10000,  // 代理超时
  // 不需要pathRewrite，完整转发/api路径

  onProxyReq: (proxyReq, req, res) => {
    const fullUrl = `${BACKEND_URL}${req.originalUrl}`;
    console.log(`[代理请求] ${req.method} ${req.originalUrl} -> ${fullUrl}`);
  },

  onProxyRes: (proxyRes, req, res) => {
    console.log(`[代理响应] ${req.originalUrl} <- ${proxyRes.statusCode}`);
    // 后端的真实状态码会被正确透传（包括404）
  },

  onError: (err, req, res) => {
    // 只有代理本身出错才会到这里
    console.error(`[代理错误] ${req.originalUrl}`);
    console.error(`[代理错误] 错误类型:`, err.code);
    console.error(`[代理错误] 错误信息:`, err.message);
    console.error(`[代理错误] 后端地址:`, BACKEND_URL);

    // 根据错误类型返回更准确的状态码
    if (err.code === 'ECONNREFUSED') {
      res.status(503).json({
        error: 'Service Unavailable',
        message: `无法连接到后端服务: ${BACKEND_URL}`,
        code: err.code
      });
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
      res.status(504).json({
        error: 'Gateway Timeout',
        message: '后端服务响应超时',
        code: err.code
      });
    } else if (err.code === 'ENOTFOUND') {
      res.status(502).json({
        error: 'Bad Gateway',
        message: `无法解析后端服务地址: ${BACKEND_URL}`,
        code: err.code
      });
    } else {
      res.status(500).json({
        error: 'Proxy Error',
        message: err.message,
        code: err.code
      });
    }
  }
}));

// 静态文件服务（排除index.html）
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false
}));

// SPA路由处理 - 所有路由都返回index.html（注入配置）
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  // 读取index.html并注入配置
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error loading page');
      return;
    }

    // 在</head>之前注入配置脚本
    // 使用空字符串作为apiBaseUrl，让前端通过相对路径调用API（通过代理）
    const configScript = `
    <script>
      window.__APP_CONFIG__ = {
        apiBaseUrl: ''
      };
      console.log('[前端配置] API Base URL:', window.__APP_CONFIG__.apiBaseUrl || '(使用相对路径)');
      console.log('[前端配置] 所有API调用将通过Express代理转发到后端服务');
    </script>`;

    const modifiedHtml = data.replace('</head>', `${configScript}</head>`);
    res.send(modifiedHtml);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ 前端服务启动成功`);
  console.log(`✓ 监听端口: ${PORT}`);
  console.log(`✓ 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ 后端API代理目标: ${BACKEND_URL}`);
  console.log(`✓ API代理路径: /api/* -> ${BACKEND_URL}/api/*`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭服务器...');
  process.exit(0);
});
