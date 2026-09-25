const http = require('http');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// 配置 DeepSeek API（兼容 OpenAI SDK）
const client = new OpenAI({
  apiKey: 'sk-8207e2d55be8491783d0955bee458597',
  baseURL: 'https://api.deepseek.com/v1'
});

const SYSTEM_PROMPT = `你是一个资深AI产品面试官。请诊断以下简历，按五个维度打分（岗位匹配、数据量化、经历表达、关键词覆盖、结构可读），指出3个最致命的问题，并给出逐句改写建议。
遇到百分比数据无基数时，输出"X%"占位符，不许编造具体数字。`;

const server = http.createServer(async (req, res) => {
  // 返回前端页面
  if (req.url === '/' && req.method === 'GET') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // 诊断接口
  if (req.url === '/api/diagnose' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { resume } = JSON.parse(body);
        const completion = await client.chat.completions.create({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `目标岗位：AI产品经理\n简历内容：${resume}` }
          ]
        });
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ result: completion.choices[0].message.content }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ result: '出错了：' + err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(3000, () => {
  console.log('服务已启动：http://localhost:3000');
});