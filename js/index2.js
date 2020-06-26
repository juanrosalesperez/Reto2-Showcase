/* function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  if (ev.preventDefault) ev.preventDefault();
  if (ev.stopPropagation) ev.stopPropagation();
  else ev.cancelBubble = true;

  let data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);

  ev.target.appendChild(element);
  ev.target.classList.add("dropped");
  element.classList.add("dropped_element");
  element.setAttribute("draggable", "false");

  var exists = document.querySelectorAll("#cart ul li[data-id='" + data + "']");

  if (exists.length > 0) {
    updateCartItem(exists[0]);
  } else {
    addCartItem(element, data);
  }

  updateCart();

  return false;
} */

//--------------------------------------------
function addEvent(element, event, delegate) {
  if (typeof window.event != "undefined") {
    element.attachEvent("on" + event, delegate);
  } /* else {
    element.addEventListener(event, delegate, false);
  } */
}

addEvent(document, "readystatechange", function () {
  if (document.readyState !== "complete") return true;
});

let items = document.querySelectorAll("div.drag_item img");
let cart = document.querySelectorAll("section#cart ul")[0];

function updateCart() {
  var total = 0.0;
  var cart_items = document.querySelectorAll("#cart ul li");
  console.log("Este es el cart_items ");
  console.log(cart_items);
  for (var i = 0; i < cart_items.length; i++) {
    var cart_item = cart_items[i];
    console.log("Este es el cart_item ");
    console.log(cart_item);
    var quantity = cart_item.getAttribute("data-quantity");
    console.log("Este es el quantity ");
    console.log(quantity);
    var price = cart_item.getAttribute("data-price");
    console.log("Este es el price ");
    console.log(price);

    var sub_total = parseFloat(quantity * parseFloat(price));
    cart_item.querySelectorAll("span.sub-total")[0].innerHTML =
      " = " + sub_total.toFixed(2);

    total += sub_total;
  }

  document.querySelectorAll("#cart span.total")[0].innerHTML = total.toFixed(2);
}

function addCartItem(item, id, price) {
  let cart = document.querySelectorAll("section#cart ul")[0];
  console.log("Este es el item ");
  console.log(item);
  console.log("Este es el id ");
  console.log(id);
  var clone = document.createElement("li");
  clone.setAttribute("data-id", id);
  clone.setAttribute("data-price", price);
  clone.setAttribute("data-quantity", 1);
  clone.removeAttribute("id");
  console.log("Este es el clone ");
  console.log(clone);

  var fragment = document.createElement("span");
  console.log("Este es el fragment ");
  console.log(fragment);
  fragment.setAttribute("class", "quantity");
  fragment.innerHTML = " x 1";
  clone.appendChild(fragment);

  fragment = document.createElement("span");
  fragment.setAttribute("class", "sub-total");
  clone.appendChild(fragment);
  console.log("Este es el cart ");
  console.log(cart);
  cart.appendChild(clone);
}

function updateCartItem(item) {
  var quantity = item.getAttribute("data-quantity");

  quantity = parseInt(quantity) + 1;
  console.log("Este es el quantity ");
  console.log(quantity);

  item.setAttribute("data-quantity", quantity);
  let span = item.querySelectorAll("span.quantity");
  console.log("Este es el span ");
  console.log(span);
  span[0].innerHTML = " x " + quantity;
}

function onDrop(ev) {
  if (ev.preventDefault) ev.preventDefault();
  if (ev.stopPropagation) ev.stopPropagation();
  else ev.cancelBubble = true;

  let data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);
  let price = element.getAttribute("data-price");
  console.log("Este es el pricefffff ");
  console.log(price);
  console.log("Este es el data ");
  console.log(data);
  console.log("Este es el element ");
  console.log(element);

  ev.target.appendChild(element);
  ev.target.classList.add("dropped");
  element.classList.add("dropped_element");
  element.setAttribute("draggable", "false");

  var exists = document.querySelectorAll(
    '#cart ul li [data-id="' + data + '"]'
  );
  /* var exists = document.querySelectorAll(
    "div.productos img[data-id='" + data + "']"
  ); */
  console.log("Este es el exists");
  console.log(exists);

  if (exists.length > 0) {
    console.log(exists.length);
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
addEvent(cart, "drop", onDrop);
addEvent(cart, "dragover", onDragOver);

for (var i = 0; i < items.length; i++) {
  var item = items[i];
  item.setAttribute("draggable", "true");
  addEvent(item, "dragstart", onDrag);
}
