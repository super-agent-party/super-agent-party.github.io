const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const xml = require('xml');
const { marked } = require('marked');

// ================= 配置区域 =================
const BASE_URL = 'https://www.agentparty.top'; 
const POSTS_DIR = path.join(__dirname, 'posts');
const BLOG_DIR = path.join(__dirname, 'blog'); // 博客输出主目录
const SITEMAP_OUTPUT_FILE = path.join(__dirname, 'sitemap.xml'); // Sitemap输出路径

// 扫描根目录时，需要排除生成的或遗留的动态模板文件
const EXCLUDE_HTML_FILES = [
    'template-en.html', 
    'template-zh.html', 
    'article.html', 
    'article-zh.html'
];
// ============================================

// 确保所需的文件夹全部存在
const folders = [
    POSTS_DIR, 
    path.join(POSTS_DIR, 'en'), 
    path.join(POSTS_DIR, 'zh'),
    BLOG_DIR,
    path.join(BLOG_DIR, 'en'),
    path.join(BLOG_DIR, 'zh')
];
folders.forEach(f => {
    if (!fs.existsSync(f)) fs.mkdirSync(f, { recursive: true });
});

// 读取静态模板
let templateEn = '';
let templateZh = '';
try {
    templateEn = fs.readFileSync(path.join(__dirname, 'template-en.html'), 'utf-8');
    templateZh = fs.readFileSync(path.join(__dirname, 'template-zh.html'), 'utf-8');
} catch (e) {
    console.warn("⚠️ Warning: HTML templates not found. Please create template-en.html and template-zh.html in the root directory.");
}

