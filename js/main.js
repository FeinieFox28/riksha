document.addEventListener('DOMContentLoaded', function () {
  const confirmButton = document.querySelector('.btn2');
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.modal .close');

  confirmButton.addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.querySelector('input[placeholder="Ваше имя"]').value.trim();
    const phone = document.querySelector('input[placeholder="Телефон"]').value.trim();
    const phonePattern = /^\+?[78][\d\s\-()]{9,}$/;

    if (name === '' || phone === '' || !phonePattern.test(phone)) {
      alert('Пожалуйста, введите корректные контактные данные');
      return;
    }

    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.querySelectorAll('.counter').forEach(counter => {
    const minus = counter.querySelector('.minus');
    const plus = counter.querySelector('.plus');
    const qty = counter.querySelector('.qty');

    minus.addEventListener('click', () => {
      let value = parseInt(qty.textContent, 10);
      if (value > 1) {
        qty.textContent = value - 1;
        updateTotals();
      }
    });

    plus.addEventListener('click', () => {
      let value = parseInt(qty.textContent, 10);
      qty.textContent = value + 1;
      updateTotals();
    });
  });

  document.querySelector('.btn').addEventListener('click', () => {
    const promo = document.querySelector('input[placeholder="Промокод"]').value.trim().toUpperCase();
    let total = parseInt(document.getElementById('total').textContent);
    
    if (promo === 'RIKSHA10') {
      const discount = Math.floor(total * 0.1);
      const final = total - discount;
      document.getElementById('final').textContent = final + ' ₽';
      alert('Промокод применён! Скидка 10%');
    } else {
      alert('Промокод недействителен');
    }
  });

  function updateTotals() {
    let total = 0;
    document.querySelectorAll('.order .cart-item').forEach(item => {
      const priceEl = item.querySelector(':scope > div:last-child');
      if (priceEl && priceEl.textContent.includes('₽')) {
        const price = parseInt(priceEl.textContent);
        total += price;
      }
    });

    const delivery = 0;
    document.getElementById('total').textContent = total + ' ₽';
    document.getElementById('delivery').textContent = delivery + ' ₽';
    document.getElementById('final').textContent = (total + delivery) + ' ₽';
  }

  updateTotals();
});

document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('riksha-cart')) || [];
  const orderContainer = document.querySelector('.order');

  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="60">
      <div>${item.name}</div>
      <div>
        <button class="decrease">-</button>
        <span>${item.qty}</span>
        <button class="increase">+</button>
      </div>
      <div>${item.price * item.qty} ₽</div>
    `;
    orderContainer.appendChild(div);
  });
});

  

  