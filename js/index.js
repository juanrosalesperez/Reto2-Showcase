function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);
  ev.target.appendChild(element);
  ev.target.classList.add("dropped");
  element.classList.add("dropped_element");
  element.setAttribute("draggable", "false");
}