// 提取和解析所有 Markdown 文章数据
function getPosts(lang) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    return files.map(filename => {
        const fileContent = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data, content } = matter(fileContent);
        
        // --- 提取封面图 ---
        let cover = data.cover || null;
        if (!cover) {
            const mdMatch = content.match(/!\[.*?\]\((.*?)(?:\s+".*?")?\)/);
            const htmlMatch = content.match(/<img.*?src=["'](.*?)["']/);
            if (mdMatch || htmlMatch) {
                let imgPath = mdMatch ? mdMatch[1] : htmlMatch[1];
                if (!imgPath.startsWith('http') && !imgPath.startsWith('//')) {
                    if (imgPath.startsWith('/')) {
                        cover = imgPath.substring(1); 
                    } else {
                        imgPath = imgPath.replace(/^\.\//, '');
                        cover = `posts/${lang}/${imgPath}`;
                    }
                } else {
                    cover = imgPath;
                }
            }
        }

        // --- 1. 生成 RSS 专用的 HTML ---
        const rssRenderer = new marked.Renderer();
        const postDirUrl = `${BASE_URL}/posts/${lang}/`;
        
        rssRenderer.image = function(obj) {
            const href = typeof obj === 'object' ? obj.href : arguments[0];
            const title = typeof obj === 'object' ? obj.title : arguments[1];
            const text = typeof obj === 'object' ? obj.text : arguments[2];

            let finalSrc = href;
            if (href && !href.startsWith('http') && !href.startsWith('//')) {
                if (href.startsWith('/')) finalSrc = `${BASE_URL}${href}`; 
                else finalSrc = `${postDirUrl}${href.replace(/^\.\//, '')}`;
            }
            return `<img src="${finalSrc}" alt="${text || ''}" title="${title || ''}" />`;
        };
        const contentRSS = marked.parse(content, { renderer: rssRenderer });

        // --- 2. 生成 Web 页面专用的 HTML ---
        const pageRenderer = new marked.Renderer();
        const localDirRootUrl = `/posts/${lang}/`; 
        let tocHtml = '';
        let headingCount = 0;

        pageRenderer.heading = function(obj) {
            const text = typeof obj === 'object' ? obj.text : arguments[0];
            const level = typeof obj === 'object' ? obj.depth : arguments[1];
            if (level === 2 || level === 3) {
                const id = `heading-${headingCount++}`;
                const linkClass = level === 2 ? 'font-bold text-gray-900 dark:text-white' : 'ml-4 text-gray-500 dark:text-gray-400 text-xs';
                tocHtml += `<a href="#${id}" class="block transition-all duration-200 hover:text-geekYellow py-1 border-l-2 border-transparent pl-3 ${linkClass}">${text}</a>\n`;
                return `<h${level} id="${id}">${text}</h${level}>\n`;
            }
            return `<h${level}>${text}</h${level}>\n`;
        };

        pageRenderer.image = function(obj) {
            const href = typeof obj === 'object' ? obj.href : arguments[0];
            const text = typeof obj === 'object' ? obj.text : arguments[2] || '';
            let finalSrc = href;
            if (!href.startsWith('http') && !href.startsWith('/')) {
                finalSrc = localDirRootUrl + href.replace(/^\.\//, '');
            }
            if (finalSrc.includes('img.shields.io') || finalSrc.includes('badge')) {
                return `<img src="${finalSrc}" alt="${text}" style="margin: 0; filter: none; border-radius: 0; box-shadow: none; display: inline-block;" loading="lazy">`;
            }
            return `<figure class="my-8"><img src="${finalSrc}" alt="${text}" class="mx-auto" loading="lazy"></figure>`;
        };

        pageRenderer.link = function(obj) {
            const href = typeof obj === 'object' ? obj.href : arguments[0];
            const text = typeof obj === 'object' ? (obj.tokens ? this.parser.parseInline(obj.tokens) : obj.text) : (arguments[2] || arguments[0]);
            let finalHref = href;
            if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('/')) {
                finalHref = localDirRootUrl + href.replace(/^\.\//, '');
            }
            return `<a href="${finalHref}" target="_blank">${text}</a>`;
        };
        
        const contentPage = marked.parse(content, { renderer: pageRenderer });

        return {
            id: filename.replace('.md', ''),
            title: data.title || 'No Title',
            date: data.date || new Date().toISOString().split('T')[0],
            description: data.description || data.summary || '',
            tags: data.tags || [],
            lang: lang,
            cover: cover, 
            contentRSS: contentRSS,     
            contentPage: contentPage,   
            tocHtml: tocHtml || (lang === 'zh' ? '<p class="text-gray-400 italic text-xs">暂无目录项</p>' : '<p class="text-gray-400 italic text-xs">No headings found.</p>')
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ------------------------------------------------------------------
// 生成静态 HTML 页面
// ------------------------------------------------------------------
function generateHtmlPages(posts, lang, template) {
    if (!template) return;
    const outputDir = path.join(BLOG_DIR, lang);
    const targetLang = lang === 'en' ? 'zh' : 'en';

    posts.forEach(post => {
        const tagsHtml = post.tags.map(t => `<span class="text-[10px] font-bold bg-geekYellow text-black px-2 py-0.5 rounded-sm">${t}</span>`).join('');
        const outputFilename = `article-${post.id}.html`; 
        const langSwitchLink = `../${targetLang}/article-${post.id}.html`;

        let finalHtml = template
            .replace(/{{TITLE}}/g, post.title)
            .replace(/{{DESC}}/g, post.description)
            .replace(/{{DATE}}/g, post.date)
            .replace(/{{FILE}}/g, `${post.id}.md`)
            .replace(/{{TAGS}}/g, tagsHtml)
            .replace(/{{CONTENT}}/g, post.contentPage)
            .replace(/{{TOC}}/g, post.tocHtml)
            .replace(/{{LANG_SWITCH_LINK}}/g, langSwitchLink);

        fs.writeFileSync(path.join(outputDir, outputFilename), finalHtml);
    });
    console.log(`✨ Generated ${posts.length} static HTML pages for [${lang.toUpperCase()}] in /blog/${lang}/`);
}

// ------------------------------------------------------------------
// 生成 RSS
// ------------------------------------------------------------------
function generateRSS(posts, lang) {
    const feedObj = {
        rss: [
            { _attr: { version: '2.0', 'xmlns:atom': 'http://www.w3.org/2005/Atom', 'xmlns:content': 'http://purl.org/rss/1.0/modules/content/' } },
            {
                channel: [
                    { title: `Super Agent Party Blog (${lang.toUpperCase()})` },
                    { link: `${BASE_URL}/blog${lang === 'zh' ? '-zh' : ''}.html` },
                    { description: 'Updates from Super Agent Party' },
                    { language: lang === 'zh' ? 'zh-cn' : 'en-us' },
                    { generator: 'NodeJS Build Script' },
                    ...posts.map(post => {
                        const postLink = `${BASE_URL}/blog/${lang}/article-${post.id}.html`;
                        return {
                            item: [
                                { title: post.title },
                                { link: postLink },
                                { pubDate: new Date(post.date).toUTCString() },
                                { description: post.description },
                                { guid: postLink },
                                { 'content:encoded': { _cdata: post.contentRSS } }
                            ]
                        };
                    })
                ]
            }
        ]
    };
    return xml(feedObj, { declaration: true, indent: '  ' });
}

// ------------------------------------------------------------------
// 核心新增：生成站点地图 (Sitemap)
// 直接复用已解析好的文章数据，无需再次扫描磁盘
// ------------------------------------------------------------------
function generateSitemap(postsEn, postsZh) {
    console.log('🚀 开始生成 Sitemap...');
    const currentDate = new Date().toISOString().split('T')[0];
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. 扫描根目录的静态核心页面
    const rootFiles = fs.readdirSync(__dirname); 
    rootFiles.forEach(file => {
        if (!file.endsWith('.html')) return;
        if (EXCLUDE_HTML_FILES.includes(file)) return;

        let urlPath = file === 'index.html' ? '' : `/${file}`;
        
        sitemapXml += `
  <url>
    <loc>${BASE_URL}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${file.includes('index') ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // 2. 插入博客静态页面链接 (复用解析好的元数据)
    const appendPostsToSitemap = (posts, lang) => {
        posts.forEach(post => {
            const postUrl = `${BASE_URL}/blog/${lang}/article-${post.id}.html`;
            sitemapXml += `
  <url>
    <loc>${postUrl}</loc>
    <lastmod>${post.date || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });
    };

    appendPostsToSitemap(postsEn, 'en');
    appendPostsToSitemap(postsZh, 'zh');

    sitemapXml += `\n</urlset>`;
    fs.writeFileSync(SITEMAP_OUTPUT_FILE, sitemapXml);
    console.log(`✅ Sitemap 成功生成: ${SITEMAP_OUTPUT_FILE}`);
}

// ================= 执行区 =================
console.log('🏗️ Building Blog Data...');
const postsEn = getPosts('en');
const postsZh = getPosts('zh');

// 1. JSON (剔除 content 以减小体积)
const mapSimple = ({contentRSS, contentPage, tocHtml, ...rest}) => rest;
fs.writeFileSync(path.join(POSTS_DIR, 'blog.json'), JSON.stringify({ 
    en: postsEn.map(mapSimple), 
    zh: postsZh.map(mapSimple) 
}, null, 2));
console.log('✨ blog.json updated!');

// 2. 静态 HTML
generateHtmlPages(postsEn, 'en', templateEn);
generateHtmlPages(postsZh, 'zh', templateZh);

// 3. RSS
fs.writeFileSync(path.join(POSTS_DIR, 'feed.xml'), generateRSS(postsEn, 'en'));
fs.writeFileSync(path.join(POSTS_DIR, 'feed-zh.xml'), generateRSS(postsZh, 'zh'));
console.log('✨ RSS generated!');

// 4. Sitemap
generateSitemap(postsEn, postsZh);

console.log('🎉 所有构建任务完成!');