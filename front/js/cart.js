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
          elt.innerHTML += `
          <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                  <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${element.color}</p>
                      <p>${product.price} euros</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${element.qty}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.qty}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
          `;
        }
      });
    })
    .then(function (res) {
      loadListener();
    });
});

var selectElement = document.getElementsByName("itemQuantity");

function loadListener() {
  if (selectElement) {
    console.log("Element trouvé");
    for (var i = 0; i < selectElement.length; ++i) {
      selectElement[i].addEventListener("change", changeQty);
      console.log("Eventlistener ajouté pour produit n." + i);
    }
  } else console.log("Pas de produits !");
}
function changeQty(e) {
  console.log("Nouvelle quantité ! (" + this.value + ")");
  var close = this.closest("[data-id]");
  console.log("Article à changer : " + close.dataset.id);
}
