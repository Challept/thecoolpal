// Hämta referenser till inputfält och felmeddelande
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Funktion för att normalisera telefonnummer
function normalizePhoneNumber(phone) {
    // Ta bort alla mellanslag
    phone = phone.replace(/\s+/g, '');

    // Konvertera nummer som börjar med +46 eller 0 till format 46...
    if (phone.startsWith('+46')) {
        phone = '46' + phone.slice(3);
    } else if (phone.startsWith('0')) {
        phone = '46' + phone.slice(1);
    }

    return phone;
}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = normalizePhoneNumber(document.getElementById('phone').value.trim());

    fetch('https://script.google.com/macros/s/AKfycbzNeQrY2s4igGV-eY0EHE8hAV4B7nImhpETsNP8w0y-F2rjA45BmijnAkTmBYu60xXOhw/exec')
        .then(response => response.json())
        .then(data => {
            console.log('Data från Google Sheets:', data);
            console.log('Inputvärden:', { name, email, phone });

            const user = data.find(user => 
                user.name.toLowerCase() === name.toLowerCase() &&
                user.email.toLowerCase() === email.toLowerCase() &&
                normalizePhoneNumber(user.phone.trim()) === phone
            );

            if (user) {
                alert('Inloggning lyckades!');
                window.location.href = 'dashboard.html';
            } else {
                console.log('Ingen matchning hittades');
                errorMessage.style.display = 'block';
                errorMessage.innerText = 'Felaktiga uppgifter. Vänligen försök igen.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            errorMessage.style.display = 'block';
            errorMessage.innerText = 'Ett tekniskt fel uppstod. Vänligen försök igen senare.';
        });
});
