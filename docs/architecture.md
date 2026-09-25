# NexaAffiliates — Architecture

## 1. Architecture Overview

NexaAffiliates follows a lightweight static front-end architecture.

The application separates:

- Page structure
- Styling
- JavaScript behavior
- Demo data
- Documentation

The architecture is designed to be simple, maintainable and compatible with GitHub Pages.

---

## 2. High-Level Structure

```text
User
  │
  ▼
HTML Pages
  │
  ├── CSS
  │
  ├── JavaScript
  │
  └── Demo Data
        │
        ▼
   Browser Interface