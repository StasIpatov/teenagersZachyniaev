async function getProducts(){
    let response = await fetch('JSON/song.json')
    let products = await response.json()
    return products
}

function getCardHtml(song){
    let productData = JSON.stringify(song)

    return`
			<div style="background-image: url(${song.songImg})" class="songDiv">
                <div class="songInfo">
                    <h2>${song.songName}</h2>
                </div>
            </div>
    `
}

getProducts().then(function(products){
    let cardList = document.querySelector('.songList')
    if(cardList){
        products.forEach(element => {
            cardList.innerHTML += getCardHtml(element)
        });
    }
})

// відкриття фуллскріна
document.addEventListener("click", function(e){
    if (e.target.closest(".songDiv")) {
        let url = e.target.closest(".songDiv").style.backgroundImage;

        // витягуємо чистий шлях: url("imgSong/song1.jpg") → imgSong/song1.jpg
        url = url.replace('url("', '').replace('")', '');

        document.getElementById("fullImg").src = url;
        document.getElementById("fullscreenViewer").style.display = "flex";
    }
});

// закриття по кліку
document.getElementById("fullscreenViewer").addEventListener("click", function(){
    this.style.display = "none";
});