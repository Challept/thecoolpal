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
let debounceTimeout;

function toggleProductSelection(productCard, price) {
    productCard.classList.toggle('selected');
    const priceAmount = parseInt(price);

    if (productCard.classList.contains('selected')) {
        updateTotalPrice(totalPrice, totalPrice + priceAmount);
        totalPrice += priceAmount;
    } else {
        updateTotalPrice(totalPrice, totalPrice - priceAmount);
        totalPrice -= priceAmount;
    }
}

function updateTotalPrice(from, to) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => animateTotalPrice(from, to), 200);
}

function animateTotalPrice(from, to) {
    const duration = 500; // Total tid för animationen i ms
    const increment = (to - from) / (duration / 16); // Antal steg baserat på 60 FPS
    let current = from;
    const totalElement = document.getElementById('total-price');

    function updateDisplay() {
        if ((increment > 0 && current >= to) || (increment < 0 && current <= to)) {
            totalElement.innerText = `Total: ${to} kr`;
        } else {
            current += increment;
            totalElement.innerText = `Total: ${Math.round(current)} kr`;
            requestAnimationFrame(updateDisplay);
        }
    }
    updateDisplay();
}

// Formulärvalideringsfunktion
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const additionalInfo = document.getElementById('additional-info').value.trim();
    const selectedProducts = document.querySelectorAll('.product-card.selected');
    const validationMessage = document.getElementById('validation-message');

    if (name === "" || phone === "" || address === "" || selectedProducts.length === 0) {
        validationMessage.style.display = "block";
        validationMessage.style.color = "red";
        validationMessage.innerText = "Du måste fylla i alla fält och välja minst en produkt!";
    } else {
        validationMessage.style.display = "none";
        alert("Beställning skickad!");
        // Exempel på vad som händer efter en lyckad validering
        // Exempel: window.location.href = 'bekräftelsesida.html';
    }
}
