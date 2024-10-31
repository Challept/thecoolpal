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
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                `;
                productCard.onclick = () => productCard.classList.toggle('selected');
                productList.appendChild(productCard);
            });
        });

    // Formulärvalidering
    document.querySelector("button").onclick = validateForm;
};

// Formulärvalideringsfunktion
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const acceptTerms = document.getElementById('accept').checked;
    const selectedProducts = document.querySelectorAll('.product-card.selected');

    if (name === "") {
        alert("Namn är obligatoriskt!");
        return false;
    }

    if (phone === "") {
        alert("Telefonnummer är obligatoriskt!");
        return false;
    }

    if (selectedProducts.length === 0) {
        alert("Välj minst en produkt!");
        return false;
    }

    if (!acceptTerms) {
        alert("Godkänn villkoren innan du fortsätter.");
        return false;
    }

    alert("Beställning skickad!");
    return true;
}
