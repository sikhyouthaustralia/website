'use strict';

var handler = StripeCheckout.configure({
    key: 'pk_test_dK6CFPgvYvUDJtqpKwfjgMCj',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    color: 'black',
    locale: 'auto',
    bitcoin: true,
    token: function token(_token) {
        console.log(_token);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
    }
});

document.getElementById('customButton').addEventListener('click', function (e) {
    // Open Checkout with further options:
    handler.open({
        name: 'Sikh Youth Australia',
        description: 'Donate for SYA',
        currency: 'aud',
        amount: 2000
    });
    e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function () {
    handler.close();
});
//# sourceMappingURL=popup.js.map
