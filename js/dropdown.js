let selectedAlgorithm;
let select = document.getElementById('select-option')
let selectMaze = document.getElementById('maze')
select.addEventListener('change',function(e){
    selectedAlgorithm = e.target.value
})