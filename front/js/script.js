const elt = document.getElementById("items");
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) return res.json();
  })
  .then(function (value) {
    value.forEach((product) => {
      console.log(product.name);
      elt.innerHTML +=
        "<a href=./product.html?id=" +
        product._id +
        "> " +
        "<article><img src=" +
        product.imageUrl +
        "><h3>" +
        product.name +
        "</h3><p>" +
        product.description +
        "</p></article></a>";
    });
  });

// var data = response.json();

// data.forEach((products) => {
//   console.log(products.name);
// });
