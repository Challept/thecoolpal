window.onload = function() {
    // Hämta och rendera produktdata
    fetch('availableproducts.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <h4>${product.title}</h4>
                    <p>${product.price} kr</p>
                    <p>${product.description}</p>
                `;
                productCard.onclick = () => toggleProductSelection(productCard, parseInt(product.price));
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
};

let totalPrice = 0;

function toggleProductSelection(productCard, price) {
    productCard.classList.toggle('selected');
    const priceAmount = parseInt(price);
    if (productCard.classList.contains('selected')) {
        animateTotalPrice(totalPrice, totalPrice + priceAmount);
        totalPrice += priceAmount;
    } else {
        animateTotalPrice(totalPrice, totalPrice - priceAmount);
        totalPrice -= priceAmount;
    }
}

function animateTotalPrice(from, to) {
    const duration = 500;
    const stepTime = Math.abs(Math.floor(duration / (to - from)));
    let current = from;

    const increment = to > from ? 1 : -1;
    const totalElement = document.getElementById('total-price');

    const timer = setInterval(() => {
        current += increment;
        totalElement.innerText = current;
        if (current === to) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Formulärvalideringsfunktion
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const additionalInfo = document.getElementById('additional-info').value.trim();
    const selectedProducts = document.querySelectorAll('.product-card.selected');
    const validationMessage = document.getElementById('validation-message');

    // Kontrollera att alla fält är ifyllda och minst en produkt är vald
    if (name === "" || phone === "" || address === "" || selectedProducts.length === 0) {
        validationMessage.style.display = "block";
        validationMessage.style.color = "red";
        validationMessage.innerText = "Du måste fylla i alla fält och välja minst en produkt!";
    } else {
        validationMessage.style.display = "none";
        alert("Beställning skickad!");

        // Skicka data eller gör något annat när valideringen är godkänd
        // Exempel: window.location.href = 'bekräftelsesida.html';
    }
}
