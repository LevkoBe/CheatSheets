// shared/style-manager.js
const StyleManager = {
  defaults: {
    // Primary Colors
    primary: "#667eea",
    secondary: "#764ba2",
    bg: "#f8f9fa",
    card: "#ffffff",

    // Text Colors
    textPrimary: "#1a202c",
    textSecondary: "#4a5568",
    textMuted: "#718096",
    textInverse: "#ffffff",

    // Border Colors
    border: "#e2e8f0",
    borderLight: "#edf2f7",

    // Special Block Colors
    defBg: "#f8f9ff",
    defBorder: "#667eea",
    theoremBg: "#fff5f5",
    theoremBorder: "#feb2b2",
    proofBg: "#f0fff4",
    proofBorder: "#9ae6b4",
    highlightBg: "#fffbeb",
    highlightBorder: "#f6e05e",
    codeBg: "#f6f8fa",

    // Typography
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontMono: 'Monaco, Consolas, "Courier New", monospace',
    fontSizeBase: "16",
    fontSizeSmall: "14",
    fontSizeH1: "24",
    fontSizeH2: "18",
    fontSizeH3: "16",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightBold: "600",
    lineHeight: "1.6",

    // Spacing
    spaceXs: "4",
    spaceSm: "8",
    spaceMd: "12",
    spaceLg: "16",
    spaceXl: "20",
    space2xl: "24",
    space3xl: "32",

    // Layout
    radius: "8",
    shadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    gap: "20",
    contentMaxWidth: "1200",
    sectionMinWidth: "350",
    borderWidth: "1",
    defBorderWidth: "4",
  },

  getStyleConfig: function () {
    const saved = localStorage.getItem("cheatsheet-styles");
    try {
      return saved
        ? { ...this.defaults, ...JSON.parse(saved) }
        : { ...this.defaults };
    } catch {
      return { ...this.defaults };
    }
  },

  applyStyles: function (config) {
    const root = document.documentElement.style;
    const vars = this.generateCssVariables(config);
    Object.entries(vars).forEach(([prop, val]) => {
      root.setProperty(prop, val);
    });
  },

  generateCssVariables: function (config) {
    const c = { ...this.defaults, ...config };
    const px = (key) => (c[key] || "0") + "px";

    return {
      "--primary-color": c.primary,
      "--secondary-color": c.secondary,
      "--background-color": c.bg,
      "--card-background": c.card,
      "--text-primary": c.textPrimary,
      "--text-secondary": c.textSecondary,
      "--text-muted": c.textMuted,
      "--text-inverse": c.textInverse,
      "--border": c.border,
      "--border-light": c.borderLight,
      "--def-bg": c.defBg,
      "--def-border": c.defBorder,
      "--theorem-bg": c.theoremBg,
      "--theorem-border": c.theoremBorder,
      "--proof-bg": c.proofBg,
      "--proof-border": c.proofBorder,
      "--highlight-bg": c.highlightBg,
      "--highlight-border": c.highlightBorder,
      "--code-bg": c.codeBg,
      "--font-family": c.fontFamily,
      "--font-mono": c.fontMono,
      "--font-size-base": px("fontSizeBase"),
      "--font-size-small": px("fontSizeSmall"),
      "--font-size-h1": px("fontSizeH1"),
      "--font-size-h2": px("fontSizeH2"),
      "--font-size-h3": px("fontSizeH3"),
      "--font-weight-normal": c.fontWeightNormal,
      "--font-weight-medium": c.fontWeightMedium,
      "--font-weight-bold": c.fontWeightBold,
      "--line-height": c.lineHeight,
      "--space-xs": px("spaceXs"),
      "--space-sm": px("spaceSm"),
      "--space-md": px("spaceMd"),
      "--space-lg": px("spaceLg"),
      "--space-xl": px("spaceXl"),
      "--space-2xl": px("space2xl"),
      "--space-3xl": px("space3xl"),
      "--radius": px("radius"),
      "--shadow": c.shadow,
      "--gap": px("gap"),
      "--content-max-width": px("contentMaxWidth"),
      "--section-min-width": px("sectionMinWidth"),
      "--border-width": px("borderWidth"),
      "--def-border-width": px("defBorderWidth"),
      // Fallbacks for compatibility
      "--primary": c.primary,
      "--bg": c.bg,
      "--card": c.card,
    };
  },
};

// Immediately-invoked function to apply styles on page load
(() => {
  const config = StyleManager.getStyleConfig();
  StyleManager.applyStyles(config);
})();
