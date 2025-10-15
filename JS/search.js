let search = document.getElementById('search')

let timaN = document.getElementById('timaN')
let stas = document.getElementById('stas')

let searchV = search.value
console.log(searchV)

search.addEventListener('change', function(){
    let searchV = search.value

    console.log(searchV)
    if(searchV == 0){
        timaN.style.display = 'block'
        stas.style.display = 'block'
    } else if(searchV == 1){
        timaN.style.display = 'none'
        stas.style.display = 'block'
    }

})