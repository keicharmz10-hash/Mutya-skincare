function openProductModal(title, text, img, price) {
    document.getElementById('modal-product-title').innerText = title;
    document.getElementById('modal-product-text').innerText = text;
    document.getElementById('modal-product-img').src = img;
  
    const btn = document.getElementById('modal-cart-btn');
    btn.onclick = () => addToCart(title, price);
  
    const modal = document.getElementById('product-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
  }
  
  function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  }