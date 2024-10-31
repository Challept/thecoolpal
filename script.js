window.onload = function() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const swishLink = document.getElementById('swish-link');
    const swishQR = document.getElementById('swish-qr');

    if (isMobile) {
        swishLink.style.display = 'block';
        swishLink.href = 'swish://payment';
    } else {
        swishQR.style.display = 'block';
    }

    // Lägg till klickhändelse för produkter
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', () => selectProduct(product));
    });
};

// Funktion för att växla produktval och styling
function selectProduct(element) {
    element.classList.toggle("selected");
}

// Formulärvalidering
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const acceptTerms = document.getElementById('accept').checked;
    const selectedProducts = document.querySelectorAll('.product.selected');

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

    // Om alla fält är giltiga, fortsätt med formulärinlämning
    return true;
}
