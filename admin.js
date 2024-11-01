document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Här kommer vi att hämta och kontrollera data från Google Sheets
    fetch('URL_TILL_GOOGLE_SHEETS_API')
        .then(response => response.json())
        .then(data => {
            const validUser = data.some(row => row.name === name && row.email === email && row.phone === phone);
            if (validUser) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('admin-section').style.display = 'block';
            } else {
                document.getElementById('login-message').innerText = 'Felaktiga inloggningsuppgifter, försök igen.';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('logout-button').addEventListener('click', function() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
    document.getElementById('login-form').reset();
});
