const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector("#linkcontainer");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData);
}
function showData(data) {
  let markup = "";
  console.log(data);
  data.forEach((element) => {
    container.innerHTML += `<a href="productlist.html?category=${element.category}">${element.category}</a> `;
  });
}

getData();
