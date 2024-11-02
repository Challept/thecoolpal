// Hämta och rendera produktdata från availableproducts.json
window.onload = function() {
    fetch('availableproducts.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.setAttribute('data-price', product.price);
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

    // Se till att knappen är tillgänglig innan addEventListener
    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
        submitButton.addEventListener("click", handleSubmit);
    } else {
        console.error("Kunde inte hitta submit-button");
    }
};

let totalPrice = 0;

function toggleProductSelection(productCard, price) {
    productCard.classList.toggle('selected');
    if (productCard.classList.contains('selected')) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
    document.getElementById('total-price').innerText = totalPrice;
}

// Skicka beställning till Google Apps Script och Telegram
function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const domainName = document.getElementById('domain').value;
    const additionalInfo = document.getElementById('additional-info').value;
    const selectedProducts = document.querySelectorAll('.product-card.selected');

    if (name && email && address && phone && domainName && selectedProducts.length > 0) {
        const productsArray = [];
        selectedProducts.forEach(function(productCard) {
            const productTitle = productCard.querySelector('h4').innerText;
            const price = parseInt(productCard.getAttribute('data-price'));
            productsArray.push(`${productTitle} - ${price} kr`);
        });

        const orderData = {
            name: name,
            email: email,
            phone: phone,
            domain: domainName,
            additionalInfo: additionalInfo,
            products: productsArray.join(', '),
            totalPrice: `${totalPrice} kr`
        };

        // Skicka data till Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbyd_dPGShAo1BnT-FHwOsNcezxV-wbZvVb_IgBTtUctSAG7r3VOhadiewyDIE_o2HdJWg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Data har skickats till Google Sheets!");
                window.location.href = 'confirmation.html'; // Ändra till din bekräftelsesida
            } else {
                alert("Kunde inte spara data till Google Sheets. Försök igen.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ett tekniskt fel uppstod vid Google Sheets-integrationen. Försök igen.");
        });
    } else {
        alert("Vänligen fyll i alla fält och välj minst en produkt.");
    }
}
