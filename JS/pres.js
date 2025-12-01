async function getProducts(){
    let response = await fetch('JSON/pres.json')
    let products = await response.json()
    return products
}

function getCardHtml(pres){
    let productData = JSON.stringify(pres)

    return`
			<div class="presInf">
            <h2>Урок №${pres.lessNum}</h2>
            <div>
                <p>Тема: ${pres.lessTopic}</p>
                <p>Призентація: <a href="${pres.url}">${pres.lessTopic}</a></p>
            </div>
        </div>
    `
}

getProducts().then(function(products){
    let cardList = document.querySelector('.presList')
    if(cardList){
        products.forEach(element => {
            cardList.innerHTML += getCardHtml(element)
        });
    }
})