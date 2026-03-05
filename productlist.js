const category = new URLSearchParams(window.location.search).get("category");
console.log(category);
const container = document.querySelector("main");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=30`;
document.querySelector("h1").textContent = category;
document.querySelector(".breadcrumbs-category").textContent = category;

document
  .querySelectorAll(".productlist-filters button")
  .forEach((button) => button.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((button) => button.addEventListener("click", sorter));

let allData; // variabel til at gemme alle produkter
let udsnit; // variabel til at gemme det filtrerede udsnit af produkter

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = udsnit = data; // gem alle produkter
      showProducts(allData); // vis alle produkter
    });
}
// Funktion til at filtrere produkter baseret på køn
function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    console.log("Viser alle produkter");
    showProducts(allData); // vis alle produkter
  } else {
    const udsnit = allData.filter((product) => product.gender === valgt); // filtrer produkter baseret på køn
    console.log(udsnit);
    showProducts(udsnit); // vis filtrerede produkter
  }
}

function sorter(e) {
  if (e.target.dataset.price) {
    // tjek om der skal sorteres på pris
    const dir = e.target.dataset.price; // "up" or "down"
    if (dir == "up") {
      udsnit.sort((a, b) => a.price - b.price); // low -> high
    } else {
      udsnit.sort((a, b) => b.price - a.price); // high -> low
    }
  } else {
    // ellers sorter alfabetisk
    const dir = e.target.dataset.text; // læs retning "az" eller "za"
    if (dir == "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showProducts(udsnit);
}

function showProducts(products) {
  let markup = "";
  products.forEach((product) => {
    console.log(product);
    markup += `
        <a href="productdetails.html?id=${product.id}">
      <article class="smallProduct ${product.soldout ? "soldOut" : ""}">
      ${product.discount ? `<span class="saleLabel">tilbud</span>` : ""}
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
            <h3>${product.productdisplayname}</h3>
 <p class="subtle">${product.articletype} | ${product.brandname}</p>          
  ${
    product.discount
      ? `<p class="price">DKK <span>${product.price}</span>,</p>
            <div class="discounted">
                <p>Now DKK <span>${Math.round(product.price * (1 - product.discount / 100))}</span>,</p>
                <p><span>${product.discount}</span>%</p>
            </div>`
      : `<p class="price">DKK ${product.price},-</p>`
  }
        </article>
        </a>
        `;
  });
  container.innerHTML = markup;
}

getData();
