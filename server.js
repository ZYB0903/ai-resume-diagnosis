const http = require('http');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// ============ 配置 DeepSeek API ============
const client = new OpenAI({
  apiKey: 'apiKey: '在这里填你的DeepSeekAPIKey' ',  // ← 换成你自己的 Key
  baseURL: 'https://api.deepseek.com/v1'
});

// ============ 系统提示词 ============
const SYSTEM_PROMPT = `你是一个有10年跨行业招聘经验的资深面试官，服务过互联网、金融、快消、制造、咨询等多个行业。

你的任务是诊断一份简历，针对目标岗位，输出结构化的诊断报告。

评估维度（每个维度0-100分）：
1. 岗位匹配（权重30%）
2. 数据量化（权重30%）
3. 经历表达（权重20%）
4. 关键词覆盖（权重10%）
5. 结构可读（权重10%）

防幻觉规则（必须严格遵守）：
1. 百分比数据无基数时，输出"X%"占位符，不许编造具体数字。
2. 简历未提及的技能，不许做出任何判断。
3. 模糊描述时，输出"这段经历描述不够具体，建议补充数据"。
4. 遇到"参与/协助"等模糊动词，必须提示用户改为"我独立负责"的具体动作。
5. 遇到时间重叠时，不要直接判定为"矛盾"，先判断是否为正常并行。

请严格输出 JSON 格式，不要输出任何其他文字。JSON 结构如下：
{
  "综合评分": 0,
  "一句话总结": "",
  "维度评分": [
    {"维度": "岗位匹配", "分数": 0, "理由": ""},
    {"维度": "数据量化", "分数": 0, "理由": ""},
    {"维度": "经历表达", "分数": 0, "理由": ""},
    {"维度": "关键词覆盖", "分数": 0, "理由": ""},
    {"维度": "结构可读", "分数": 0, "理由": ""}
  ],
  "致命问题": [
    {"严重程度": "高", "描述": "", "建议": ""}
  ],
  "关键词体检": {
    "缺失关键词": [],
    "已覆盖关键词": []
  },
  "逐句改写": [
    {"原文": "", "改写后": "", "改写理由": ""}
  ],
  "接下来先做这3件事": ["", "", ""]
}`;

// ============ 创建服务 ============
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
        const { resume, industry, position } = JSON.parse(body);

        const completion = await client.chat.completions.create({
          model: 'deepseek-chat',
          response_format: { type: 'json_object' },  // 强制输出 JSON
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `目标行业：${industry}\n目标岗位：${position}\n简历内容：${resume}` }
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
