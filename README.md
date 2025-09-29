## 📚 Cheatsheet Manager

The Cheatsheet Manager is a web application designed for easily creating, managing, viewing, and styling technical cheatsheets written in **Markdown**. It allows users to import markdown files, view them with syntax highlighting and mathematical rendering (via KaTeX and Highlight.js), and fully customize the application's theme. All cheatsheets and style configurations are stored locally in the browser's `localStorage`.

| Feature               | Description                                                                      |
| :-------------------- | :------------------------------------------------------------------------------- |
| **View/Edit**         | CRUD operations for cheatsheets stored locally.                                  |
| **Markdown Support**  | Imports and renders markdown content.                                            |
| **Theming**           | Comprehensive style configuration with presets and custom color/layout settings. |
| **Code Highlighting** | Supports syntax highlighting for code blocks using Highlight.js.                 |
| **Math Rendering**    | Renders mathematical expressions using KaTeX.                                    |
| **Export**            | Export cheatsheets back to a markdown file.                                      |

---

### 🌐 Live Demo

Explore the application in action: [https://levkobe.github.io/CheatSheets/index/index.html](https://levkobe.github.io/CheatSheets/index/index.html)

---

### ⚙️ Core Files and Functionality

The application is structured into a main management page, a viewer page, and a style configuration page, all sharing a common style management utility.

#### 1. Style Management (`shared/style-manager.js`)

This file is the single source of truth for the application's visual theme.

- **`StyleManager.defaults`**: Contains all default CSS variables for colors, typography, spacing, and layout (e.g., `primary: "#667eea"`, `fontSizeBase: "16"`).
- **`StyleManager.getStyleConfig()`**: Retrieves the saved style configuration from `localStorage` (key: `"cheatsheet-styles"`) or falls back to defaults.
- **`StyleManager.applyStyles(config)`**: Injects the active style configuration as **CSS Custom Properties** (variables like `--primary-color`, `--font-size-base`) into the `document.documentElement` (the `:root` element), dynamically changing the theme.
- **`StyleManager.generateCssVariables(config)`**: Maps configuration keys to their corresponding CSS variable names, adding the required `px` unit to numerical spacing/size values.

#### 2. Cheatsheet Management (`index/index.html`, `index/index.js`)

This is the home page for managing cheatsheets.

- **`CheatsheetManager` Class**: Handles all CRUD (Create, Read, Update, Delete) operations for cheatsheets.
  - **Data Storage**: Cheatsheets are stored in `localStorage` under the key `"cheatsheets"` as an array of objects.
  - **`import(e)`**: Reads a local Markdown file and populates the modal for initial saving.
  - **`saveSheet()`**: Creates a new cheatsheet or updates an existing one, assigning a unique ID and storing it. Opens the viewer for a newly created sheet.
  - **`render()`**: Displays the list of cheatsheets as clickable cards in a grid, including a snippet of the content and creation/modification dates.
  - **Modal**: Provides a simple text area and title input for editing cheatsheet content.

#### 3. Cheatsheet Viewer (`viewer/viewer.html`, `viewer/viewer.js`)

This page is dedicated to rendering a single cheatsheet's content in the configured style.

- **`CheatsheetViewer` Class**:
  - **`load()`**: Retrieves the cheatsheet ID from the URL query parameters and fetches the content from `localStorage`.
  - **External Libraries**: Integrates **`marked.js`** for comprehensive markdown parsing, **`KaTeX`** for math rendering, and **`Highlight.js`** for code syntax highlighting.
  - **`parseMarkdown(markdown)`**: Splits the full markdown content into sections based on `##` headings, enhancing readability and navigation.
  - **`render()`**: Converts the markdown content to HTML using `marked.parse()`, then initiates `renderMathInElement` (KaTeX) and `highlightElement` (Highlight.js) to process the content.
  - **`export()`**: Allows the user to download the cheatsheet content back as a `.md` file.

#### 4. Style Configuration (`configStyles/configStyles.html`, `configStyles/configStyles.js`)

This interface allows users to modify the application's theme.

- **`StyleConfigurator` Class**:
  - **`presets`**: Defines pre-set configurations (e.g., `dark`, `green`) that users can apply instantly.
  - **Input Setup**: Dynamically links color pickers, text inputs, and range sliders (for sizes/spacing) to the `this.config` object.
  - **`applyPreset(name)`**: Loads a pre-defined style configuration, updates inputs, and saves the new configuration.
  - **`updateInputs()`**: Synchronizes the UI elements (color pickers, range values) with the currently loaded configuration.
  - **`saveConfig()`**: Persists the changes to `localStorage`.
  - **Export/Import**: Allows users to save or load their custom configuration as a JSON file.
