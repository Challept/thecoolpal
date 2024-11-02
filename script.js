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

// Skicka beställning till Telegram
function handleSubmit() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const selectedProducts = document.querySelectorAll('.product-card.selected');

    if (name && address && phone && selectedProducts.length > 0) {
        const productsArray = [];
        selectedProducts.forEach(function(productCard) {
            const productTitle = productCard.querySelector('h4').innerText;
            const price = parseInt(productCard.getAttribute('data-price'));
            productsArray.push(`${productTitle} - ${price} kr`);
        });

        const message = `Ny beställning:\n\nNamn: ${name}\nAdress: ${address}\nTelefon: ${phone}\nProdukter:\n- ${productsArray.join('\n- ')}\n\nTotalpris: ${totalPrice} kr`;

        fetch(`https://api.telegram.org/bot7871846421:AAHjgfl2Tvq_vvntDua6zpa6FBAKYEl2VIQ/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '-1002482900933',
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                window.location.href = 'https://thecoolpal.com/admin';  // Ändra till din bekräftelsesida
            } else {
                alert("Kunde inte skicka meddelandet till Telegram. Försök igen.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ett tekniskt fel uppstod. Försök igen.");
        });
    } else {
        alert("Vänligen fyll i alla fält och välj minst en produkt.");
    }
}
