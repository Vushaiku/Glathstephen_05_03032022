let panier = JSON.parse(localStorage.getItem("carts") || "[]");
let total = 0;
let qtyProducts = 0;

displayCart();
function displayCart() {
  if (!panier || panier.length == 0) {
    console.log("PAS D'ARTICLES !");
    document.getElementById("totalPrice").innerHTML = "0";
    document.getElementById("totalQuantity").innerHTML = "0";
    return;
  }

  let elt = document.getElementById("cart__items");
  elt.innerHTML = "";
  qtyProducts = 0;
  total = 0;
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
            console.log("Objet à afficher dans le panier trouvé !");
            qtyProducts += parseInt(element.qty);
            total += parseInt(element.qty) * parseInt(product.price);
            document.getElementById("totalPrice").innerHTML = total;
            document.getElementById("totalQuantity").innerHTML = qtyProducts;
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
}

let selectElement = document.getElementsByName("itemQuantity");
let deleteButtons = document.getElementsByClassName("deleteItem");

function loadListener() {
  if (deleteButtons) console.log("Buttons supprimer trouvé !");
  if (selectElement) {
    console.log("Element trouvé");
    for (let i = 0; i < selectElement.length; ++i) {
      selectElement[i].addEventListener("change", changeQty);
      deleteButtons[i].addEventListener("click", deleteProduct);
      console.log("Eventlistener ajouté pour produit n." + i);
    }
  } else console.log("Pas de produits !");
}
function changeQty(e) {
  console.log("Nouvelle quantité ! (" + this.value + ")");
  let newQty = parseInt(this.value);
  let close = this.closest("[data-id]");
  console.log("Article à changer : " + close.dataset.id);
  qtyProducts = parseInt(this.value);
  panier.forEach(function (element, index) {
    if (element.id != close.dataset.id) {
      qtyProducts += parseInt(element.qty);
    } else if (element.id == close.dataset.id) {
      element.qty = newQty;
      console.log("Id à changer trouvé ! Nouvelle quantité : " + element.qty);
    }
    console.log("Qtyproduct dans boucle : " + qtyProducts);
  });
  console.log("Nouvelle quantité dans panier : " + qtyProducts);
  console.log("Test");
  panier.forEach(function (element, index) {
    console.log(
      "Element id :" + element.id + " Et element qty : " + element.qty
    );
  });
  localStorage.clear();
  localStorage.setItem("carts", JSON.stringify(panier));
  displayCart();
}

function deleteProduct(e) {
  let close = this.closest("[data-id]");
  console.log("Aricle à virer !");
  panier.forEach(function (element, index) {
    if (element.id == close.dataset.id) {
      console.log("Objet à effacer trouvé !");
      panier.splice(index, 1);
    }
  });
  panier.forEach(function (element, index) {
    console.log("Item : ", element.id);
  });
  console.log("Nombre d'articles : " + panier.length);
  localStorage.setItem("carts", JSON.stringify(panier));
  displayCart();
}
