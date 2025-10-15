async function getProducts(){
    let response = await fetch('group.json')
    let products = await response.json()
    return products
}

function getCardHtml(info){
    let productData = JSON.stringify(info)

    return`
			<div class="col" id='${info.sing}' ontouchstart="this.classList.toggle('hover');">
				<div class="container">
					<div class="front" style="background-image: url(${info.img})">
						<div class="inner">
							<p>${info.name}</p>
              <span>${info.role}</span>
						</div>
					</div>
					<div class="back">
						<div class="inner">
                            <h2>${info.name}</h2>
                            <p>День народження ${info.birth}</p>
						    <p>${info.des}</p>
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
    let cardList = document.querySelector('.pepList')
    if(cardList){
        products.forEach(element => {
            cardList.innerHTML += getCardHtml(element)
        });
    }
})