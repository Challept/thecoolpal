// Hämta referenser till inputfält och felmeddelande
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Funktion för att normalisera telefonnummer till 7-siffrigt format
function normalizePhoneNumber(phone) {
    phone = phone.replace(/\D/g, ''); // Ta bort alla icke-siffror
    if (phone.startsWith('+46')) {
        phone = phone.slice(3); // Ta bort +46
    } else if (phone.startsWith('46')) {
        phone = phone.slice(2); // Ta bort 46
    } else if (phone.startsWith('0')) {
        phone = phone.slice(1); // Ta bort den inledande nollan
    }
    return phone;
}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om

    const name = document.getElementById('name').value.trim();
    const phone = normalizePhoneNumber(document.getElementById('phone').value.trim());

    fetch('https://script.google.com/macros/s/AKfycbzNeQrY2s4igGV-eY0EHE8hAV4B7nImhpETsNP8w0y-F2rjA45BmijnAkTmBYu60xXOhw/exec')
        .then(response => response.json())
        .then(data => {
            console.log('Data från Google Sheets:', data);
            console.log('Inputvärden:', { name, phone });

            const user = data.find(user => 
                user.name.toLowerCase() === name.toLowerCase() &&
                normalizePhoneNumber(String(user.phone).trim()) === phone
            );

            if (user) {
                alert('Inloggning lyckades!');
                sessionStorage.setItem('loggedIn', 'true');
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
