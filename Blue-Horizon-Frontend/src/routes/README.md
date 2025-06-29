# Routes Folder

This folder contains the **React Router v6** configuration files.

Typically, you have one main file (e.g., `AppRoutes.jsx`) that defines all the app routes, including:

- **path:** URL paths like `/`, `/about`, `/contact`
- **element:** The React component (usually a page or layout) to render for that path
- **children:** Nested routes if needed

By centralizing routes here, it’s easier to manage navigation and see the app structure in one place.

## Example

```jsx
// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
