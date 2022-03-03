/*const elt = document.getElementById("items");
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) return res.json();
  })
  .then(function (value) {
    value.forEach((product) => {
      console.log(product.name);
      elt.innerHTML +=
        "<a href=" +
        product.imageUrl +
        "> " +
        "<article><img src=" +
        product.imageUrl +
        "><h3>" +
        product.name +
        "</h3><p>" +
        product.description +
        "</p></article></a>";
    });
  });*/
var url = new URL(document.URL);
var search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  console.log("Id détecté");
  let name = search_params.get("id");
  console.log(name);
} else {
  console.log("Objet pas dans le BD");
}

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) return res.json();
  })
  .then(function (value) {
    value.forEach((product) => {
      console.log(product._id);
      if (product._id == search_params.get("id")) {
        console.log("Canapé trouvé");
        document.getElementById("price").innerHTML = product.price;
        document.getElementById("description").innerHTML = product.description;
        document.getElementById("title").innerHTML = product.name;
        document.getElementsByClassName("item__img")[0].innerHTML =
          '<img src="' + product.imageUrl + '" alt="Coucou">';
        for (var i = 0; i < product.colors.length; i++) {
          console.log(i + " : " + product.colors[i]);
          document.getElementById("colors").innerHTML +=
            '<option value="' +
            product.colors[i] +
            '">' +
            product.colors[i] +
            "</option>";
        }
      }
    });
  });

localStorage.clear();
var submitBtn = document.getElementById("addToCart");
submitBtn.addEventListener("click", function () {
  let newCart = {
    id: search_params.get("id"),
    color: document.getElementById("colors").value,
    qty: document.getElementById("quantity").value,
  };
  console.log("A ajouter dans localstorage : " + newCart.id);
  if (localStorage.length) {
    console.log("Nombre objets panier : " + localStorage.carts.length);
    localStorage.carts += JSON.stringify(newCart);
    console.log(JSON.stringify(localStorage.carts));
  } else {
    console.log("Creation localstorage carlist");
    localStorage.setItem("carts", JSON.stringify(newCart));
    console.log("---------- Test stringify --------");
    console.log(JSON.stringify(localStorage.carts));
    var test = JSON.parse(localStorage.getItem("carts"));
    console.log(test);
  }
  console.log("Objet enregistré : " + search_params.get("id"));
});
