let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* ===== Open / Close ===== */
function openCart() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return;
  modal.classList.add('active');
  renderCart();
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return;
  modal.classList.remove('active');
}

/* ===== Add Item ===== */
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  openCart();
}

/* ===== Quantity ===== */
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  saveCart();
  renderCart();
}

/* ===== Remove ===== */
function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  saveCart();
  renderCart();
}

/* ===== RENDER (THIS STAYS IN cart.js) ===== */
function renderCart() {
  const pageBox = document.getElementById('cart-items');
  const modalBox = document.getElementById('cart-items-modal');

  if (pageBox) pageBox.innerHTML = '';
  if (modalBox) modalBox.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const html = `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          ¥${item.price.toLocaleString()}
        </div>

        <div class="qty">
          <button onclick="changeQty('${item.name}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name}', 1)">＋</button>
        </div>

        <button class="remove-btn" onclick="removeItem('${item.name}')">🗑</button>
      </div>
    `;

    if (pageBox) pageBox.innerHTML += html;
    if (modalBox) modalBox.innerHTML += html;
  });

  if (document.getElementById('cart-total')) {
    document.getElementById('cart-total').textContent = total.toLocaleString();
  }
  if (document.getElementById('cart-total-modal')) {
    document.getElementById('cart-total-modal').textContent = total.toLocaleString();
  }

  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
}

/* ===== Save ===== */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* ===== Init ===== */
renderCart();

function openCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('active'), 10);

  document.body.classList.add('cart-open'); // 👈 lock scroll
  renderCart();
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  modal.classList.remove('active');

  document.body.classList.remove('cart-open'); // 👈 unlock scroll

  setTimeout(() => modal.style.display = 'none', 400);
}
