# ai-resume-diagnosis
AI简历诊断工具，支持多行业适配，基于 DeepSeek API
# AI 简历诊断工具

一个支持多行业适配的 AI 简历诊断工具，用户粘贴简历后，可实时获得结构化诊断报告。

## 功能

- 支持多行业岗位（互联网/AI、金融、快消等）
- 五个维度评分：岗位匹配、数据量化、经历表达、关键词覆盖、结构可读
- 防幻觉机制：遇到无基数的百分比数据，强制输出占位符，不编造数据
- 输出结构化诊断报告：致命问题、逐句改写建议、关键词体检

## 技术栈

- Node.js + Express（后端）
- DeepSeek API（AI 诊断）
- 原生 HTML/CSS/JS（前端）

## 怎么用

1. 克隆仓库：`git clone https://github.com/你的用户名/ai-resume-diagnosis.git`
2. 安装依赖：`npm install`
3. 在 `server.js` 里填入你的 DeepSeek API Key
4. 启动服务：`npm start`
5. 浏览器打开 `http://localhost:3000`

## 项目状态

这是一个正在迭代中的个人项目。当前版本跑通了「输入简历 → AI 诊断 → 输出报告」的核心链路。
