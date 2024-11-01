document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Anropa Google Apps Script för att hämta data från Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbxm783fL77u2c1jOqmTGDY2wJzuzcCexPkLvYQHB1NiyVxiV-dFhoNWbuuDrmFYt47sXg/exec')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.name === name && user.email === email && user.phone === phone);

            if (user) {
                alert('Inloggning lyckades!');
                // Dirigera användaren till adminpanelen eller dashboard-sidan
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.style.display = 'block';
                errorMessage.innerText = 'Felaktiga uppgifter. Vänligen försök igen.';
            }
        })
        .catch(error => {
            console.error('Fel vid inläsning av data:', error);
            errorMessage.style.display = 'block';
            errorMessage.innerText = 'Ett tekniskt fel uppstod. Vänligen försök igen senare.';
        });
});
