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
                    <p>${product.price}</p>
                    <p>${product.description}</p>
                `;
                productCard.onclick = () => productCard.classList.toggle('selected');
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
};

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
