# Services Folder

This folder contains **API service files** that handle communication with backend servers.  
You might use libraries like **Axios** or **Redux Toolkit Query (RTK Query)** here.

Each file usually corresponds to one domain or feature, for example:

- `authService.js` — handles authentication requests (login, logout, register)  
- `postService.js` — handles posts-related API calls (fetch posts, create post, delete post)

Organizing API logic this way keeps your code clean and easy to maintain.

## Example

```js
// services/authService.js
import axios from 'axios';

const API_URL = '/api/auth';

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`);
};
