'use strict';

(function donate() {

  var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  function registerElements(elements, formDonateName) {
    var formClass = '.' + 'donate';
    var formDonate = document.querySelector(formClass);

    var form = formDonate.querySelector('form');
    var resetButton = formDonate.querySelector('a.reset');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');

    function enableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.removeAttribute('disabled');
        }
      );
    }

    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.setAttribute('disabled', 'true');
        }
      );
    }

    // Listen for errors from each Element, and show error messages in the UI.
    elements.forEach(function(element) {
      element.on('change', function(event) {
        if (event.error) {
          error.classList.add('visible');
          errorMessage.innerText = event.error.message;
        } else {
          error.classList.remove('visible');
        }
      });
    });

    // Listen on the form's 'submit' handler...
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show a loading screen...
      formDonate.classList.add('submitting');

      // Disable all inputs.
      disableInputs();

      // Gather additional customer data we may have collected in our form.
      var name = form.querySelector('#' + formDonateName + '-name');
      var address1 = form.querySelector('#' + formDonateName + '-address');
      var city = form.querySelector('#' + formDonateName + '-city');
      var state = form.querySelector('#' + formDonateName + '-state');
      var zip = form.querySelector('#' + formDonateName + '-zip');
      var additionalData = {
        name: name ? name.value : undefined,
        address_line1: address1 ? address1.value : undefined,
        address_city: city ? city.value : undefined,
        address_state: state ? state.value : undefined,
        address_zip: zip ? zip.value : undefined,
      };

      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      stripe.createToken(elements[0], additionalData).then(function(result) {
        // Stop loading!
        formDonate.classList.remove('submitting');

        if (result.token) {
          // If we received a token, show the token ID.
          formDonate.querySelector('.token').innerText = result.token.id;
          formDonate.classList.add('submitted');
        } else {
          // Otherwise, un-disable inputs.
          enableInputs();
        }
      });
    });

    resetButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Resetting the form (instead of setting the value to `''` for each input)
      // helps us clear webkit autofill styles.
      form.reset();

      // Clear each Element.
      elements.forEach(function(element) {
        element.clear();
      });

      // Reset error state as well.
      error.classList.remove('visible');

      // Resetting the form does not un-disable inputs, so we need to do it separately:
      enableInputs();
      formDonate.classList.remove('submitted');
    });
  }

})();
