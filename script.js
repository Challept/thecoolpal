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
};

function validateForm() {
    // Validation code here
    return true; // only submit if valid
}
