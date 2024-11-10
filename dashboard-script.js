// Funktion för att navigera mellan sektioner
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.style.display = 'none';
        });
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).style.display = 'block';
    });
});

// Laddar data till sektioner (exempelvis produkter)
async function loadProducts() {
    const productList = document.getElementById('product-list');
    // Lägg till exempeldata (ersätt med API-anrop senare)
    productList.innerHTML = "<p>Produkter laddade...</p>";
}

// Kör vid laddning
window.onload = function() {
    loadProducts();
    document.getElementById('overview').style.display = 'block';
};
