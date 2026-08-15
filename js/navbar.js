async function renderNavbar(){
  const placeholder = document.getElementById('navLinksPlaceholder');
  const cartCountEl = document.getElementById('cartCount');
  const wishCountEl = document.getElementById('wishCount');
  const token = localStorage.getItem('token');
  placeholder.innerHTML = '';
  if (token){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    placeholder.innerHTML = `
      <a href="profile.html">${user.name || 'Profile'}</a>
      <a href="orders.html">Orders</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;
    document.getElementById('logoutBtn').addEventListener('click', (e)=>{ e.preventDefault(); localStorage.removeItem('token'); localStorage.removeItem('user'); renderNavbar(); });

    // fetch cart and wishlist counts
    try {
      const cartRes = await fetch(API_BASE + '/cart', { headers: { Authorization: 'Bearer ' + token } });
      const cartJson = await cartRes.json();
      if (cartJson.success && cartJson.data && cartJson.data.items) cartCountEl.textContent = cartJson.data.items.length;
    } catch(e){ console.warn('Cart fetch failed', e); }

    try {
      const wishRes = await fetch(API_BASE + '/wishlist', { headers: { Authorization: 'Bearer ' + token } });
      const wishJson = await wishRes.json();
      if (wishJson.success && wishJson.data && wishJson.data.items) wishCountEl.textContent = wishJson.data.items.length;
    } catch(e){ console.warn('Wishlist fetch failed', e); }

  } else {
    placeholder.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    `;
    cartCountEl.textContent = '0';
    wishCountEl.textContent = '0';
  }
}
