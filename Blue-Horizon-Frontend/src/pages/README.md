# Pages Folder

This folder contains the **top-level pages** of the application.  
Each page corresponds to a route (URL) in your app, such as:

- Home page  
- Contact page  
- 404 (Not Found) page  

Pages are responsible for assembling the UI by **importing components and layouts**.  
They should **not** contain complex logic or data fetching directly — that belongs in features or API logic.

## Example

```jsx
// pages/Home.jsx
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import FeaturesList from '../components/FeaturesList';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesList />
    </MainLayout>
  );
}
