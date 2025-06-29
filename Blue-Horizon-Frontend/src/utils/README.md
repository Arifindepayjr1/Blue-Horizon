# Utils Folder

This folder contains **utility and helper functions** that are used across the app.  
These functions perform common tasks like formatting dates or generating slugs.

Examples include:

- `formatDate.js` — formats dates into readable strings  
- `truncateText.js` — shortens long text with ellipsis  

Organizing helpers here keeps your code DRY (Don’t Repeat Yourself) and easy to maintain.

## Example

```js
// utils/formatDate.js
export function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}
