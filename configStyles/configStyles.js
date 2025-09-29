class StyleConfigurator {
  constructor() {
    this.defaults = { ...StyleManager.defaults };
    this.presets = {
      default: this.defaults,
      dark: {
        ...this.defaults,
        primary: "#4c63d2",
        secondary: "#5a67d8",
        bg: "#1a202c",
        card: "#2d3748",
        textPrimary: "#f7fafc",
        textSecondary: "#a0aec0",
        textMuted: "#718096",
        textInverse: "#1a202c",
        border: "#4a5568",
        borderLight: "#2d3748",
        defBg: "#2c3359",
        defBorder: "#4c63d2",
        theoremBg: "#4a3030",
        theoremBorder: "#f56565",
        proofBg: "#294235",
        proofBorder: "#68d391",
        codeBg: "#171923",
        shadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
      },
      green: {
        ...this.defaults,
        primary: "#38a169",
        secondary: "#48bb78",
        bg: "#f0fff4",
        card: "#ffffff",
        defBorder: "#38a169",
      },
      orange: {
        ...this.defaults,
        primary: "#ed8936",
        secondary: "#f6ad55",
        bg: "#fffaf0",
        card: "#ffffff",
        defBorder: "#ed8936",
      },
      purple: {
        ...this.defaults,
        primary: "#805ad5",
        secondary: "#9f7aea",
        bg: "#faf5ff",
        card: "#ffffff",
        defBorder: "#805ad5",
      },
    };

    this.config = this.load();
    this.init();
    this.apply();
    this.updateInputs();
  }

  init() {
    const $ = (id) => document.getElementById(id);

    // Main actions
    $("home").onclick = () => (location.href = "../index/index.html");
    $("reset").onclick = () => this.reset();
    $("save").onclick = () => this.saveConfig();
    $("export").onclick = () => this.exportConfig();
    $("import").onclick = () => $("file").click();
    $("file").onchange = (e) => this.importConfig(e);

    // Setup inputs based on config keys
    Object.keys(this.defaults).forEach((key) => {
      const input = $(key);
      if (!input) return;

      if (input.type === "color") {
        // This is a picker, handled by its text input pair
      } else if (input.type === "range") {
        this.setupRangeInput(key);
      } else if (input.type === "text") {
        const picker = $(key + "Picker");
        if (picker) {
          this.setupColorInput(key);
        } else {
          this.setupTextInput(key);
        }
      }
    });

    // Presets
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.onclick = () => this.applyPreset(btn.dataset.preset);
    });
  }

  setupColorInput(key) {
    const picker = document.getElementById(key + "Picker");
    const input = document.getElementById(key);

    picker.oninput = (e) => {
      input.value = e.target.value;
      this.config[key] = e.target.value;
      this.apply();
    };
    input.oninput = (e) => {
      if (this.isValidColor(e.target.value)) {
        picker.value = e.target.value;
        this.config[key] = e.target.value;
        this.apply();
      }
    };
  }

  setupRangeInput(key) {
    const input = document.getElementById(key);
    const valueLabel = document.getElementById(key + "Val");
    input.oninput = (e) => {
      const unit = key.toLowerCase().includes("height") ? "" : "px";
      valueLabel.textContent = e.target.value + unit;
      this.config[key] = e.target.value;
      this.apply();
    };
  }

  setupTextInput(key) {
    const input = document.getElementById(key);
    input.oninput = (e) => {
      this.config[key] = e.target.value;
      this.apply();
    };
  }

  apply() {
    StyleManager.applyStyles(this.config);
  }

  applyPreset(name) {
    if (this.presets[name]) {
      this.config = { ...this.presets[name] };
      this.apply();
      this.updateInputs();
      this.saveConfig();

      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.preset === name);
      });
    }
  }

  updateInputs() {
    Object.entries(this.config).forEach(([key, val]) => {
      const input = document.getElementById(key);
      if (input) {
        input.value = val;
        if (input.type === "range") {
          const valueLabel = document.getElementById(key + "Val");
          if (valueLabel) {
            const unit = key.toLowerCase().includes("height") ? "" : "px";
            valueLabel.textContent = val + unit;
          }
        }
        const picker = document.getElementById(key + "Picker");
        if (picker) picker.value = val;
      }
    });
  }

  reset() {
    this.config = { ...this.defaults };
    this.apply();
    this.updateInputs();
    this.saveConfig();
    this.applyPreset("default");
  }

  saveConfig() {
    localStorage.setItem("cheatsheet-styles", JSON.stringify(this.config));
  }

  load() {
    return StyleManager.getStyleConfig();
  }

  exportConfig() {
    const blob = new Blob([JSON.stringify(this.config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cheatsheet-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importConfig(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        this.config = { ...this.defaults, ...imported };
        this.apply();
        this.updateInputs();
        this.saveConfig();
      } catch {
        alert("Invalid configuration file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return !!s.color;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new StyleConfigurator();
});
