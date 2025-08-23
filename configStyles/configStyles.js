class StyleConfigurator {
  constructor() {
    this.defaults = {
      primary: "#667eea",
      secondary: "#764ba2",
      bg: "#f8f9fa",
      card: "#ffffff",
      radius: "8",
    };

    this.presets = {
      default: this.defaults,
      dark: {
        primary: "#4c63d2",
        secondary: "#5a67d8",
        bg: "#1a202c",
        card: "#2d3748",
        radius: "8",
      },
      green: {
        primary: "#38a169",
        secondary: "#48bb78",
        bg: "#f0fff4",
        card: "#ffffff",
        radius: "8",
      },
      orange: {
        primary: "#ed8936",
        secondary: "#f6ad55",
        bg: "#fffaf0",
        card: "#ffffff",
        radius: "8",
      },
      purple: {
        primary: "#805ad5",
        secondary: "#9f7aea",
        bg: "#faf5ff",
        card: "#ffffff",
        radius: "8",
      },
    };

    this.config = this.load();
    this.init();
    this.apply();
    this.updateInputs();
  }

  init() {
    const $ = (id) => document.getElementById(id);

    $("home").onclick = () => (location.href = "../index/index.html");
    $("reset").onclick = () => this.reset();
    $("save").onclick = () => this.saveConfig();
    $("export").onclick = () => this.exportConfig();
    $("import").onclick = () => $("file").click();
    $("file").onchange = (e) => this.importConfig(e);

    // Color inputs
    ["primary", "secondary", "bg", "card"].forEach((color) => {
      const picker = $(color + "Picker");
      const input = $(color);

      picker.oninput = (e) => {
        input.value = e.target.value;
        this.config[color] = e.target.value;
        this.apply();
      };

      input.oninput = (e) => {
        if (this.isValidColor(e.target.value)) {
          picker.value = e.target.value;
          this.config[color] = e.target.value;
          this.apply();
        }
      };
    });

    // Range input
    const radius = $("radius");
    const radiusVal = $("radiusVal");
    radius.oninput = (e) => {
      radiusVal.textContent = e.target.value + "px";
      this.config.radius = e.target.value;
      this.apply();
    };

    // Presets
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.onclick = () => this.applyPreset(btn.dataset.preset);
    });
  }

  apply() {
    const vars = {
      "--primary-color": this.config.primary,
      "--secondary-color": this.config.secondary,
      "--background-color": this.config.bg,
      "--card-background": this.config.card,
      "--border-radius": this.config.radius + "px",
      // Fallback CSS vars for compatibility
      "--primary": this.config.primary,
      "--bg": this.config.bg,
      "--card": this.config.card,
      "--radius": this.config.radius + "px",
    };

    Object.entries(vars).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val);
    });
  }

  applyPreset(name) {
    if (this.presets[name]) {
      this.config = { ...this.presets[name] };
      this.apply();
      this.updateInputs();
      this.saveConfig();

      // Update active button
      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.preset === name);
      });
    }
  }

  updateInputs() {
    Object.entries(this.config).forEach(([key, val]) => {
      const input = document.getElementById(key);
      const picker = document.getElementById(key + "Picker");

      if (input) input.value = val;
      if (picker) picker.value = val;
    });

    document.getElementById("radiusVal").textContent =
      this.config.radius + "px";
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
    const saved = localStorage.getItem("cheatsheet-styles");
    return saved
      ? { ...this.defaults, ...JSON.parse(saved) }
      : { ...this.defaults };
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
    s.color = "";
    s.color = color;
    return !!s.color;
  }
}

// Initialize and apply saved styles immediately
document.addEventListener("DOMContentLoaded", () => {
  new StyleConfigurator();
});

// Apply saved styles immediately on page load (before DOMContentLoaded)
(() => {
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
})();
