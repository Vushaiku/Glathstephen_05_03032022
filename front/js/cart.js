var panier = JSON.parse(localStorage.getItem("carts") || "[]");
var total = 0;
var qtyProducts = 0;

panier.forEach(function (element, index) {
  console.log("Canapé id : " + element.id);
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) return res.json();
    })
    .then(function (value) {
      value.forEach((product) => {
        console.log(
          "Comparaison de l'id " + element.id + " avec l'id " + product._id
        );
        if (element.id == product._id) {
          qtyProducts += parseInt(element.qty);
          total += parseInt(element.qty) * parseInt(product.price);
          document.getElementById("totalPrice").innerHTML = total;
          document.getElementById("totalQuantity").innerHTML = qtyProducts;
          var elt = document.getElementById("cart__items");
        }
      });
    });
});
