const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // 需要 npm install gray-matter
const xml = require('xml'); // 需要 npm install xml

const POSTS_DIR = path.join(__dirname, 'posts');
const BASE_URL = 'https://yourwebsite.com'; // ★★★ 请修改为你的实际域名 ★★★

// 读取文章函数
function getPosts(lang) {
    const dir = path.join(POSTS_DIR, lang);
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    const posts = files.map(filename => {
        const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data } = matter(content); // 解析 YAML 头部
        return {
            id: filename.replace('.md', ''),
            title: data.title || 'No Title',
            date: data.date || new Date().toISOString().split('T')[0],
            description: data.description || '',
            tags: data.tags || [],
            lang: lang,
            file: filename
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // 按日期倒序
    
    return posts;
}

// 生成 RSS
function generateRSS(posts, lang) {
    const feedObj = {
        rss: [
            { _attr: { version: '2.0', 'xmlns:atom': 'http://www.w3.org/2005/Atom' } },
            {
                channel: [
                    { title: `Super Agent Party Blog (${lang.toUpperCase()})` },
                    { link: `${BASE_URL}/blog.html` },
                    { description: 'Updates from Super Agent Party' },
                    { language: lang },
                    ...posts.map(post => ({
                        item: [
                            { title: post.title },
                            { link: `${BASE_URL}/article.html?lang=${lang}&slug=${post.id}` },
                            { pubDate: new Date(post.date).toUTCString() },
                            { description: post.description },
                            { guid: `${BASE_URL}/article.html?lang=${lang}&slug=${post.id}` }
                        ]
                    }))
                ]
            }
        ]
    };
    return xml(feedObj, { declaration: true, indent: '  ' });
}

// 主逻辑
const postsEn = getPosts('en');
const postsZh = getPosts('zh');

const allPosts = {
    en: postsEn,
    zh: postsZh
};

// 1. 写入 blog.json (供前端 JS 使用)
fs.writeFileSync(path.join(POSTS_DIR, 'blog.json'), JSON.stringify(allPosts, null, 2));
console.log('✅ Generated posts/blog.json');

// 2. 写入 RSS XML
fs.writeFileSync(path.join(POSTS_DIR, 'feed.xml'), generateRSS(postsEn, 'en'));
fs.writeFileSync(path.join(POSTS_DIR, 'feed-zh.xml'), generateRSS(postsZh, 'zh'));
console.log('✅ Generated RSS feeds');