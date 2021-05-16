const grids = document.querySelector('.grids')
const boxSize =  25
const columns = Math.floor(window.innerWidth / boxSize)
const rows = 25


grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`)
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`)


for (var i = 0 ; i < (rows*columns); i++){
    let box = document.createElement('div')
    box.style.width =  boxSize + 'px'
    box.style.height = boxSize + 'px'
    grids.appendChild(box).className = 'box'
}
console.log(grids.children)

