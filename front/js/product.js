let url = new URL(document.URL);
let search_params = new URLSearchParams(url.search);
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
        for (let i = 0; i < product.colors.length; i++) {
          // console.log("couleur[" + i + "]" + " : " + product.colors[i]);
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

//localStorage.clear();
let submitBtn = document.getElementById("addToCart");
submitBtn.addEventListener("click", function () {
  let newCart = {
    id: search_params.get("id"),
    color: document.getElementById("colors").value,
    qty: document.getElementById("quantity").value,
  };

  if (newCart.qty <= 0 || newCart.qty > 100) {
    alert("Quantité non valide");
    return;
  }
  if (newCart.color == "") {
    alert("Couleur non valide");
    return;
  }
  console.log("A ajouter dans localstorage : " + newCart.id);
  let users = JSON.parse(localStorage.getItem("carts") || "[]");
  console.log("=======># of users: " + users.length + "<==========");
  if (users.length > 0) {
    users.forEach(function (user, index) {
      console.log(
        " Index : " + index + " Total d'objets dans panier : " + users.length
      );
      console.log(
        "[" +
          index +
          "] Canapé id : " +
          user.id +
          " de couleur " +
          user.color +
          " en quantité " +
          user.qty
      );
      if (user.id == newCart.id && user.color != newCart.color) {
        console.log("Objet id : " + user.id + " déjà dans le panier !");
        console.log(
          "Objet à rajouter : " +
            newCart.qty +
            " | Objet déjà dans le panier : " +
            user.qty
        );
        console.log(
          "Verification du panier : Objet déjà dans le panier : " +
            user.qty +
            " et objet à rajouter : " +
            newCart.qty
        );
        let total = parseInt(user.qty) + parseInt(newCart.qty);
        console.log("Total du panier + commande : " + total);
        if (total < 100) {
          user.qty = total;
          console.log("Ajout de " + newCart.qty + " dans le panier");
        } else {
          console.log(
            "Impossible d'ajouter articles : Total du panier > 100 !"
          );
        }
      } else if (index == users.length - 1) {
        console.log("Added user #" + newCart.id);
        users.push(newCart);
      } else {
        console.log("[" + index + "]: " + user.id);
      }
    });
  } else users.push(newCart);
  localStorage.setItem("carts", JSON.stringify(users));
  console.log(
    newCart.qty + " canapé(s) de couleur " + newCart.color + " ajouté au panier"
  );
});
