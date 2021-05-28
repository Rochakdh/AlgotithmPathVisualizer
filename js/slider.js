let rowSize = document.getElementById("rows");
let cellSize = document.getElementById("cell-size");

console.log(rowSize.value);
rowSize.addEventListener("input", function (event) {
  rowSize.value = event.target.value;
});

cellSize.addEventListener("input", function (event) {
  boxSize = event.target.value;
});
