// JS/card.js
async function getProducts() {
  try {
    const res = await fetch('JSON/group.json');
    if (!res.ok) throw new Error('group.json fetch failed: ' + res.status);
    const products = await res.json();
    return products;
  } catch (err) {
    console.error('getProducts error:', err);
    return [];
  }
}

function getCardHtml(info) {
  return `
    <div class="col person" id="${info.sing}" data-role="${Array.isArray(info.infRole) ? info.infRole.join(',') : info.infRole}">
      <div class="container">
        <div class="front" style="background-image: url(${info.img})">
          <div class="inner">
            <p>${info.name}</p>
            <span>${info.role}</span>
          </div>
        </div>
        <div class="back">
          <div class="inner">
            <h2>${info.name}</h2>
            <p>День народження ${info.birth}</p>
            <p>${info.des}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Функція для рендера і повернення Promise, щоб інші модулі чекали завершення
async function renderCardsAndReturn() {
  const products = await getProducts();
  const cardList = document.querySelector('.pepList');
  if (!cardList) {
    console.warn('.pepList not found in DOM');
    return [];
  }

  cardList.innerHTML = ''; // очищаємо перед додаванням
  products.forEach(p => {
    cardList.innerHTML += getCardHtml(p);
  });

  console.log('card.js: cards rendered:', products.map(p => p.sing));
  return products.map(p => p.sing); // повертаємо масив id-ів
}

// Запускаємо рендер автоматично (якщо ти підключаєш card.js в <script>)
window.cardRenderPromise = renderCardsAndReturn();