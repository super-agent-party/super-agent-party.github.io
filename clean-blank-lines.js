#!/usr/bin/env node
/**
 * clean-blank-lines.js
 * 遍历当前目录下所有 .html 和 .js 文件（排除 node_modules 和 .git），
 * 1. 去除所有 \r 字符
 * 2. 将连续空白行压缩为一个空行
 * 3. 去除文末多余空行
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const TARGET_EXTS = new Set(['.html', '.js']);
const EXCLUDE_DIRS = new Set(['node_modules', '.git']);
function walkDir(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (!EXCLUDE_DIRS.has(entry.name)) {
                results.push(...walkDir(fullPath));
            }
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (TARGET_EXTS.has(ext)) {
                results.push(fullPath);
            }
        }
    }
    return results;
}
function cleanContent(raw) {
    // Step 1: Remove ALL \r characters
    let content = raw.replace(/\r/g, '');
    // Step 2: Normalize line endings to \n
    const hasTrailingNewline = content.endsWith('\n');
    const lines = content.split('\n');
    // Step 3: Remove ALL blank lines (keep no empty lines at all)
    const result = [];
    for (const line of lines) {
        const isBlank = /^\s*$/.test(line);
        if (!isBlank) {
            result.push(line);
        }
    }
    let output = result.join('\n');
    if (hasTrailingNewline) {
        output += '\n';
    }
    return output;
}
function writeFileSafe(filePath, data) {
    try {
        fs.writeFileSync(filePath, data, 'utf-8');
        return;
    } catch (e) {
        if (e.code === 'EACCES' || e.code === 'EPERM') {
            const tmpFile = path.join(os.tmpdir(), 'clean-blank-' + path.basename(filePath) + '-' + Date.now());
            fs.writeFileSync(tmpFile, data, 'utf-8');
            execSync(`cp -f "${tmpFile}" "${filePath}"`, { stdio: 'pipe' });
            try { fs.unlinkSync(tmpFile); } catch (_) {}
        } else {
            throw e;
        }
    }
}
function main() {
    const rootDir = process.argv[2] || '.';
    const targetDir = path.resolve(rootDir);
    console.log(`扫描目录: ${targetDir}\n`);
    const files = walkDir(targetDir);
    console.log(`找到 ${files.length} 个文件 (.html / .js):\n`);
    let totalCleaned = 0;
    let totalOriginalLines = 0;
    let totalNewLines = 0;
    let totalCrRemoved = 0;
    for (const filePath of files) {
        const original = fs.readFileSync(filePath, 'utf-8');
        const cleaned = cleanContent(original);
        if (original !== cleaned) {
            const origLines = original.split(/\r?\n/).length;
            const newLines = cleaned.split('\n').length;
            const removed = origLines - newLines;
            const crCount = (original.match(/\r/g) || []).length;
            writeFileSafe(filePath, cleaned);
            console.log(`✓ ${filePath}`);
            console.log(`  原始:${origLines}行 → 新:${newLines}行  去除${removed}个空行, ${crCount}个\\r`);
            totalCleaned++;
            totalOriginalLines += origLines;
            totalNewLines += newLines;
            totalCrRemoved += crCount;
        } else {
            console.log(`  ${filePath} (无需处理)`);
        }
    }
    console.log(`\n==================== 处理完成 ====================`);
    console.log(`修改文件: ${totalCleaned} 个`);
    console.log(`总行数变化: ${totalOriginalLines} → ${totalNewLines} (减少 ${totalOriginalLines - totalNewLines} 个空行)`);
    console.log(`清除 \\r 字符: ${totalCrRemoved} 个`);
}
main();
