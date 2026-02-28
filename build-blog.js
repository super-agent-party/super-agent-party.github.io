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
    'article-zh.html',
    'plugins-template-en.html',
    'plugins-template-zh.html',
    'mcp-template-en.html',
    'mcp-template-zh.html',
    'skills-template-en.html',
    'skills-template-zh.html'
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

// 读取博客静态模板
let templateEn = '';
let templateZh = '';
try {
    templateEn = fs.readFileSync(path.join(__dirname, 'template-en.html'), 'utf-8');
    templateZh = fs.readFileSync(path.join(__dirname, 'template-zh.html'), 'utf-8');
} catch (e) {
    console.warn("⚠️ Warning: Blog HTML templates not found.");
}

// 提取和解析所有 Markdown 文章数据
function getPosts(lang) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    return files.map(filename => {
        const fileContent = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data, content } = matter(fileContent);
        
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

        const pageRenderer = new marked.Renderer();
        const localDirRootUrl = `/posts/${lang}/`; 
        let tocHtml = '';
        let headingCount = 0;

        // --- 核心修改：支持 H1, H2, H3 作为导航 ---
        pageRenderer.heading = function(obj) {
            const text = typeof obj === 'object' ? obj.text : arguments[0];
            const level = typeof obj === 'object' ? obj.depth : arguments[1];
            
            // 只要是 H1, H2, H3 都生成锚点
            if (level >= 1 && level <= 3) {
                const id = `heading-${headingCount++}`;
                
                // 根据层级定义 Tailwind 样式
                let linkClass = '';
                if (level === 1) {
                    // 一级标题：最粗，靠左，带明显左边框
                    linkClass = 'font-black text-gray-900 dark:text-white border-l-4 border-geekYellow pl-2';
                } else if (level === 2) {
                    // 二级标题：缩进，粗体
                    linkClass = 'ml-3 font-bold text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-geekYellow pl-2';
                } else {
                    // 三级标题：更多缩进，小字，灰色
                    linkClass = 'ml-6 text-gray-500 dark:text-gray-400 text-xs border-l border-transparent hover:border-geekYellow pl-2';
                }

                tocHtml += `<a href="#${id}" class="block transition-all duration-200 hover:text-geekYellow py-1 ${linkClass}">${text}</a>\n`;
                return `<h${level} id="${id}">${text}</h${level}>\n`;
            }
            return `<h${level}>${text}</h${level}>\n`;
        };
        // ----------------------------------------

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
// 生成静态 HTML 页面 (博客)
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
// 生成静态插件市场页面 (Plugins)
// ------------------------------------------------------------------
function generateStaticPlugins() {
    console.log('🚀 开始生成静态化 Plugin 页面...');
    const pluginsJsonPath = path.join(__dirname, 'plugins.json');
    if (!fs.existsSync(pluginsJsonPath)) {
        console.warn('⚠️ plugins.json 未找到，跳过插件静态化构建。');
        return;
    }
    const pluginsData = JSON.parse(fs.readFileSync(pluginsJsonPath, 'utf-8'));

    const buildHtml = (lang) => {
        const isZh = lang === 'zh';
        const allTag = isZh ? '全部' : 'All';
        const authorPrefix = isZh ? '作者:' : 'BY:';
        const copyText = isZh ? '复制链接' : 'Copy';

        const categories = [allTag, ...new Set(pluginsData.map(p => p.category))];
        const tagsHtml = categories.map(cat => `
            <button class="tag-bracket px-3 py-1 border border-gray-400 dark:border-gray-600 text-[11px] md:text-sm ${cat === allTag ? 'active' : ''}" 
                    onclick="setTag(this, '${cat}')">
                [ ${cat} ]
            </button>
        `).join('');

        const cardsHtml = pluginsData.map(p => {
            const displayDesc = isZh ? (p.description_zh || p.description) : p.description;
            return `
                <div class="plugin-card p-5 md:p-6 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-start mb-4 gap-2">
                            <h3 class="text-lg md:text-xl font-bold text-black dark:text-white break-words">${p.name}</h3>
                            <span class="shrink-0 text-[10px] border border-black dark:border-geekYellow px-2 py-0.5 text-black dark:text-geekYellow font-bold">${p.category}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-6 leading-relaxed line-clamp-3">${displayDesc}</p>
                    </div>
                    <div class="mt-auto">
                        <div class="border-t border-gray-200 dark:border-gray-800 pt-4">
                            <div class="flex justify-between items-center text-[10px] mb-3 text-gray-500 font-mono">
                                <span>v${p.version}</span>
                                <span>${authorPrefix} ${p.author}</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="copyLink('${p.repository}')" 
                                        class="py-2 border border-gray-400 dark:border-gray-600 hover:bg-black hover:text-white transition-colors text-[10px] font-bold">
                                    <i class="far fa-copy mr-1"></i> ${copyText}
                                </button>
                                <a href="${p.repository}" target="_blank" 
                                class="py-2 bg-black text-white dark:bg-gray-800 text-center text-[10px] font-bold">
                                    <i class="fab fa-github mr-1"></i> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
        }).join('');
        return { tagsHtml, cardsHtml };
    };

    const processTemplate = (templateFile, outputFile, lang) => {
        const tmplPath = path.join(__dirname, templateFile);
        if (!fs.existsSync(tmplPath)) return;
        let html = fs.readFileSync(tmplPath, 'utf-8');
        const { tagsHtml, cardsHtml } = buildHtml(lang);
        html = html.replace('{{TAGS}}', tagsHtml)
                   .replace('{{PLUGINS_LIST}}', cardsHtml)
                   .replace('{{PLUGINS_JSON}}', JSON.stringify(pluginsData));
        fs.writeFileSync(path.join(__dirname, outputFile), html);
        console.log(`✅ 成功生成静态页面: ${outputFile}`);
    };
    processTemplate('plugins-template-en.html', 'plugins.html', 'en');
    processTemplate('plugins-template-zh.html', 'plugins-zh.html', 'zh');
}

// ------------------------------------------------------------------
// 生成静态 MCP 页面
// ------------------------------------------------------------------
function generateStaticMCP() {
    console.log('🚀 开始生成静态化 MCP 页面...');
    const mcpJsonPath = path.join(__dirname, 'mcp.json');
    if (!fs.existsSync(mcpJsonPath)) {
        console.warn('⚠️ mcp.json 未找到，跳过 MCP 静态化构建。');
        return;
    }
    const mcpData = JSON.parse(fs.readFileSync(mcpJsonPath, 'utf-8'));

    const buildHtml = (lang) => {
        const isZh = lang === 'zh';
        const allTag = isZh ? '全部' : 'All';
        const copyConfigText = isZh ? '复制配置' : 'Copy Config';

        const categories = [allTag, ...new Set(mcpData.map(p => p.category).filter(Boolean))];
        const tagsHtml = categories.map(cat => `
            <button class="tag-bracket px-3 py-1 border border-gray-400 dark:border-gray-600 text-[11px] md:text-sm ${cat === allTag ? 'active' : ''}" 
                    onclick="setTag('${cat}')">
                [ ${cat} ]
            </button>
        `).join('');

        const cardsHtml = mcpData.map(p => {
            const displayDesc = isZh ? (p.description_zh || p.description) : p.description;
            const configStr = JSON.stringify(p.mcpConfig || {}, null, 2);
            const encodedConfig = encodeURIComponent(configStr);

            return `
                <div class="plugin-card p-5 md:p-6 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-start mb-4 gap-2">
                            <h3 class="text-lg md:text-xl font-bold text-black dark:text-white break-words">${p.name}</h3>
                            <span class="shrink-0 text-[10px] border border-black dark:border-geekYellow px-2 py-0.5 text-black dark:text-geekYellow font-bold">${p.category}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-6 leading-relaxed line-clamp-3">${displayDesc}</p>
                    </div>

                    <div class="mt-auto">
                        <div class="border-t border-gray-200 dark:border-gray-800 pt-4 grid grid-cols-2 gap-2">
                            <button onclick="copyConfig('${encodedConfig}')" class="py-2 border border-gray-400 dark:border-gray-600 text-[10px] font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                <i class="far fa-copy mr-1"></i> <span>${copyConfigText}</span>
                            </button>
                            <a href="${p.repository}" target="_blank" class="py-2 bg-black text-white dark:bg-gray-800 text-center text-[10px] font-bold hover:opacity-80 transition-opacity">
                                <i class="fab fa-github mr-1"></i> GitHub
                            </a>
                        </div>
                    </div>
                </div>`;
        }).join('');
        return { tagsHtml, cardsHtml };
    };

    const processTemplate = (templateFile, outputFile, lang) => {
        const tmplPath = path.join(__dirname, templateFile);
        if (!fs.existsSync(tmplPath)) return;
        let html = fs.readFileSync(tmplPath, 'utf-8');
        const { tagsHtml, cardsHtml } = buildHtml(lang);
        
        html = html.replace('{{TAGS}}', tagsHtml)
                   .replace('{{MCP_LIST}}', cardsHtml)
                   .replace('{{MCP_JSON}}', JSON.stringify(mcpData));
        
        fs.writeFileSync(path.join(__dirname, outputFile), html);
        console.log(`✅ 成功生成静态页面: ${outputFile}`);
    };

    processTemplate('mcp-template-en.html', 'mcp.html', 'en');
    processTemplate('mcp-template-zh.html', 'mcp-zh.html', 'zh');
}

// ------------------------------------------------------------------
// 生成静态 Skills 技能库页面
// ------------------------------------------------------------------
function generateStaticSkills() {
    console.log('🚀 开始生成静态化 Skills 页面...');
    const skillsJsonPath = path.join(__dirname, 'skills.json');
    if (!fs.existsSync(skillsJsonPath)) {
        console.warn('⚠️ skills.json 未找到，跳过 Skills 静态化构建。');
        return;
    }
    const skillsData = JSON.parse(fs.readFileSync(skillsJsonPath, 'utf-8'));

    const buildHtml = (lang) => {
        const isZh = lang === 'zh';
        const allTag = isZh ? '全部' : 'All';
        const authorPrefix = isZh ? '作者:' : 'Author:';
        const copyText = isZh ? '复制链接' : 'Copy';
        const repoText = isZh ? '开源代码' : 'GitHub';

        const categories = [allTag, ...new Set(skillsData.map(p => p.category))];
        const tagsHtml = categories.map(cat => `
            <button class="tag-bracket px-3 py-1 border border-gray-400 dark:border-gray-600 text-[11px] md:text-sm ${cat === allTag ? 'active' : ''}" 
                    onclick="setTag(this, '${cat}')">
                [ ${cat} ]
            </button>
        `).join('');

        const cardsHtml = skillsData.map(p => {
            const displayDesc = isZh ? (p.description_zh || p.description) : p.description;
            
            return `
                <div class="plugin-card p-5 md:p-6 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-start mb-4 gap-2">
                            <h3 class="text-lg md:text-xl font-bold text-black dark:text-white break-words">${p.name}</h3>
                            <span class="shrink-0 text-[10px] border border-black dark:border-geekYellow px-2 py-0.5 text-black dark:text-geekYellow font-bold">${p.category}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-6 leading-relaxed line-clamp-3">${displayDesc}</p>
                    </div>

                    <div class="mt-auto">
                        <div class="border-t border-gray-200 dark:border-gray-800 pt-4">
                            <div class="flex justify-between items-center text-[10px] mb-3 text-gray-500 font-mono">
                                <span>${authorPrefix} ${p.author}</span>
                                <span>Repo: GitHub</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="copyLink('${p.repository}')" 
                                        class="py-2 border border-gray-400 dark:border-gray-600 hover:bg-black hover:text-white transition-colors text-[10px] font-bold">
                                    <i class="far fa-copy mr-1"></i> <span>${copyText}</span>
                                </button>
                                <a href="${p.repository}" target="_blank" 
                                   class="py-2 bg-black text-white dark:bg-gray-800 text-center text-[10px] font-bold hover:opacity-80 transition-opacity">
                                    <i class="fab fa-github mr-1"></i> <span>${repoText}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
        }).join('');
        return { tagsHtml, cardsHtml };
    };

    const processTemplate = (templateFile, outputFile, lang) => {
        const tmplPath = path.join(__dirname, templateFile);
        if (!fs.existsSync(tmplPath)) {
            console.warn(`⚠️ 模板未找到: ${templateFile}`);
            return;
        }
        let html = fs.readFileSync(tmplPath, 'utf-8');
        const { tagsHtml, cardsHtml } = buildHtml(lang);
        
        html = html.replace('{{TAGS}}', tagsHtml)
                   .replace('{{SKILLS_LIST}}', cardsHtml)
                   .replace('{{SKILLS_JSON}}', JSON.stringify(skillsData));
        
        fs.writeFileSync(path.join(__dirname, outputFile), html);
        console.log(`✅ 成功生成静态页面: ${outputFile}`);
    };

    processTemplate('skills-template-en.html', 'skills.html', 'en');
    processTemplate('skills-template-zh.html', 'skills-zh.html', 'zh');
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
// 生成站点地图 (Sitemap)
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

    // 2. 插入博客静态页面链接
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

// 1. JSON 缓存 (博客)
const mapSimple = ({contentRSS, contentPage, tocHtml, ...rest}) => rest;
fs.writeFileSync(path.join(POSTS_DIR, 'blog.json'), JSON.stringify({ 
    en: postsEn.map(mapSimple), 
    zh: postsZh.map(mapSimple) 
}, null, 2));
console.log('✨ blog.json updated!');

// 2. 静态 HTML (博客)
generateHtmlPages(postsEn, 'en', templateEn);
generateHtmlPages(postsZh, 'zh', templateZh);

// 3. 静态 HTML (插件市场、MCP、Skills)
generateStaticPlugins();
generateStaticMCP();
generateStaticSkills();

// 4. RSS
fs.writeFileSync(path.join(POSTS_DIR, 'feed.xml'), generateRSS(postsEn, 'en'));
fs.writeFileSync(path.join(POSTS_DIR, 'feed-zh.xml'), generateRSS(postsZh, 'zh'));
console.log('✨ RSS generated!');

// 5. Sitemap
generateSitemap(postsEn, postsZh);

console.log('🎉 所有构建任务完成!');