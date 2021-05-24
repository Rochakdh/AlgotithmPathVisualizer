
let selectedAlgorithm;
let select = document.getElementById('MySelectOption')
select.addEventListener('change',function(e){
    // console.log(e.target.value);
    selectedAlgorithm = e.target.value
})