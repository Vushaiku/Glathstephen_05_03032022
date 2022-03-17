let url = new URL(document.URL);
let search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  console.log("Id détecté");
  let name = search_params.get("id");
  console.log(name);
} else {
  console.log("Objet pas dans le BD");
}

let eltOrder = document.getElementById("orderId");
eltOrder.innerHTML = search_params.get("id");
