const stripe = Stripe("pk_live_51QH6igLnfTyXNYdEPTKgwYTUNqaCdfAxxKm3muIlm6GmLVvguCeN71I6udCVwiMouKam1BSyvJ4EyELKDjAsdIUo00iMqzDhqu");

let elements;

async function initialize() {
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 'product-id' }] })
    });
    const { clientSecret } = await response.json();

    elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

document.querySelector("#payment-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://localhost:4242/complete.html",
        },
    });
    if (error) {
        alert(error.message);
    }
});

initialize();
