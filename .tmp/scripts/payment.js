'use strict';

validate.init();

var stripe = Stripe('pk_live_O5tMiDSUfGsE7ISKk2jt3oSP');
var elements = stripe.elements();

var style = {
  base: {
    color: 'black',
    fontSize: '20px',
    lineHeight: '48px',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#ccc'
    }
  },
  invalid: {
    color: '#e5424d',
    ':focus': {
      color: '#303238'
    }
  }
};

var card = elements.create('card', {
  style: style
});
card.mount('#card-element');

card.addEventListener('change', function (event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

function setOutcome(result) {
  // if (document.getElementById('donate').innerText === 'DONATE NOW') {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  // var progresscontainer = document.getElementById('progress');
  // var lineProgressBar = Spinner().Colour('#f79f33');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    var form = document.getElementById('openModal');

    var donateDetails = {
      amount: form.querySelector('input[name=donation-amount]').value * 100,
      currency: 'aud',
      description: form.querySelector('input[name=description]').value,
      name: form.querySelector('input[name=cardholder-name]').value,
      useremail: form.querySelector('input[name=cardholder-email]').value,
      token: result.token.id
    };

    var selectedlabel = $('#paymentSchedule').val();
    //console.log(selectedlabel);
    if (selectedlabel.toUpperCase() === 'Once off'.toUpperCase()) {
      var settings = {
        'async': true,
        'crossDomain': true,
        'timeout': 15000,
        'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/donate/pay',
        'method': 'POST',
        'headers': {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        },
        'processData': false,
        'data': JSON.stringify(donateDetails)
      };

      $.ajax(settings).done(function (response) {
        document.getElementById('WaitImage').style.display = 'none';
        document.getElementById('paymentMessage').innerText = 'Thank you for your payment. A receipt will be emailed to you.';
      }).fail(function () {
        document.getElementById('WaitImage').style.display = 'none';
        document.getElementById('paymentMessage').innerText = 'Error occured. Please try later.';
      });
    } else {
      var settings = {
        'async': 'true',
        'crossDomain': 'true',
        'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/donate/subscribe',
        'method': 'POST',
        'headers': {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        },
        'processData': false,
        'data': JSON.stringify({
          'name': form.querySelector('input[name=cardholder-name]').value,
          'card': result.token.id,
          'plan': selectedlabel,
          'email': form.querySelector('input[name=cardholder-email]').value
        })
      };
      successElement.style.display = 'block';
      $.ajax(settings).done(function (response) {
        document.getElementById('WaitImage').style.display = 'none';
        document.getElementById('paymentMessage').innerText = 'Thank you for your payment. A receipt will be emailed to you.';
        console.log(response);
      }).fail(function () {
        document.getElementById('WaitImage').style.display = 'none';
        document.getElementById('paymentMessage').innerText = 'Error occured. Please try later.';
      });
    }
  } else if (result.error) {
    document.getElementById('WaitImage').style.display = 'none';
    document.getElementById('paymentMessage').innerText = JSON.parse(result.error).detail;
  }
}

card.on('change', function (event) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');
});

var formDonate = document.getElementById('openModal');
formDonate.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Test');
});

document.getElementById('donate').addEventListener('click', function (e) {
  e.preventDefault();

  document.getElementById('WaitNote').style.display = 'block';
  document.getElementById('WaitImage').style.display = 'block';

  if (document.getElementById('donate').innerText.toUpperCase() === 'DONATE NOW') {
    var form = document.getElementById('openModal');
    var extraDetails = {
      name: form.querySelector('input[name=cardholder-name]').value,
      receipt_email: form.querySelector('input[name=cardholder-email]').value
    };
    stripe.createToken(card, extraDetails).then(setOutcome);
    document.getElementById('donate').innerText = 'CLOSE';
  } else if (document.getElementById('donate').innerText.toUpperCase() === 'CLOSE') {
    initialiseForm();
    card.clear();
    // window.location.href = window.location.href.split('#')[0] + '#closeModal';
  }
});

function initialiseForm() {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  var form = document.getElementById('openModal');
  var formFields = document.getElementById('donateFields');
  formFields.classList.remove('hidden');
  form.querySelector('.success>p>span').textContent = '';
  form.querySelector('input[name=donation-amount]').value = '';
  form.querySelector('input[name=description]').value = '';
  form.querySelector('input[name=cardholder-name]').value = '';
  form.querySelector('input[name=cardholder-email]').value = '';
  document.querySelector('.error').value = '';
  document.getElementById('donate').innerText = 'Donate Now';
  errorElement.textContent = '';
}
//# sourceMappingURL=payment.js.map
