# List App 📝

A lightweight, vanilla JavaScript todo list application with filtering capabilities and real-time editing features.

## Quick Overview

A simple yet feature-rich todo list app that demonstrates clean JavaScript DOM manipulation without any external dependencies. Perfect for learning or as a starting point for more complex list-based applications.

## ✨ Features

### Core Functionality

- **Add Tasks**: Create new tasks with a simple prompt dialog
- **Edit Tasks**: Click on any task text to edit it inline
- **Toggle Completion**: Check/uncheck tasks to mark them as done or todo
- **Remove Tasks**: Delete tasks you no longer need
- **Multiple Lists**: Support for multiple independent todo lists on the same page

### Smart Filtering

- **All**: View all tasks regardless of status
- **To Do**: Show only incomplete tasks
- **Done**: Display only completed tasks
- **Visual Feedback**: Selected filter highlighted with red border

### Technical Highlights

- **Zero Dependencies**: Pure vanilla JavaScript and HTML
- **MVC Pattern**: Clean separation between data and presentation
- **Real-time Sync**: DOM automatically updates when data changes
- **Bilingual Comments**: Code documented in both English and Italian

## 🚀 Getting Started

1. Open `list-app.html` in any modern web browser
2. Start adding, editing, and managing your tasks!

No build process, no installation, no configuration required.

## 📁 File Structure

```
list-app/
├── list-app.html    # Main HTML file with demo lists
├── list-app.js      # Core JavaScript functionality
└── README.md        # This file
```

## 🔧 How It Works

### Data Structure

Each task is represented as a simple array:

```javascript
["task description", "status"]; // status: "todo" or "done"
```

### Architecture

The app follows a lightweight MVC-like pattern:

- **Model**: JavaScript arrays store task data
- **View**: DOM elements display the current state
- **Controller**: Event handlers manage user interactions

### Key Functions

#### `list_setup(list_content, main_node)`

Initializes a complete todo list with:

- Add button for new tasks
- Filter buttons (All/To Do/Done)
- Renders existing tasks from data

#### `list_item_html(item)`

Generates the HTML structure for each task:

- Checkbox for completion status
- Text input for editing task name
- Remove button for deletion

#### `list_visually_filter(criterion, main_node)`

Handles the filtering logic:

- Shows/hides tasks based on selected filter
- Updates visual feedback for active filter
- Maintains filter state

### Event Handling

- **Checkbox changes**: `list_checkbox_input()` toggles task status
- **Text edits**: `list_text_input()` updates task descriptions
- **Task removal**: `list_item_remove()` deletes tasks from data and DOM

## 🎯 Use Cases

- **Learning Tool**: Great example of vanilla JavaScript DOM manipulation
- **Prototype Base**: Starting point for more complex list applications
- **Simple Task Management**: Lightweight alternative to heavy todo apps
- **Code Reference**: Clean patterns for data-DOM synchronization

## 🛠️ Development Notes

### Browser Support

Works in all modern browsers that support:

- ES6 template literals
- `Array.from()`
- `querySelector/querySelectorAll`

### Code Style

- Extensive bilingual commenting (English/Italian)
- Functional programming approach
- Clear separation of concerns
- Descriptive variable names

### Recommended Extensions

For better development experience:

**VS Code**:

- `es6-string-html` extension for syntax highlighting in template literals

**Sublime Text**:

- ES6 template literals syntax package

## 🔗 Links

- [GitHub Repository](https://github.com/arkenidar/list-app)
- [Live Demo](https://arkenidar.com) (if hosted)

## 📝 Example Usage

```javascript
// Create your own list
var my_tasks = [
  ["Learn JavaScript", "done"],
  ["Build todo app", "done"],
  ["Add more features", "todo"],
];

// Initialize it in a DOM element
list_setup(my_tasks, document.getElementById("my-list"));
```

## 🤝 Contributing

This is a simple educational project, but improvements are welcome! The code is clean and well-commented, making it easy to understand and extend.

---

_Built with ❤️ using vanilla JavaScript_
