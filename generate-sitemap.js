const fs = require('fs');
const path = require('path');

// ================= 配置区域 =================
const YOUR_DOMAIN = 'https://www.agentparty.top';
const OUTPUT_FILE = path.join(process.cwd(), 'sitemap.xml');

// 指向文章存放目录
const POSTS_DIR = path.join(process.cwd(), 'posts');

// 排除的系统文件夹
const EXCLUDE_DIRS = ['.git', 'node_modules', 'assets', 'img', 'css', 'js'];

// 需要排除的 HTML 模板文件 (这些文件需要带参数才能访问，不应直接被索引)
const EXCLUDE_HTML_FILES = ['article.html', 'article-zh.html']; 
// ===========================================

// 递归获取所有文件路径
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  console.log('🚀 开始生成 Sitemap...');

  // ---------------------------------------------------------
  // 第一部分：扫描根目录下的静态 HTML 文件
  // ---------------------------------------------------------
  console.log('👉 正在扫描静态 HTML 页面...');
  const rootFiles = fs.readdirSync(process.cwd()); 
  
  rootFiles.forEach(file => {
    // 1. 只处理 .html
    if (!file.endsWith('.html')) return;

    // 2. 排除文章模板页 (article.html 和 article-zh.html)
    if (EXCLUDE_HTML_FILES.includes(file)) return;

    let urlPath = file;
    // 3. 处理首页路径，index.html 映射为根域名
    if (file === 'index.html') {
        urlPath = '';
    } else {
        urlPath = '/' + file;
    }

    // 4. 读取文件最后修改时间 (可选优化，比全用当前时间对SEO更友好)
    // const stats = fs.statSync(file);
    // const lastMod = stats.mtime.toISOString().split('T')[0];
    // 这里为了简单，还是用 currentDate
    
    xml += `
  <url>
    <loc>${YOUR_DOMAIN}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${file.includes('index') ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // ---------------------------------------------------------
  // 第二部分：深入 posts 文件夹扫描 Markdown 并生成文章链接
  // ---------------------------------------------------------
  console.log(`👉 正在扫描 Markdown 文章 (目录: ${POSTS_DIR})...`);
  
  if (fs.existsSync(POSTS_DIR)) {
    const allMdFiles = getFiles(POSTS_DIR);

    allMdFiles.forEach(filePath => {
      if (!filePath.endsWith('.md')) return;

      const relativePath = path.relative(POSTS_DIR, filePath);
      const parts = relativePath.split(path.sep);

      // 确保文件结构是 posts/[lang]/[slug].md
      if (parts.length >= 2) {
        const lang = parts[0]; // 'zh' 或 'en'
        const filename = parts[parts.length - 1]; 
        const slug = filename.replace('.md', '');

        // === 关键修改逻辑开始 ===
        // 根据文件夹语言，决定指向哪个 HTML 模板
        let targetHtml = '';
        if (lang === 'zh') {
            targetHtml = 'article-zh.html';
        } else {
            targetHtml = 'article.html'; // 默认为英文模板
        }

        // 你的新版 JS 代码只需要 slug 参数，lang 参数由 HTML 文件名决定
        // 记得对 & 符号进行 XML 转义
        const fullUrl = `${YOUR_DOMAIN}/${targetHtml}?slug=${slug}`;
        // === 关键修改逻辑结束 ===

        console.log(`   + 收录文章 [${lang}]: ${slug} -> ${targetHtml}`);

        xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    });
  } else {
    console.log('⚠️ 警告: 没有找到 posts 文件夹，跳过文章扫描。');
  }

  // ---------------------------------------------------------
  // 结束并写入
  // ---------------------------------------------------------
  xml += `\n</urlset>`;
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log('------------------------------------------------');
  console.log(`✅ 成功! Sitemap 已生成: ${OUTPUT_FILE}`);
}

generateSitemap();