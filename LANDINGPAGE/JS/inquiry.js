// js/inquiry.js

// ========== CART STATE ==========
let cart = JSON.parse(localStorage.getItem('inquiryCart')) || [];

// ========== DOM ELEMENTS ==========
const cartEl = document.getElementById('inquiryCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCloseBtn = document.getElementById('cartClose');
const submitBtn = document.getElementById('submitInquiryBtn');
const modal = document.getElementById('inquiryModal');
const modalClose = document.getElementById('modalClose');
const cancelModal = document.getElementById('cancelModal');
const cartSummaryEl = document.getElementById('cartSummary');
const inquiryForm = document.getElementById('inquiryForm');

// ========== HELPER: Save cart ==========
function saveCart() {
  localStorage.setItem('inquiryCart', JSON.stringify(cart));
  renderCart();
}

// ========== RENDER CART ==========
function renderCart() {
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <small>Add products from the menu</small>
      </div>
    `;
    cartTotalEl.textContent = '₱0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    html += `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₱${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-decrease">−</button>
          <span>${item.quantity}</span>
          <button class="qty-increase">+</button>
        </div>
        <button class="cart-item-remove" title="Remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartItemsEl.innerHTML = html;
  cartTotalEl.textContent = `₱${total.toLocaleString()}`;

  // Attach event listeners to quantity buttons and remove buttons
  document.querySelectorAll('.cart-item').forEach(itemEl => {
    const index = itemEl.dataset.index;
    const decreaseBtn = itemEl.querySelector('.qty-decrease');
    const increaseBtn = itemEl.querySelector('.qty-increase');
    const removeBtn = itemEl.querySelector('.cart-item-remove');

    decreaseBtn.addEventListener('click', () => changeQuantity(index, -1));
    increaseBtn.addEventListener('click', () => changeQuantity(index, 1));
    removeBtn.addEventListener('click', () => removeItem(index));
  });
}

// ========== CART ACTIONS ==========
function changeQuantity(index, delta) {
  const item = cart[index];
  const newQty = item.quantity + delta;
  if (newQty < 1) {
    removeItem(index);
  } else {
    item.quantity = newQty;
    saveCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function addToCart(product) {
  const existing = cart.find(item => item.id == product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  openCart(); // slide in cart when item added
}

// ========== OPEN / CLOSE CART ==========
function openCart() {
  cartEl.classList.add('open');
}

function closeCart() {
  cartEl.classList.remove('open');
}

// ========== MODAL FUNCTIONS ==========
function openModal() {
  if (cart.length === 0) {
    alert('Your cart is empty. Add some products first.');
    return;
  }

  // Build cart summary HTML
  let summaryHtml = '';
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    summaryHtml += `
      <div class="summary-item">
        <span class="summary-item-name">${item.name}</span>
        <span class="summary-item-qty">x${item.quantity}</span>
        <span class="summary-item-total">₱${subtotal.toLocaleString()}</span>
      </div>
    `;
  });
  summaryHtml += `
    <div class="summary-item" style="border-top:1px solid #ddd; margin-top:10px; padding-top:10px;">
      <strong>Total:</strong>
      <strong class="summary-item-total">₱${total.toLocaleString()}</strong>
    </div>
  `;
  cartSummaryEl.innerHTML = summaryHtml;

  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  inquiryForm.reset(); // clear form fields
}

// ========== SUBMIT INQUIRY (FRONTEND SIMULATION) ==========
function submitInquiry(event) {
  event.preventDefault();

  // Basic validation
  const name = document.getElementById('inquiryName').value.trim();
  const email = document.getElementById('inquiryEmail').value.trim();
  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }

  // In a real app you'd send data to a server.
  // Here we simulate success.
  alert('Inquiry sent! (Demo – no actual email was sent)');

  // Clear cart and close modal
  cart = [];
  saveCart();
  closeModal();
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Add to Inquiry buttons (works on both index.html and products.html)
  document.querySelectorAll('.add-to-inquiry').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      };
      addToCart(product);
    });
  });

  // Cart close button
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCart);
  }

  // Submit Inquiry button (opens modal)
  if (submitBtn) {
    submitBtn.addEventListener('click', openModal);
  }

  // Modal close buttons
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (cancelModal) {
    cancelModal.addEventListener('click', closeModal);
  }

  // Click outside modal to close (optional)
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Form submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', submitInquiry);
  }
});

// Optional: close cart when clicking outside (if you have an overlay)
// Add a transparent overlay if desired, but not implemented here.