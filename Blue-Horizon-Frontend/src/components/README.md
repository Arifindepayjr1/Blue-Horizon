# Components Folder

This folder contains **reusable, presentational UI components** such as buttons, cards, navbar, modals, and form elements. These components are focused purely on **how things look** and do **not** handle any business logic, API calls, or complex state management.

Use this folder for UI elements that can be shared across different parts of the application.  
Each component should be kept **clean**, **stateless (if possible)**, and **receive data via props**.

> ⚠️ Avoid placing logic-heavy or feature-specific components here. Those belong in the `features/` or `pages/` folders.
