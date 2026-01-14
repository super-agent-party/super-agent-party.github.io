const fs = require('fs');
const path = require('path');

// ================= 配置区域 =================
const YOUR_DOMAIN = 'https://www.agentparty.top';
const OUTPUT_FILE = path.join(process.cwd(), 'sitemap.xml');

// 这里指向你的文章存放目录
const POSTS_DIR = path.join(process.cwd(), 'posts');

// 排除的系统文件夹
const EXCLUDE_DIRS = ['.git', 'node_modules', 'assets', 'img', 'css', 'js'];
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
  // 第一部分：扫描根目录下的普通 HTML 文件
  // ---------------------------------------------------------
  console.log('👉 正在扫描静态 HTML 页面...');
  const rootFiles = fs.readdirSync(process.cwd()); // 只扫根目录一层即可，避免乱七八糟的
  
  rootFiles.forEach(file => {
    // 只处理 .html
    if (!file.endsWith('.html')) return;

    // 排除 article.html (这是模板，不应该直接被索引)
    if (file === 'article.html') return;

    let urlPath = file;
    // 如果是 index.html，URL 应该是 /，而不是 /index.html
    if (file === 'index.html') {
        urlPath = '';
    } else {
        urlPath = '/' + file;
    }

    xml += `
  <url>
    <loc>${YOUR_DOMAIN}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
  });

  // ---------------------------------------------------------
  // 第二部分：深入 posts 文件夹扫描 Markdown
  // ---------------------------------------------------------
  console.log(`👉 正在扫描 Markdown 文章 (目录: ${POSTS_DIR})...`);
  
  if (fs.existsSync(POSTS_DIR)) {
    const allMdFiles = getFiles(POSTS_DIR);

    allMdFiles.forEach(filePath => {
      // 只处理 .md 文件
      if (!filePath.endsWith('.md')) return;

      // 获取相对于 posts 目录的路径
      // 例如 filePath 是 /Users/.../posts/zh/hello-world.md
      // relativePath 就是 "zh/hello-world.md" (Windows下可能是 "zh\hello-world.md")
      const relativePath = path.relative(POSTS_DIR, filePath);
      
      // 拆分路径：[ 'zh', 'hello-world.md' ]
      const parts = relativePath.split(path.sep);

      // 只有在子文件夹里的 md 才算有效 (例如 posts/zh/xxx.md)
      // 如果直接放在 posts/xxx.md，我们很难判断 lang 是什么，暂且跳过或默认为 en
      if (parts.length >= 2) {
        const lang = parts[0]; // 获取语言 (例如 zh)
        const filename = parts[parts.length - 1]; // 获取文件名 (例如 hello-world.md)
        const slug = filename.replace('.md', ''); // 去掉后缀 (例如 hello-world)

        // 拼接 URL
        // 注意：XML中 & 必须转义为 &amp;
        const fullUrl = `${YOUR_DOMAIN}/article.html?lang=${lang}&amp;slug=${slug}`;

        console.log(`   + 收录文章: [${lang}] ${slug}`);

        xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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