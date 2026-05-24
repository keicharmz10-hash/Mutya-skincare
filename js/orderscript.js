// ===== Order Summary Logic =====
const summary = document.getElementById('summary');
const payBtn = document.querySelector('.pay-btn');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cart.length === 0) {
  summary.innerHTML = '<p>Your cart is empty.</p>';
  payBtn.style.display = 'none';
} else {
  let total = 0;

  summary.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    return `
      <div class="order-item">
        <div>
          <strong>${item.name}</strong><br>
          Qty: ${item.qty}
        </div>
        <div>¥${subtotal.toLocaleString()}</div>
      </div>
    `;
  }).join('');

  summary.innerHTML += `
    <div class="total">
      <span>Total</span>
      <span>¥${total.toLocaleString()}</span>
    </div>
  `;
}

/* ===== PLACE THIS AT THE BOTTOM ===== */
function completeOrder() {
  const btn = document.querySelector('.pay-btn');
  btn.classList.add('loading');
  btn.textContent = 'Processing...';

  setTimeout(() => {
    localStorage.setItem('lastOrder', localStorage.getItem('cart'));
    localStorage.removeItem('cart');
    location.href = 'thankyou.html';
  }, 1800);
}

function completeOrder() {
  localStorage.setItem('lastOrder', JSON.stringify(cart));
  localStorage.removeItem('cart');
  location.href = 'shipping.html';
}