const api = {
  get: async (path) => {
    const res = await fetch(API_BASE + path);
    return res.json();
  },
  post: async (path, body, token) => {
    const res = await fetch(API_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
      body: JSON.stringify(body)
    });
    return res.json();
  }
};
