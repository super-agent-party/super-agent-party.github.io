const fs = require('fs');
const path = require('path');

// ================= 配置区域 =================
const YOUR_DOMAIN = 'https://www.agentparty.top'; // 替换你的域名
const OUTPUT_FILE = path.join(process.cwd(), 'sitemap.xml'); // 输出位置

// 这里定义你要排除的路径（比如 404 页面，后台管理页等）
const EXCLUDE_DIRS = ['api', '_next', 'admin'];
// ===========================================

// 辅助函数：递归获取文件路径
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        getFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 核心逻辑
function generateSitemap() {
  const routes = new Set(); // 用 Set 去重

  // 1. 扫描 App Router (Next.js 13+ 推荐) - 寻找 page.tsx / page.js
  const appDir = path.join(process.cwd(), 'app');
  const appFiles = getFiles(appDir);
  
  appFiles.forEach(file => {
    // 只处理 page.tsx 或 page.js
    if (file.match(/page\.(tsx|js|jsx|ts)$/)) {
      // 获取相对于 app 目录的路径
      let routePath = path.relative(appDir, file);
      // 去掉文件名 page.tsx
      routePath = path.dirname(routePath);
      // 处理 Windows 反斜杠
      routePath = routePath.split(path.sep).join('/');
      // 处理根路径 '.'
      if (routePath === '.') routePath = '';
      
      routes.add(routePath);
    }
  });

  // 2. 扫描 Pages Router (老版本) - 寻找 .tsx / .js
  const pagesDir = path.join(process.cwd(), 'pages');
  const pagesFiles = getFiles(pagesDir);

  pagesFiles.forEach(file => {
    if (file.match(/\.(tsx|js|jsx|ts)$/) && !file.includes('_app') && !file.includes('_document') && !file.includes('api/')) {
      let routePath = path.relative(pagesDir, file);
      // 去掉扩展名
      routePath = routePath.replace(/\.(tsx|js|jsx|ts)$/, '');
      // 处理 index
      if (routePath.endsWith('index')) routePath = routePath.replace(/index$/, '');
      // 去掉尾部斜杠
      if (routePath.endsWith('/') && routePath.length > 1) routePath = routePath.slice(0, -1);
      
      routePath = routePath.split(path.sep).join('/');
      routes.add(routePath);
    }
  });

  // 3. 生成 XML 字符串
  const currentDate = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 添加每一个路由
  routes.forEach(route => {
    // 确保 URL 格式正确（处理空路径为首页）
    const cleanRoute = route === '' || route === '.' ? '' : route;
    // 如果路径不为空且不以 / 开头，补一个 /
    const urlPath = cleanRoute ? (cleanRoute.startsWith('/') ? cleanRoute : `/${cleanRoute}`) : '';
    
    xml += `
  <url>
    <loc>${YOUR_DOMAIN}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${urlPath === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  // 4. 写入文件
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Sitemap 已成功生成到: ${OUTPUT_FILE}`);
  console.log(`共包含 ${routes.size} 个页面。`);
}

// 执行
generateSitemap();