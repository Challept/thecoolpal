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

    // Add click event to products
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', () => selectProduct(product));
    });
};

// Function to toggle product selection and styling
function selectProduct(element) {
    element.classList.toggle("selected");
}

// Form validation function
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

    // If all fields are valid, proceed with form submission
    return true;
}
