class CheatsheetViewer {
  constructor() {
    this.id = new URLSearchParams(location.search).get("id");
    this.sheet = null;
    this.loadStyles();
    this.init();
  }

  loadStyles() {
    const saved = localStorage.getItem("cheatsheet-styles");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        const vars = {
          "--primary-color": config.primary || "#667eea",
          "--secondary-color": config.secondary || "#764ba2",
          "--background-color": config.bg || "#f8f9fa",
          "--card-background": config.card || "#ffffff",
          "--border-radius": (config.radius || "8") + "px",
          // Fallback CSS vars
          "--primary": config.primary || "#667eea",
          "--bg": config.bg || "#f8f9fa",
          "--card": config.card || "#ffffff",
          "--radius": (config.radius || "8") + "px",
        };

        Object.entries(vars).forEach(([prop, val]) => {
          document.documentElement.style.setProperty(prop, val);
        });
      } catch {}
    }
  }

  init() {
    const $ = (id) => document.getElementById(id);

    $("home").onclick = () => (location.href = "../index/index.html");
    $("export").onclick = () => this.export();
    $("config").onclick = () =>
      (location.href = "../configStyles/configStyles.html");

    // Configure marked
    if (typeof marked !== "undefined") {
      marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: (code, lang) => {
          if (typeof hljs === "undefined") return code;
          try {
            return lang && hljs.getLanguage(lang)
              ? hljs.highlight(code, { language: lang }).value
              : hljs.highlightAuto(code).value;
          } catch {
            return code;
          }
        },
      });
    }

    this.load();
  }

  load() {
    const sheets = JSON.parse(localStorage.getItem("cheatsheets") || "[]");
    this.sheet = sheets.find((s) => s.id === this.id);

    if (!this.sheet) {
      document.getElementById("content").innerHTML = `
        <div class="error-state">
          <div>❌</div>
          <h3>Cheatsheet not found</h3>
          <button class="btn btn-primary" onclick="location.href='../index/index.html'">Go Home</button>
        </div>`;
      return;
    }

    document.getElementById("title").textContent = this.sheet.title;
    document.title = `${this.sheet.title} - Cheatsheet Viewer`;
    this.render();
  }

  render() {
    const content = this.parseMarkdown(this.sheet.content);
    document.getElementById("content").innerHTML = content;

    // Render math
    if (typeof renderMathInElement !== "undefined") {
      renderMathInElement(document.getElementById("content"), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }

    // Highlight code
    if (typeof hljs !== "undefined") {
      document
        .querySelectorAll("#content pre code")
        .forEach(hljs.highlightElement);
    }
  }

  parseMarkdown(markdown) {
    const sections = [];
    const lines = markdown.split("\n");
    let current = null;

    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        if (current) sections.push(current);
        current = { title: line.substring(3).trim(), content: [] };
      } else if (current) {
        current.content.push(line);
      } else {
        if (!sections[0] || sections[0].title !== "Introduction") {
          sections.unshift({ title: "Introduction", content: [] });
        }
        sections[0].content.push(line);
      }
    });

    if (current) sections.push(current);

    return sections
      .map(
        (section) => `
      <div class="section">
        <h2>${this.esc(section.title)}</h2>
        <div class="section-content">${this.parseContent(
          section.content.join("\n")
        )}</div>
      </div>
    `
      )
      .join("");
  }

  parseContent(content) {
    if (typeof marked !== "undefined") {
      return marked.parse(content);
    }

    // Basic markdown parsing
    return content
      .replace(
        /^\*\*([^:]+):\*\* (.+)$/gm,
        '<div class="def"><strong>$1:</strong> $2</div>'
      )
      .replace(
        /^\*\*([^*]*Theorem[^*]*):\*\* (.+)$/gm,
        '<div class="theorem">$2</div>'
      )
      .replace(
        /^\*\*([^*]*Proof[^*]*):\*\* (.+)$/gm,
        '<div class="proof">$2</div>'
      )
      .replace(
        /^#{3,5} (.+)$/gm,
        (m, text) =>
          `<h${m.match(/^#+/)[0].length}>${text}</h${m.match(/^#+/)[0].length}>`
      )
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (m, lang, code) =>
          `<pre><code${lang ? ` class="language-${lang}"` : ""}>${this.esc(
            code.trim()
          )}</code></pre>`
      )
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(
        /^(\s*[-*+]\s+.+(?:\n\s*[-*+]\s+.+)*)/gm,
        (m) =>
          `<ul>${m
            .split("\n")
            .map((line) => {
              const match = line.match(/^\s*[-*+]\s+(.+)$/);
              return match ? `<li>${match[1]}</li>` : "";
            })
            .filter(Boolean)
            .join("")}</ul>`
      )
      .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(/\n\s*\n/g, "</p><p>")
      .replace(/^(?!<[^>]+>)(.+)/gm, (m) => (m.trim() ? `<p>${m}</p>` : ""))
      .replace(/<p><\/p>/g, "");
  }

  export() {
    if (!this.sheet) return;
    const blob = new Blob([this.sheet.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.sheet.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  esc(text) {
    return document
      .createElement("div")
      .appendChild(document.createTextNode(text)).parentNode.innerHTML;
  }
}

new CheatsheetViewer();
