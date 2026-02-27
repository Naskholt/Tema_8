const category = new URLSearchParams(window.location.search).get("category");
console.log(category);
const container = document.querySelector("main");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
document.querySelector("h1").textContent = category;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}
function showData(json) {
  let markup = "";
  json.forEach((product) => {
    console.log(product);
    markup += `
        <a href="product.html">
        <article class="smallProduct onSale soldOut">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">Tshirts | Nike </p>
            <p class="price">DKK <span>${product.price}</span>,</p>
            <div class="discounted">
                <p>Now DKK <span>974</span>,-</p>
                <p><span>25</span>%</p>
            </div>
        </article>
        </a>
        `;
  });
  container.innerHTML = markup;
}

getData();
