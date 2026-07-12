# Agent Thinking 101 调研说明

这里记录我查过的公开资料，以及它们后来怎样进入课程。它不是完整文献综述，只回答几个和课程设计直接相关的问题：

1. 现在公开 Agent 教程主要在教什么。
2. 这些教程对普通人、青少年、家长和成年人有什么门槛。
3. 本课程为什么要从“Agent 思维”和“真实任务”切入。

## 1. Hugging Face Agents Course

链接：https://huggingface.co/learn/agents-course/unit0/introduction

Hugging Face 的 Agents Course 是一个完整的开发者向课程。它会讲 Agent 的基础概念、工具、行动、观察、框架和最终项目，也会涉及 smolagents、LlamaIndex、LangGraph 等生态。

我从中拿走的东西：

- Agent 教育需要有项目，而不能只讲概念。
- 工具、行动、观察是 Agent 和普通聊天 AI 的关键区别。
- 但如果第一课就从 Python、框架和库开始，普通学习者会被挡在门外。

课里怎么用：

先讲生活和工作场景，再逐步引入工具、上下文、反馈和工作流。让学习者先做出作品，再理解技术名词。

## 2. Anthropic: Building Effective Agents

链接：https://www.anthropic.com/engineering/building-effective-agents

Anthropic 的文章把 agentic systems 分成 workflow 和 agents。workflow 是预先设计好的路径，agent 则由模型根据环境反馈动态决定流程。文章也强调，不要一开始就追求复杂系统，应该从简单、可组合、可检查的模式开始。

我从中拿走的东西：

- 初学者最该学的是可控工作流，而不是幻想“全自动 AI”。
- prompt chaining、routing、parallelization、orchestrator-workers、evaluator-optimizer 都可以翻译成普通人能懂的协作模式。
- 检查和反馈是 Agent 思维的一部分，不是事后补丁。

课里怎么用：

第八章专门讲 Agent 工作流，把它翻译成提示链、路由、并行、指挥者-执行者、评审-优化。讲师手册也把“评审-优化”作为最适合普通人立刻练习的模式。

## 3. OpenAI Agents SDK 与 Tools 文档

链接：

- https://developers.openai.com/api/docs/guides/agents
- https://developers.openai.com/api/docs/guides/tools

OpenAI 的相关文档说明，现代 Agent 不只是模型对话，而是模型、工具、上下文、handoff、trace、文件、代码、搜索、MCP 等能力组成的系统。

我从中拿走的东西：

- Agent 接上工具以后，才能处理文件、代码和网页，而不只是在聊天框里回答。
- tools、skills、MCP、shell、computer use 等概念可以统一解释为“AI 能接触外部世界的方式”。
- 对普通人来说，不必先掌握所有工具，但要理解工具意识。

课里怎么用：

第四章讲工具、上下文、记忆和 skill。Prompt 模板库里也加入了 Codex 改项目、修 bug、处理表格、写 skill 草稿等模板。

## 4. Microsoft AI Agents for Beginners

链接：https://github.com/microsoft/ai-agents-for-beginners

Microsoft 的 AI Agents for Beginners 是一个开发者学习路径，覆盖 Agent 用例、框架、设计模式、工具使用、Agentic RAG、规划、多 Agent、记忆、MCP、生产化等内容。

我从中拿走的东西：

- Agent 开发会反复用到规划、记忆、工具和多 Agent 分工。
- 记忆、多 Agent、MCP 和工具使用会逐渐进入普通开发工作流。
- 系统课需要从基础概念走到项目和工作流。

课里怎么用：

保留“设计模式”的骨架，但弱化工程实现细节。学习者先学会什么时候用提示链、什么时候并行、什么时候需要评审，再考虑是否进入框架和代码。

## 5. UNESCO AI Competency Framework for Students

链接：https://www.unesco.org/en/articles/ai-competency-framework-students

UNESCO 的学生 AI 能力框架强调，AI 教育不只是使用工具，还包括理解 AI、批判判断、负责任使用、人与 AI 的关系和创造性应用。

我从中拿走的东西：

- 青少年 AI 教育不能变成“代写作业教程”。
- 安全、隐私、判断、责任必须进入课程主体。
- AI literacy 应该包含创造作品，而不只是被动使用。

课里怎么用：

第九章专门讲安全、边界和判断。青少年项目要求保留自己的思考过程，最终项目也要求记录“AI 第一版哪里不好”和“我怎么修改”。

## 6. MIT AI Literacy

链接：https://openlearning.mit.edu/news/ai-literacy-explained

MIT Open Learning 把 AI literacy 讲得很宽：除了理解 AI，还要会判断输出、拿它创作，并对使用结果负责。

我从中拿走的东西：

- AI 素养应该服务真实学习、真实工作和真实创造。
- 课程不能只教工具按钮，而要教判断和迁移能力。

课里怎么用：

课程定位从“少儿编程”升级为“Agent 思维 / AI 协作能力”。不同人群可以迁移到不同场景：青少年创造作品，成年人处理工作流，家长老师理解边界，效率工具用户延展到 Codex 和 skill。

## 7. 通义灵码智能体模式

链接：https://help.aliyun.com/zh/lingma/qoder-cn/user-guide/agent

通义灵码的智能体模式说明了国产 AI Coding Agent 也在走类似方向：自主规划、工程检索、文件编辑、终端执行、MCP 工具等。

我从中拿走的东西：

- Agent 思维不绑定某个海外工具。
- 在中文环境里，可以结合通义灵码、豆包、DeepSeek、GLM、Trae、Codex 等不同工具讲。
- 课程应避免把工具本身当壁垒，而要教可迁移的工作方式。

课里怎么用：

主教程里强调“工具会变，能力稳定”。对外传播包也避免把课程包装成某个软件教程。

## 8. 本课程的差异化结论

公开资料大多偏三类：

- 开发者课程：教框架、工具调用、代码实现。
- 工具教程：教某个产品怎么点、怎么配置。
- prompt 教程：教模板和话术。

本课程选择另一条路：

先教普通人如何成为 Agent 的指挥者。

也就是：

- 先讲目标，而不是先讲模型。
- 先讲真实任务，而不是先讲框架。
- 先讲检查和责任，而不是只讲效率。
- 先做作品和工作流，再解释工具名词。

最后确定下来的课程定位是：面向普通人，围绕真实任务练习怎样和 Agent 协作。开发框架会提到，但不会成为入门门槛。
