let items = document.querySelectorAll("div.drag_item img");
let cart = document.querySelectorAll("section#cart ul")[0];

function updateCart() {
  var total = 0.0;
  var cart_items = document.querySelectorAll("#cart ul li");
  for (var i = 0; i < cart_items.length; i++) {
    var cart_item = cart_items[i];
    var quantity = cart_item.getAttribute("data-quantity");
    var price = cart_item.getAttribute("data-price");

    var sub_total = parseFloat(quantity * parseFloat(price));
    cart_item.querySelectorAll("span.sub-total")[0].innerHTML =
      " = " + sub_total.toFixed(2);

    total += sub_total;
  }

  document.querySelectorAll(".total span")[0].innerHTML = total.toFixed(2);
}

function updateCartItem(item) {
  var quantity = item.getAttribute("data-quantity");
  quantity = parseInt(quantity) + 1;

  item.setAttribute("data-quantity", quantity);
  let span = item.querySelectorAll("span.quantity");
  span[0].innerHTML = " x " + quantity;
}

function addCartItem(item, id, price) {
  let cart = document.querySelectorAll("section#cart ul")[0];
  var clone = document.createElement("li");
  let name = "";
  if (id === "producto_1") {
    name = "Mantequilla";
  } else if (id === "producto_2") {
    name = "Galletas";
  } else if (id === "producto_3") {
    name = "Mermelada";
  } else if (id === "producto_4") {
    name = "Espaguetis";
  } else if (id === "producto_5") {
    name = "Agua";
  } else if (id === "producto_6") {
    name = "Gaseosa";
  } else if (id === "producto_7") {
    name = "Batido";
  } else if (id === "producto_8") {
    name = "Zumo";
  } else if (id === "producto_9") {
    name = "Coca Cola";
  } else if (id === "producto_10") {
    name = "Leche";
  }
  clone.setAttribute("data-id", id);
  clone.setAttribute("data-price", price);
  clone.setAttribute("data-quantity", 1);
  clone.removeAttribute("id");

  var fragment = document.createElement("span");
  fragment.setAttribute("class", "name");
  fragment.innerHTML = name;
  clone.appendChild(fragment);

  fragment = document.createElement("span");
  fragment.setAttribute("class", "quantity");
  fragment.innerHTML = " x 1";
  clone.appendChild(fragment);

  fragment = document.createElement("span");
  fragment.setAttribute("class", "sub-total");
  clone.appendChild(fragment);
  cart.appendChild(clone);
}

function onDrop(ev) {
  if (ev.preventDefault) ev.preventDefault();
  if (ev.stopPropagation) ev.stopPropagation();
  else ev.cancelBubble = true;

  let data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);
  let price = element.getAttribute("data-price");

  ev.target.appendChild(element);
  ev.target.classList.add("dropped");
  element.classList.add("dropped_element");
  element.setAttribute("draggable", "false");

  var exists = document.querySelectorAll('#cart ul li[data-id="' + data + '"]');
  if (exists.length > 0) {
    updateCartItem(exists[0]);
  } else {
    addCartItem(element, data, price);
  }

  updateCart();
}

function onDragOver(event) {
  if (event.preventDefault) event.preventDefault();
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;
  return false;
}
function onDrag(event) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  var target = event.target || event.srcElement;
  var success = event.dataTransfer.setData("Text", target.id);
}
function Borrar() {
  location.reload();
}
