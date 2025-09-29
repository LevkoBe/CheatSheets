class CheatsheetManager {
  constructor() {
    this.sheets = this.load();
    this.editing = null;
    this.init();
    this.render();
  }

  init() {
    const $ = (id) => document.getElementById(id);

    $("import").onclick = () => $("file").click();
    $("file").onchange = (e) => this.import(e);
    $("config").onclick = () =>
      (location.href = "../configStyles/configStyles.html");
    $("close").onclick = $("cancel").onclick = () => this.hideModal();
    $("save").onclick = () => this.saveSheet();
    $("modal").onclick = (e) => e.target.id === "modal" && this.hideModal();
  }

  load() {
    return JSON.parse(localStorage.getItem("cheatsheets") || "[]");
  }

  save() {
    localStorage.setItem("cheatsheets", JSON.stringify(this.sheets));
  }

  import(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const title = file.name.replace(/\.(md|txt)$/, "");
      this.showModal(title, e.target.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  showModal(title = "", content = "") {
    document.getElementById("title").value = title;
    document.getElementById("content").value = content;
    document.getElementById("modal").style.display = "block";
  }

  hideModal() {
    document.getElementById("modal").style.display = "none";
    this.editing = null;
  }

  saveSheet() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content)
      return alert("Please provide both title and content");

    if (this.editing) {
      const sheet = this.sheets.find((s) => s.id === this.editing);
      sheet.title = title;
      sheet.content = content;
      sheet.modified = new Date().toISOString();
    } else {
      const sheet = {
        id: "cs_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
        title,
        content,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      };
      this.sheets.push(sheet);
      setTimeout(
        () => window.open(`../viewer/viewer.html?id=${sheet.id}`, "_blank"),
        100
      );
    }

    this.save();
    this.render();
    this.hideModal();
  }

  delete(id) {
    if (!confirm("Delete this cheatsheet?")) return;
    this.sheets = this.sheets.filter((s) => s.id !== id);
    this.save();
    this.render();
  }

  edit(id) {
    this.editing = id;
    const sheet = this.sheets.find((s) => s.id === id);
    this.showModal(sheet.title, sheet.content);
  }

  view(id) {
    window.open(`../viewer/viewer.html?id=${id}`, "_blank");
  }

  render() {
    const grid = document.getElementById("grid");
    const empty = document.getElementById("empty");

    if (!this.sheets.length) {
      grid.style.display = "none";
      empty.style.display = "block";
      return;
    }

    grid.style.display = "grid";
    empty.style.display = "none";

    grid.innerHTML = this.sheets
      .map(
        (s) => `
      <div class="card">
        <h3>${this.esc(s.title)}</h3>
        <div style="font-size: 0.9rem; color: var(--text-secondary);">
          Created: ${new Date(s.created).toLocaleDateString()}
        </div>
        ${
          s.modified !== s.created
            ? `<div style="font-size: 0.9rem; color: var(--text-secondary);">
                Modified: ${new Date(s.modified).toLocaleDateString()}
               </div>`
            : ""
        }
        <p style="color: var(--text-muted); margin-top: 10px; font-size: 0.9rem;">
          ${this.esc(s.content.split("\n")[0].substring(0, 100) + "...")}
        </p>
        <div class="actions">
          <button class="btn btn-primary" onclick="manager.view('${
            s.id
          }')">👁️ View</button>
          <button class="btn btn-secondary" onclick="manager.edit('${
            s.id
          }')">✏️ Edit</button>
          <button class="btn btn-danger" onclick="manager.delete('${
            s.id
          }')">🗑️ Delete</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  esc(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

const manager = new CheatsheetManager();
