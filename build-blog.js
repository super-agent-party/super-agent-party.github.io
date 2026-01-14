const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const xml = require('xml');
const { marked } = require('marked'); // 引入 Markdown 转换器

const POSTS_DIR = path.join(__dirname, 'posts');
// ★★★ 请务必确认这里是你的真实域名，否则RSS里的图片和链接会打不开 ★★★
const BASE_URL = 'https://www.agentparty.top'; 

// 确保文件夹存在
const folders = [POSTS_DIR, path.join(POSTS_DIR, 'en'), path.join(POSTS_DIR, 'zh')];
folders.forEach(f => {
    if (!fs.existsSync(f)) fs.mkdirSync(f, { recursive: true });
});

function getPosts(lang) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    return files.map(filename => {
        const fileContent = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data, content } = matter(fileContent);
        
        // 1. 自动提取封面图逻辑
        let cover = data.cover || null; // 优先读取 header 里的 cover: xxx.jpg

        if (!cover) {
            // 如果 header 没写，正则抓取正文第一张图
            // 支持 Markdown 格式 ![]() 和 HTML 格式 <img src>
            const mdMatch = content.match(/!\[.*?\]\((.*?)(?:\s+".*?")?\)/);
            const htmlMatch = content.match(/<img.*?src=["'](.*?)["']/);
            
            if (mdMatch || htmlMatch) {
                let imgPath = mdMatch ? mdMatch[1] : htmlMatch[1];
                
                // 如果是相对路径 (img.png 或 ./img.png)，加上目录前缀
                if (!imgPath.startsWith('http') && !imgPath.startsWith('//') && !imgPath.startsWith('/')) {
                    // 去掉可能的 ./
                    imgPath = imgPath.replace(/^\.\//, '');
                    // 拼接完整路径: posts/en/img.png
                    cover = `posts/${lang}/${imgPath}`;
                } else {
                    cover = imgPath;
                }
            }
        }

        // 2. 生成正文 HTML (RSS用，这里我加上了绝对路径修正，防止RSS里图片裂开)
        const renderer = new marked.Renderer();
        const absoluteResourceUrl = `${BASE_URL}/posts/${lang}/`;

        renderer.image = function({ href, title, text }) {
            // 兼容旧版 marked 参数
            const linkHref = href || arguments[0];
            const linkTitle = title || arguments[1];
            const linkText = text || arguments[2];

            let finalSrc = linkHref;
            if (linkHref && !linkHref.startsWith('http') && !linkHref.startsWith('//')) {
                finalSrc = `${absoluteResourceUrl}${linkHref.replace(/^\.\//, '')}`;
            }
            return `<img src="${finalSrc}" alt="${linkText}" title="${linkTitle || ''}" />`;
        };

        const htmlContent = marked.parse(content, { renderer: renderer });

        return {
            id: filename.replace('.md', ''),
            title: data.title || 'No Title',
            date: data.date || new Date().toISOString().split('T')[0],
            description: data.description || '',
            tags: data.tags || [],
            lang: lang,
            cover: cover, // ★ 提取出的图片路径
            content: htmlContent 
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateRSS(posts, lang) {
    const feedObj = {
        rss: [
            { 
                _attr: { 
                    version: '2.0', 
                    'xmlns:atom': 'http://www.w3.org/2005/Atom',
                    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/' // ★ 必须引入 content 命名空间
                } 
            },
            {
                channel: [
                    { title: `Super Agent Party Blog (${lang.toUpperCase()})` },
                    { link: `${BASE_URL}/blog.html` },
                    { description: 'Updates from Super Agent Party' },
                    { language: lang === 'zh' ? 'zh-cn' : 'en-us' },
                    { generator: 'NodeJS Build Script' },
                    ...posts.map(post => ({
                        item: [
                            { title: post.title },
                            { link: `${BASE_URL}/article.html?lang=${lang}&slug=${post.id}` },
                            { pubDate: new Date(post.date).toUTCString() },
                            { description: post.description }, // 纯文本简介
                            { guid: `${BASE_URL}/article.html?lang=${lang}&slug=${post.id}` },
                            // ★ 核心修改：添加全文内容，必须用 CDATA 包裹
                            { 
                                'content:encoded': { 
                                    _cdata: post.content 
                                } 
                            }
                        ]
                    }))
                ]
            }
        ]
    };
    return xml(feedObj, { declaration: true, indent: '  ' });
}

// 执行
console.log('Building Blog Data...');
const postsEn = getPosts('en');
const postsZh = getPosts('zh');

// 写入 blog.json (为了减小体积，JSON 里我们可以不放 content，或者放进去供前端预加载，这里先去掉 content 减小体积)
// 前端 article.html 是重新请求 md 文件的，所以 json 不需要 full content
const postsEnSimple = postsEn.map(({content, ...rest}) => rest);
const postsZhSimple = postsZh.map(({content, ...rest}) => rest);

fs.writeFileSync(path.join(POSTS_DIR, 'blog.json'), JSON.stringify({ en: postsEnSimple, zh: postsZhSimple }, null, 2));

// 写入 RSS (包含全文)
fs.writeFileSync(path.join(POSTS_DIR, 'feed.xml'), generateRSS(postsEn, 'en'));
fs.writeFileSync(path.join(POSTS_DIR, 'feed-zh.xml'), generateRSS(postsZh, 'zh'));

console.log('✨ RSS with full content generated!');