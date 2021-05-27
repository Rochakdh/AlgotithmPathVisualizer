let rowSize = document.getElementById("rows");
let cellSize = document.getElementById("cell-size");

rowSize.addEventListener("input", function(event){
    rows = event.target.value 
});

cellSize.addEventListener("input", function(event){
    boxSize = event.target.value 
});