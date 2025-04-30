document.addEventListener('DOMContentLoaded', function () {
  const cartKey = 'riksha-cart';

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const item = {
        name: this.dataset.name,
        price: parseInt(this.dataset.price),
        img: this.dataset.img,
        qty: 1
      };

      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const existing = cart.find(el => el.name === item.name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push(item);
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert(`${item.name} добавлен в корзину`);
    });
  });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('checkout.html')) {
    renderCart();
  }
});

function renderCart() {
  const container = document.querySelector('.cart-container');
  const totalEl = document.getElementById('total');
  const finalEl = document.getElementById('final');
  const deliveryEl = document.getElementById('delivery');
  const deliveryCost = 100;

  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.style.display = 'flex';
    itemEl.style.alignItems = 'center';
    itemEl.style.justifyContent = 'space-between';
    itemEl.style.margin = '10px 0';
    itemEl.innerHTML = `
      <div style="flex: 1">${item.name}</div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <button onclick="updateQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateQty(${index}, 1)">+</button>
      </div>
      <div>${item.price * item.qty} ₽</div>
      <button onclick="removeItem(${index})" style="margin-left: 10px; color: red;">Удалить</button>
    `;
    container.appendChild(itemEl);
    total += item.price * item.qty;
  });

  totalEl.textContent = total + ' ₽';
  deliveryEl.textContent = (cart.length ? deliveryCost : 0) + ' ₽';
  finalEl.textContent = (cart.length ? total + deliveryCost : 0) + ' ₽';
}

window.updateQty = function(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

window.removeItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
