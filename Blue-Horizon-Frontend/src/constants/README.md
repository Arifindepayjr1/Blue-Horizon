# Constants Folder

This folder contains **static configuration values** used throughout the app.  
These values don’t change during runtime and help avoid magic strings or numbers in your code.

Examples include:

- `routes.js` — app route paths  
- `categories.js` — list of categories used in the app  
- `userRoles.js` — definitions of user roles and permissions  

Using constants improves code readability and makes updates easier.

## Example

```js
// constants/routes.js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};
