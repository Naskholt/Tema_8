const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector("#linkcontainer");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData);
}
function showData(categories) {
  let markup = "";
  console.log(categories);
  categories.forEach((element) => {
    markup += `<a href="productlist.html?category=${element.category}">${element.category}</a> `;
  });
  container.innerHTML = markup;
}

getData();
