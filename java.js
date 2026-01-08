const productsEl = document.getElementById("products");
const currencySelect = document.getElementById("currency");

const rates = { AZN: 1, RUB: 57, USD: 0.59, EUR: 0.54 };
const symbols = { AZN: "₼", RUB: "₽", USD: "$", EUR: "€" };
const MARKUP_AZN = 1;

fetch("products.json")
  .then(r => r.json())
  .then(products => render(products))
  .catch(() => productsEl.innerHTML = "<p>Ошибка загрузки товаров</p>");

currencySelect.addEventListener("change", () => {
  fetch("products.json").then(r => r.json()).then(products => render(products));
});

function convert(priceAZN, currency) {
  return ((priceAZN + MARKUP_AZN) * rates[currency]).toFixed(2);
}

function render(products) {
  const cur = currencySelect.value;
  productsEl.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="price">${convert(p.priceAZN, cur)} ${symbols[cur]}</div>
    </div>
  `).join('');
}
