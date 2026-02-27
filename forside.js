const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector("#linkcontainer");

function getData() {
  fetch(endpoint)
    .then((fisk) => fisk.json())
    .then(showData);
}
function showData(data) {
  console.log(data);
  data.forEach((fisk) => {
    container.innerHTML += `<a href="productlist.html">${fisk.category}</a> `;
  });
}

getData();
