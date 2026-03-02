const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);
const productContainer = document.querySelector(".product-detail");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${productId}`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(data) {
  productContainer.innerHTML = `
  <div> 
  <a href="productlist.html?category=${data.category}">Tilbage til produkter</a>
  <figure>
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="product image" class="productImage" />
    ${data.discount ? `<span class="saleLabel">Udsalg!</span>` : ""}
  </figure>
  </div>
          <section class="product-detail__info">
          <h2 class="product-brand">${data.productdisplayname}</h2>
          <div>
          <p class="article-type"><span class="bold">Type:</span> ${data.articletype}</p>
          <p class="product-category"><span class="bold">Kategori:</span> ${data.category}</p>
          <p class="product-price"><span class="bold">Pris:</span> ${data.price},-</p>
</div>

<button class="buyButton">Køb nu</button>
</section>
`;
}

getData();
