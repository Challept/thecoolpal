// Hämta totalpriset från URL-parametern
const urlParams = new URLSearchParams(window.location.search);
const totalAmount = urlParams.get('total');

// Kontrollera att totalAmount finns
if (totalAmount) {
    console.log(`Total amount to be charged: ${totalAmount} kr`);
} else {
    console.error('Total amount not provided in URL parameters.');
    alert('Ett fel uppstod: totalbeloppet saknas.');
}

// Initialisera Stripe
const stripe = Stripe('din_public_key');

// Elements-inställningar
let elements;
initialize();

async function initialize() {
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount })
    });
    const { clientSecret } = await response.json();

    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
}

// Hantera formulärens submit-händelse
document.querySelector('#payment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    document.querySelector('#submit').disabled = true;

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: 'http://webstay.se/bekraftelse.html',
        },
    });

    if (error) {
        document.querySelector('#payment-message').textContent = error.message;
        document.querySelector('#submit').disabled = false;
    }
});
