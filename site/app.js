const docs = [
  {
    id: "course",
    title: "完整手册",
    kind: "Handbook",
    path: "../docs/agent-thinking-course.md",
  },
  {
    id: "abstract",
    title: "快速摘要",
    kind: "Overview",
    path: "../docs/agent-thinking-abstract.md",
  },
  {
    id: "prompts",
    title: "Prompt / Skill 模板",
    kind: "Templates",
    path: "../docs/agent-thinking-prompt-library.md",
  },
];

const state = {
  activeDoc: docs[0],
  cache: new Map(),
  currentMarkdown: "",
  currentHeadings: [],
};

const els = {
  siteHeader: document.querySelector(".site-header"),
  navToggle: document.querySelector("#navToggle"),
  docList: document.querySelector("#docList"),
  currentKind: document.querySelector("#currentKind"),
  currentTitle: document.querySelector("#currentTitle"),
  docContent: document.querySelector("#docContent"),
  toc: document.querySelector("#toc"),
  searchInput: document.querySelector("#searchInput"),
};

function setNavigationOpen(isOpen) {
  els.siteHeader.classList.toggle("nav-open", isOpen);
  els.navToggle.setAttribute("aria-expanded", String(isOpen));
  els.navToggle.setAttribute("aria-label", isOpen ? "收起文档导航" : "展开文档导航");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(text, index) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return slug || `section-${index}`;
}

function normalizeUrl(url) {
  const embeddedAssets = window.__EMBEDDED_ASSETS__ || {};
  if (embeddedAssets[url]) return embeddedAssets[url];
  if (url.startsWith("assets/") && embeddedAssets[`/docs/${url}`]) return embeddedAssets[`/docs/${url}`];
  if (url.startsWith("/docs/assets/") && embeddedAssets[url]) return embeddedAssets[url];
  if (/^(https?:|mailto:|#|data:)/.test(url)) return url;
  if (url.startsWith("/docs/")) return `..${url}`;
  if (url.startsWith("docs/")) return `../${url}`;
  if (url.startsWith("assets/")) return `../docs/${url}`;
  return url;
}

function inlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
    return `<img src="${normalizeUrl(url)}" alt="${alt}">`;
  });
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    return `<a href="${normalizeUrl(url)}" target="_blank" rel="noreferrer">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

function parseMarkdown(markdown, query = "") {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  const headings = [];
  let inCode = false;
  let codeLines = [];
  let inList = false;
  let inOrderedList = false;
  let paragraph = [];
  let headingIndex = 0;

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeLists() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    if (inOrderedList) {
      html.push("</ol>");
      inOrderedList = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        closeLists();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      closeLists();
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const id = slugify(title, headingIndex++);
      headings.push({ level, title, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(title)}</h${level}>`);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeLists();
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      closeLists();
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }

    const unorderedMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (inOrderedList) {
        html.push("</ol>");
        inOrderedList = false;
      }
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(unorderedMatch[1])}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\s*\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      if (!inOrderedList) {
        html.push("<ol>");
        inOrderedList = true;
      }
      html.push(`<li>${inlineMarkdown(orderedMatch[1])}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeLists();

  let output = html.join("\n");
  if (query.trim()) {
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
  }

  return { html: output, headings };
}

async function getMarkdown(doc) {
  const embeddedDocs = window.__EMBEDDED_DOCS__ || {};
  if (embeddedDocs[doc.id]) {
    return embeddedDocs[doc.id];
  }
  if (state.cache.has(doc.id)) return state.cache.get(doc.id);
  if (window.location.protocol === "file:") {
    throw new Error(
      "浏览器不允许 file:// 页面读取 docs/*.md。请打开 site/standalone.html，或在项目根目录运行 bash site/start.sh 后访问 http://127.0.0.1:4173/site/。",
    );
  }
  const response = await fetch(doc.path);
  if (!response.ok) {
    throw new Error(`无法读取 ${doc.path}`);
  }
  const markdown = await response.text();
  state.cache.set(doc.id, markdown);
  return markdown;
}

function renderDocList() {
  els.docList.innerHTML = docs
    .map(
      (doc) => `
        <button class="doc-button ${doc.id === state.activeDoc.id ? "active" : ""}" data-doc="${doc.id}">
          <strong>${doc.title}</strong>
        </button>
      `,
    )
    .join("");

  els.docList.querySelectorAll(".doc-button").forEach((button) => {
    button.addEventListener("click", () => {
      const doc = docs.find((item) => item.id === button.dataset.doc);
      setNavigationOpen(false);
      setActiveDoc(doc);
    });
  });
}

function renderToc(headings) {
  const visible = headings.filter((heading) => heading.level >= 1 && heading.level <= 3);
  els.toc.innerHTML = visible.length
    ? visible
        .map(
          (heading) =>
            `<a class="toc-link level-${heading.level}" href="#${heading.id}">${escapeHtml(heading.title)}</a>`,
        )
        .join("")
    : "<p>当前文档没有可提取的章节。</p>";
}

async function setActiveDoc(doc) {
  state.activeDoc = doc;
  els.searchInput.value = "";
  renderDocList();
  els.currentKind.textContent = doc.kind;
  els.currentTitle.textContent = doc.title;
  els.docContent.innerHTML = "<p>正在读取文档...</p>";

  try {
    state.currentMarkdown = await getMarkdown(doc);
    const parsed = parseMarkdown(state.currentMarkdown);
    state.currentHeadings = parsed.headings;
    els.docContent.innerHTML = parsed.html;
    renderToc(parsed.headings);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    els.docContent.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
    els.toc.innerHTML = "";
  }
}

function setupSearch() {
  els.searchInput.addEventListener("input", () => {
    const parsed = parseMarkdown(state.currentMarkdown, els.searchInput.value);
    els.docContent.innerHTML = parsed.html;
    renderToc(parsed.headings);
  });
}

function setupNavigation() {
  els.navToggle.addEventListener("click", () => {
    setNavigationOpen(!els.siteHeader.classList.contains("nav-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavigationOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setNavigationOpen(false);
  });
}

renderDocList();
setupSearch();
setupNavigation();
setActiveDoc(state.activeDoc);
