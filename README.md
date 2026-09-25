# AI 简历诊断工具

一个支持多行业适配的 AI 简历诊断工具，用户粘贴简历后，可实时获得结构化诊断报告。

## 功能

- 支持多行业岗位（互联网/AI、金融、快消等）
- 五个维度评分：岗位匹配、数据量化、经历表达、关键词覆盖、结构可读
- 防幻觉机制：遇到无基数的百分比数据，强制输出占位符，不编造数据
- 输出结构化诊断报告：致命问题、逐句改写建议、关键词体检

## 技术栈

- Node.js（后端）
- DeepSeek API（AI 诊断）
- 原生 HTML/CSS/JS（前端）

## 怎么用

1. 克隆仓库：git clone https://github.com/ZYB0903/ai-resume-diagnosis.git
2. 安装依赖： npm install
3. **打开 `server.js`，找到 `apiKey` 那一行，把 `'在这里填你的DeepSeekAPIKey'` 替换成你自己的 DeepSeek API Key（`sk-` 开头）。**
4. 启动服务： npm start
5. 浏览器打开 `http://localhost:3000`

## 项目状态

这是一个正在迭代中的个人项目。当前版本跑通了「输入简历 → AI 诊断 → 输出报告」的核心链路。
<img width="1587" height="870" alt="image" src="https://github.com/user-attachments/assets/336d1c2f-df72-4c05-aafc-0bf3b82b53a4" />
<img width="917" height="787" alt="image" src="https://github.com/user-attachments/assets/c34f72dd-293a-48d5-b54d-c8cf298778ab" />
<img width="1055" height="846" alt="image" src="https://github.com/user-attachments/assets/489447a6-9d15-4fba-941b-e6c9788671cc" />
<img width="1046" height="352" alt="image" src="https://github.com/user-attachments/assets/1359c036-dc7a-425e-a28d-6919ce86d14c" />


## 后续计划

- [ ] 支持 PDF / Word 文件上传
- [ ] 增加用户系统，保存诊断历史
- [ ] 界面美化，做成卡片式诊断报告
- [ ] 支持更多行业和岗位
