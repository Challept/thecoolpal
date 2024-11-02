// Hämta och rendera produktdata från availableproducts.json
window.onload = function() {
    console.log('Laddar produktdata...');
    fetch('availableproducts.json')
        .then(response => {
            console.log('Svar mottaget från availableproducts.json:', response);
            return response.json();
        })
        .then(products => {
            console.log('Produkter laddade:', products);
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
        .catch(error => {
            console.error('Error loading products:', error);
        });

    // Se till att knappen är tillgänglig innan addEventListener
    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
        console.log("Submit-knappen hittad och lyssnare läggs till.");
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
        console.log(`Produkt vald: ${productCard.querySelector('h4').innerText}, pris: ${price} kr`);
    } else {
        totalPrice -= price;
        console.log(`Produkt avmarkerad: ${productCard.querySelector('h4').innerText}, pris: ${price} kr`);
    }
    document.getElementById('total-price').innerText = totalPrice;
    console.log('Uppdaterat totalpris:', totalPrice);
}

// Skicka beställning till Google Apps Script och Telegram
function handleSubmit() {
    console.log('Skickar beställning...');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const domainName = document.getElementById('domain').value;
    const additionalInfo = document.getElementById('additional-info').value;
    const selectedProducts = document.querySelectorAll('.product-card.selected');

    console.log('Formulärvärden:', { name, email, phone, address, domainName, additionalInfo });
    console.log('Valda produkter:', selectedProducts.length);

    if (name && email && address && phone && domainName && selectedProducts.length > 0) {
        console.log('Alla fält är ifyllda. Skapar produktlista...');
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

        console.log('Skickar data till Google Apps Script:', orderData);
        // Skicka data till Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbyd_dPGShAo1BnT-FHwOsNcezxV-wbZvVb_IgBTtUctSAG7r3VOhadiewyDIE_o2HdJWg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            console.log('Svar från Google Apps Script mottaget:', response);
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Svar JSON från Google Apps Script:', data);
            if (data.result === 'success') {
                console.log('Data har sparats framgångsrikt i Google Sheets.');
                alert("Data har skickats till Google Sheets!");
            } else {
                console.error('Kunde inte spara data till Google Sheets:', data);
                alert("Kunde inte spara data till Google Sheets. Försök igen.");
            }
        })
        .catch(error => {
            console.error('Error vid Google Sheets-integrationen:', error);
            alert("Ett tekniskt fel uppstod vid Google Sheets-integrationen. Kontrollera konsolen för mer information.");
        });
    } else {
        console.warn("Validering misslyckades. Alla fält måste vara ifyllda och minst en produkt vald.");
        alert("Vänligen fyll i alla fält och välj minst en produkt.");
    }
}
