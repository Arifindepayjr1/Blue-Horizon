# Layouts Folder

This folder contains page layout components that define the overall structure of pages.  
Examples include headers, footers, navigation bars, and sidebars.

Layouts are used to **wrap pages** so they share a consistent look and feel across the app.  
Instead of repeating these elements in every page, layouts help keep the design uniform and clean.

## Example

```jsx
// Layouts/MainLayout.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
