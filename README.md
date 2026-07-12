# Agent Thinking 101

这是一套仍在继续修改的课程：**和 AI Agent 一起做事**。

我一开始想做少儿编程，后来发现成年人也有同样的问题：会聊天，却不知道怎样把一件完整的事情交给 AI。于是内容慢慢扩到了学习、工作、小工具和日常生活。

## 文档结构

- [详细教程正文](docs/agent-thinking-course.md)：课程的完整文字版本，适合继续打磨成电子书、长文或课程讲义。
- [课程大纲](docs/agent-thinking-course-outline.md)：课程定位、章节结构、调研摘要和试讲课设计。
- [讲师手册](docs/agent-thinking-instructor-guide.md)：10 节课怎么讲、怎么演示、怎么布置练习、怎么验收。
- [学习者练习册](docs/agent-thinking-workbook.md)：每节课的作业单、填写模板和最终项目提交表。
- [Prompt 与 Skill 模板库](docs/agent-thinking-prompt-library.md)：学习者可以直接复制和改写的 prompt / skill 模板。
- [对外摘要版](docs/agent-thinking-abstract.md)：适合发给朋友、内测学员或作为课程介绍。
- [对外传播包](docs/agent-thinking-marketing-pack.md)：小红书标题、朋友圈文案、招募文案、海报文案和课程页结构。
- [视觉资产说明](docs/agent-thinking-visual-assets.md)：本地 SVG 图和后续 Packy 图片生成提示词。
- [调研说明](docs/agent-thinking-research-notes.md)：公开 Agent 教程、AI literacy 框架和课程设计参考。

## 视觉资产

- [课程主视觉](docs/assets/agent-thinking-hero.svg)
- [Agent 协作循环](docs/assets/agent-loop.svg)
- [适合人群地图](docs/assets/audience-map.svg)

## 网页原型

推荐方式：

```bash
bash site/start.sh
```

然后打开：http://127.0.0.1:4173/site/

macOS 也可以双击 [site/open.command](site/open.command)，它会自动启动本地服务并打开网页。

如果你直接双击 `site/index.html`，浏览器会因为安全限制拦截 `fetch` 读取 Markdown，可能出现 `Failed to fetch`。不想启动服务时，可以直接打开 [site/standalone.html](site/standalone.html)，这是已嵌入全部文档的单文件版本。

## GitHub Pages

仓库已包含 `.github/workflows/pages.yml`。推送到 GitHub 后，在仓库的 `Settings > Pages` 中把 Source 设为 `GitHub Actions`。以后每次推送到 `main`，网页都会重新部署。

建议仓库名：`agent-thinking-101`。

## 推荐下一步

1. 先读 [对外摘要版](docs/agent-thinking-abstract.md)，确认整体定位是否打动人。
2. 再读 [详细教程正文](docs/agent-thinking-course.md) 的前两章，打磨成可发布文章。
3. 用 [讲师手册](docs/agent-thinking-instructor-guide.md) 做一次 4 节体验课试讲。
4. 从 [Prompt 与 Skill 模板库](docs/agent-thinking-prompt-library.md) 里挑 5 个模板，做成课堂练习卡。
5. 用 [学习者练习册](docs/agent-thinking-workbook.md) 收集第一批内测反馈。
