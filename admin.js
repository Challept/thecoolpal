document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    fetch('https://script.google.com/macros/s/AKfycbzNeQrY2s4igGV-eY0EHE8hAV4B7nImhpETsNP8w0y-F2rjA45BmijnAkTmBYu60xXOhw/exec')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.name === name && user.email === email && user.phone === phone);

            if (user) {
                alert('Inloggning lyckades!');
                window.location.href = 'dashboard.html';
            } else {
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
