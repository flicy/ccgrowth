# CCGrowth · Chris Cui

个人网站与产品作品集。源码、测试、发布流程和线上产物在同一个仓库维护。
Personal website and product portfolio. Source, tests, release workflow and published output live in this repository.

[个人网站 / Website](https://flicy.github.io/ccgrowth/) · [作品集 / Portfolio](https://flicy.github.io/ccgrowth/projects/)

## 维护入口 / Maintenance

`site/` 是当前源码入口。根目录的 `index.html`、`assets/` 和 `projects/` 保留迁移时的发布快照；线上版本由 Actions 构建 `site/dist` 后发布。请编辑 `site/`，不要直接改构建后的 JavaScript。
`site/` is the maintained source. Root-level `index.html`, `assets/` and `projects/` retain the migration release snapshot; Actions builds and deploys `site/dist`. Edit `site/`, rather than compiled JavaScript.

```sh
cd site
npm ci
npm test
npm run build:github
```

推送 `site/` 的改动到 `main` 后，工作流验证并向 Pages 发布构建产物。产品资料集中在 `site/src/content.js`，截图在 `site/public/assets/portfolio/`。每项产品拥有独立地址与中英介绍。旧版构建产物仍可通过 Git 历史回退。
Changes to `site/` on `main` run tests and deploy the resulting Pages artifact. Product records are in `site/src/content.js`; captures are in `site/public/assets/portfolio/`. Every work has its own address and bilingual description. Previous releases remain recoverable through Git history.

## 分类作品 / Work by category

### 独立产品 / Products

| 产品 / Work | 用途 / Purpose | 代码 / Code |
|---|---|---|
| [FitCrew · BodyOS 私人生活方式教练 / FitCrew · BodyOS Lifestyle Coach](https://flicy.github.io/ccgrowth/projects/fitcrew/) | 在飞书里持续记录与讨论饮食、训练和身体感受，把健康目标拆成今天的小行动。<br>A Feishu lifestyle coach that turns food, training and body observations into small daily actions. | [GitHub](https://github.com/flicy/fitcrew-agent) |
| [遇己 Yujee · AI 照片书 / Yujee · AI Photo Books](https://flicy.github.io/ccgrowth/projects/yujee/) | 把一组照片整理成有分组、有文字、可以翻阅和导出的照片书。<br>Turn a collection of photos into an editable book with grouping, captions and page layouts. | 未公开 / Not public |
| [城市唱片 · 把生活片段写成歌 / City Vinyl · Everyday Moments into Music](https://flicy.github.io/ccgrowth/projects/city-vinyl/) | 从三段生活片段出发，做一张可以分享的城市唱片。<br>Start with three everyday moments and create a shareable city record. | 未公开 / Not public |
| [播客开播助手 / Launch a Podcast](https://flicy.github.io/ccgrowth/projects/launch-loop/) | 把起名、Logo 调研、平台资料和首期发布准备收进一个可保存的工作台。<br>A saved workspace for podcast naming, logo feedback, platform materials and first-episode preparation. | 未公开 / Not public |
| [IELTS 7 · 雅思学习工作台 / IELTS 7 · Study Workspace](https://flicy.github.io/ccgrowth/projects/ielts-helper/) | 把每日学习任务、12 周计划、复盘和打卡放在同一个地方。<br>Keep daily tasks, a 12-week plan, reflection and check-ins in one place. | [GitHub](https://github.com/flicy/ielts-helper) |
| [同传对比英语训练器 / Shadow Interpret](https://flicy.github.io/ccgrowth/projects/shadow-interpret/) | 围绕同传与对比练习组织英语训练。<br>An English practice experiment built around interpreting and comparison. | [GitHub](https://github.com/flicy/shadow-interpret) |
| [新西兰旅行打包清单 / New Zealand Packing List](https://flicy.github.io/ccgrowth/projects/nz-packing/) | 把一趟旅行要带的东西变成可勾选的打包清单。<br>A checkable packing list for a New Zealand trip. | [GitHub](https://github.com/flicy/nz-packing) |
| [烧鹅腿鉴定局 / Roast Goose Leg Duel](https://flicy.github.io/ccgrowth/projects/ham-king-battle/) | 25 秒，从 12 张图片里找出真正的烧鹅腿，和朋友来一场鉴腿对决。<br>Find real roast-goose legs among 12 images in 25 seconds and challenge a friend. | [GitHub](https://github.com/flicy/ham-king-battle) |

### 工具与 Skill / Tools & Skills

| 产品 / Work | 用途 / Purpose | 代码 / Code |
|---|---|---|
| [GrowthOS · 增长工作台 / GrowthOS · Growth Workbench](https://flicy.github.io/ccgrowth/projects/growth-workbench/) | 把学习路径、模型工具、Skills 和增长内容集中成一个可浏览的入口。<br>A shared entry point for learning paths, model tools, Skills and growth content. | [GitHub](https://github.com/flicy/growthos-workbench) |
| [企业调研 Agent / Company Research Agent](https://flicy.github.io/ccgrowth/projects/research-agent/) | 把公司与产品的公开资料整理成可复核的证据和决策建议。<br>Turn public company and product information into reviewable evidence and decision support. | [GitHub](https://github.com/flicy/enterprise-company-research-agent) |
| [从逐字稿到内容发布 / Transcript to Content](https://flicy.github.io/ccgrowth/projects/content-workflow/) | 把一份访谈或直播逐字稿，整理成文章、配图方案和多平台内容包。<br>Turn an interview or livestream transcript into an article, visual plan and cross-platform content pack. | [GitHub](https://github.com/flicy/wechat-publish-from-transcript) |
| [直播活动筹备助手 / Livestream Launch Kit](https://flicy.github.io/ccgrowth/projects/livestream-kit/) | 从一份活动简报，准备活动页、海报方向和分渠道预热文案。<br>Turn an event brief into a page, poster directions and channel-specific launch copy. | [GitHub](https://github.com/flicy/prepare-livestream-event) |
| [Skill 发布助手 / Publish Skill to GitHub](https://flicy.github.io/ccgrowth/projects/publish-skill/) | 把本地可用的 Skill 整理成别人能安装、能验证的 GitHub 仓库。<br>Package a local Skill as an installable and verifiable GitHub repository. | [GitHub](https://github.com/flicy/publish-skill-to-github) |
| [macOS 磁盘盘点与清理 / macOS Disk Scan & Cleanup](https://flicy.github.io/ccgrowth/projects/disk-cleanup/) | 先看空间被谁占用，再按明确范围处理可再生成的缓存与过程产物。<br>Understand disk usage, then handle regenerable caches and artifacts within an explicit scope. | [GitHub](https://github.com/flicy/disk-scan-cleanup) |
| [CrossPost · 多平台内容工作流 / CrossPost · Cross-platform Content](https://flicy.github.io/ccgrowth/projects/crosspost/) | 将一次内容创作接到多个平台的适配与发布流程。<br>Connect one piece of content with adaptation and publishing across platforms. | [GitHub](https://github.com/flicy/crosspost) |
| [DSH Model Atlas · 模型工具手册 / DSH Model Atlas](https://flicy.github.io/ccgrowth/projects/model-atlas/) | 用可浏览的手册整理模型、Provider 接入与使用场景。<br>A browsable handbook for models, providers and usage scenarios. | [GitHub](https://github.com/flicy/dsh-model-atlas) |
| [用 Cola 做产品 · 实践教程 / Building with Cola · Practical Tutorial](https://flicy.github.io/ccgrowth/projects/cola-tutorial/) | 把自己的搭建经历整理成可以按步骤浏览的教程。<br>A step-by-step tutorial drawn from personal product-building experience. | [GitHub](https://github.com/flicy/cola-tutorial) |

### 原型与实验 / Prototypes & Experiments

| 产品 / Work | 用途 / Purpose | 代码 / Code |
|---|---|---|
| [第二现场 · AI 观赛搭子 / Second Court · AI Match Companion](https://flicy.github.io/ccgrowth/projects/second-court/) | 用三种搭子人格陪你看一场篮球比赛，理解回合、提问和参与预测。<br>Follow a basketball game with three companion personas, explanations, questions and predictions. | [GitHub](https://github.com/flicy/second-court) |
| [Poco · 桌面陪伴宠物 / Poco · Desktop Companion](https://flicy.github.io/ccgrowth/projects/poco/) | 让一个数字宠物陪你出现在工作桌面上。<br>A digital pet that lives alongside your desktop work. | 未公开 / Not public |
| [灵偶 Ling · 儿童陪伴玩偶 / Ling · Child Companion Toy](https://flicy.github.io/ccgrowth/projects/ling/) | 一只羊毛毡猫头鹰，探索能记住孩子故事的语音陪伴。<br>A wool-felt owl exploring voice companionship that remembers a child’s stories. | 未公开 / Not public |

### 社区与内容 / Community & Content

| 产品 / Work | 用途 / Purpose | 代码 / Code |
|---|---|---|
| [GrowthCore · AI 实践者社群 / GrowthCore · AI Practitioner Community](https://flicy.github.io/ccgrowth/projects/growthcore/) | 让构建者、策略者和创作者找到彼此，用真实项目建立协作关系。<br>Connect builders, strategists and creators through real projects and collaboration. | [GitHub](https://github.com/flicy/growthcore-start) |
| [好奇回路 INLOOP / INLOOP](https://flicy.github.io/ccgrowth/projects/inloop/) | 和创业者、产品人聊 AI 产品、出海增长与具体选择。<br>Conversations with founders and product people about AI products, global growth and real decisions. | 未公开 / Not public |
| [Growthify / Growthify](https://flicy.github.io/ccgrowth/projects/growthify/) | 围绕 AI、Global SaaS 与海外增长，连接一线实践者。<br>Connect practitioners working on AI, global SaaS and international growth. | 未公开 / Not public |

## 版本 / Version

| 版本 / Version | 日期 / Date | 变更 / Changes |
|---|---|---|
| 0.2.0 | 2026-10-15 | 源码入仓；独立产品介绍、分类搜索、界面图和中英内容。 Source recovery, individual product pages, categorized search, captures and bilingual copy. |

公开资料只包含产品功能与可公开界面。凭证、客户材料、私人健康数据与内部来源不进入本站源码。
Public material contains product capabilities and public interfaces. Credentials, customer records, private health data and internal evidence are excluded from this website source.
