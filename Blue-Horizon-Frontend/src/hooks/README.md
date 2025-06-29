# Hooks Folder

This folder contains **custom reusable React hooks** that encapsulate common logic or behaviors.

Examples include:

- `useAuth()` — handles user authentication state  
- `useDebounce()` — delays a value or function call to avoid excessive updates  
- `useFormValidation()` — manages form input validation logic

Custom hooks help keep components clean and promote code reuse across your app.

## Example

```jsx
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
