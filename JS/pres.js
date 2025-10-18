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

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';');

    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // Видаляємо зайві пробіли

        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return '';
}

getProducts().then(function(products){
    let cardList = document.querySelector('.presList')
    if(cardList){
        products.forEach(element => {
            cardList.innerHTML += getCardHtml(element)
        });
    }
})