'use strict';

var handler = StripeCheckout.configure({
    key: 'pk_test_dK6CFPgvYvUDJtqpKwfjgMCj',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        console.log(token);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
    }
});

document.getElementById('customButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
        name: 'Sikh Youth Australia',
        description: '2 widgets',
        currency: 'aud',
        amount: 2000,
        label: 'Donate'
    });
    e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
    handler.close();
});
