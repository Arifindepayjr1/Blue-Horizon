# Developer Guide

## Folder Purpose

- `components/`  
  Contains reusable, presentational UI components like buttons, cards, navbars, and modals.  
  These focus on **how things look** and avoid complex logic or data fetching.

- `features/`  
  Organizes the app by features or functional areas (like auth, blog, profile).  
  Each folder includes pages, API logic, and state management related to that feature.

- `services/`  
  Holds API service files that manage communication with the backend, typically using Axios or RTK Query.  
  One file per domain, e.g., `authService.js`, `postService.js`.

- `routes/`  
  Contains React Router v6 configuration files.  
  Usually one main file (e.g., `AppRoutes.jsx`) exports all route definitions with paths, elements, and nested routes.

- `layouts/`  
  Includes page layout components that wrap pages to provide consistent headers, footers, and navigation.

- `pages/`  
  Contains top-level page components mapped to routes (e.g., Home, Contact, 404).  
  Pages assemble components and layouts to build each screen.

- `hooks/`  
  Custom reusable React hooks that encapsulate common logic or behavior (e.g., `useAuth()`, `useDebounce()`).

- `utils/`  
  Utility and helper functions for common tasks like formatting dates or truncating text.

- `constants/`  
  Static configuration values used throughout the app, such as route paths or user roles.

- `assets/`  
  Static files like images, logos, and icons.

- `styles/`  
  Global CSS, Tailwind config, or other styling files for consistent app appearance.

---

## Naming Conventions

- **Component files:** Use PascalCase, e.g., `CreatePost.jsx`  
- **Hooks:** Start with `use` prefix, e.g., `useFetch.js`  
- **Services:** Use camelCase with `Service` suffix, e.g., `authService.js`  
- **Constants:** Use uppercase with underscores or camelCase (choose one consistently), e.g., `ROUTES.js` or `routes.js`  
- **Utils:** Use camelCase, e.g., `formatDate.js`  
- **Layouts:** Use PascalCase, e.g., `MainLayout.jsx`  
- **Pages:** Use PascalCase, e.g., `Home.jsx`  
- **Assets:** Use lowercase and kebab-case, e.g., `default-avatar.png`  
- **Styles:** Use lowercase with hyphens or camelCase, e.g., `index.css`, `tailwind.config.js`

---
