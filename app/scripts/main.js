'use strict';
$(function() {
  $(window).on('scroll', function(){
    var $nav = $('#header-index');
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    var $logo = $('#logo');
    $logo.toggleClass('navbar-brand-scroll', $(this).scrollTop() > $nav.height());
  });
});

Handlebars.registerHelper('each_upto', function(ary, max, options) {
  console.log('Upto ' + ary.length);
  if (!ary || ary.length == 0) {
    return options.inverse(this);
  }

  var result = [];
  for (var i = 0; i <= max; ++i) {
    console.log(i);
    console.log(ary[i]);
    result.push(options.fn(ary[i]));
    return result.join('');
  }
});

validate.init();

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'data/news.json',
    dataType: 'json',
    success: function(jsonData) {
      console.log(jsonData);
      var newsData = jsonData.map(function(news) {
        console.log(news.fields);
        if (news.fields.name !== '') {
          var retVal = {
            name: news.fields.name,
            url: news.fields.link,
            image: news.fields.image
          };
          return retVal;
        }

      });
      console.log(newsData);
      var compilednews = Handlebars.templates.news;
      $('#news').append(compilednews(newsData));
    },
    error: function(status) {
      console.log(status);
    }
  });

  $.ajax({
    type: 'GET',
    url: 'data/events.json',
    dataType: 'json',
    success: function(jsonData) {
      console.log(jsonData);
      var eventData = jsonData.map(function(events) {
        console.log(events.fields);
        if (events.fields.name !== '') {
          var retVal = {
            name: events.fields.name,
            url: events.fields.link,
            image: events.fields.image
          };
          return retVal;
        }

      });
      console.log(eventData);
      var compiledevents = Handlebars.templates.news;
      console.log(compiledevents(eventData));
      $('#events').append(compiledevents(eventData));
    },
    error: function(status) {}
  });

  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/donate/plans',
    'method': 'GET',
    'headers': {
      'cache-control': 'no-cache'
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    console.log(JSON.parse(response));
    var subscriptions = JSON.parse(response).detail.map(function(plan) {

      var retVal = {
        id: plan.id,
        currency: plan.currency,
        amount: plan.amount/100,
        interval: plan.interval
      };
      console.log(retVal);
      return retVal;
    });

    var compiledsubscriptions = Handlebars.templates.subscriptions;
    console.log(compiledsubscriptions(subscriptions));
    $('#subscriptions').append(compiledsubscriptions(subscriptions));
  });

  // $('input[list]').each(function () {
  // 		var availableTags = $('#' + $(this).attr('list')).find('option').map(function () {
  //       console.log(this.value);
  // 			return this.value;
  // 		}).get();
  // 		$(this).autocomplete({ source: availableTags });
  // 	});

  $('.single-item-rtl').slick({
    autoplay: true,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: 'linear',
    pauseOnFocus: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: 'unslick'
      // instead of a settings object
    ]
  });

  $('.initiatives').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/events/syaevents',
    'method': 'GET',
    'headers': {
      'cache-control': 'no-cache'
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
  });

  var form = $('#mailchimp');


  $('#subscribe').bind('click', function(event) {
    if (event) event.preventDefault();
    register(form);
  });

  document.getElementById('useremail').addEventListener('blur', function(event) {
    //Call mailchimp to check if email is taken.
    console.log(this.value);
    if ($('#useremail').val() !== '')
    {
      $('#mailchimpchecksubscription').remove();
      $('#loader').toggle('slow');
      var value = $('#useremail').val();
      var hash = md5(value);

      var settings = {
        'async': true,
        'crossDomain': true,
        'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/mail/checksubscription',
        'method': 'POST',
        'headers': {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
          'postman-token': '19a03d4b-cd99-2605-b857-bcbc21451915'
        },
        'processData': false,
        'data': JSON.stringify({
          'subscriptionId': hash
        })
      };

      $.ajax(settings)
      .done(function(response) {
        $('#useremail').parent().append('<div class="error-message" id="mailchimpchecksubscription" style="display: block; visibility: visible;">' + JSON.parse(response).detail + '</div>');
      })
      .fail(function(response) {
        $('#useremail').parent().append('<div class="error-message" id="mailchimpchecksubscription" style="display: block; visibility: visible;">Email address is avaialable, please subscribe (click the subscribe button below)</div>');
      })
      .always(function(response) {
        console.log(response);
        $('#subscribe').toggleClass('not-active');
        $('#loader').toggle('slow');
      });
    }
  }, true);

  $('select').blur(function() {
    console.log($('select').val());
    if ($('select').val()  === 'Once of') {
        $('#donationAmount').toggleClass('not-active');
    }
  });

  var style = {
    base: {
      color: 'black',
      fontSize: '20px',
      lineHeight: '48px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#ccc',
      },
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238',
      },
    },
  };

  var stripe = Stripe('pk_live_O5tMiDSUfGsE7ISKk2jt3oSP');
  var elements = stripe.elements();

  var card = elements.create('card', {
    style: style
  });
  card.mount('#card-element');

  // var promise = stripe.createToken(card);
  // promise.then(function(result) {
  //   console.log(result);
  // });
  //Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
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
    var progresscontainer = document.getElementById('progress');
    var lineProgressBar = Spinner().Colour('#f79f33');
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

        $.ajax(settings).done(function(response) {
          document.getElementById('WaitImage').style.display='none';
          document.getElementById('paymentMessage').innerText = 'Thank you for your payment. A receipt will be emailed to you.';
        }).fail(function() {
          document.getElementById('WaitImage').style.display='none';
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
            'plan': selectedlabel
          })
        };
        lineProgressBar(progresscontainer);
        lineProgressBar.Animate(1.0);
        successElement.style.display = 'block';
        $.ajax(settings).done(function(response) {
          document.getElementById('WaitImage').style.display='none';
          document.getElementById('paymentMessage').innerText = 'Thank you for your payment. A receipt will be emailed to you.';
          console.log(response);
        }).fail(function() {
          document.getElementById('WaitImage').style.display='none';
          document.getElementById('paymentMessage').innerText = 'Error occured. Please try later.';
        });

      }
    } else if (result.error) {
      document.getElementById('WaitImage').style.display='none';
      document.getElementById('paymentMessage').innerText = JSON.parse(result.error).detail;
    }
  }

  card.on('change', function(event) {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    successElement.classList.remove('visible');
    errorElement.classList.remove('visible');
  });

  var formDonate = document.getElementById('openModal');
  formDonate.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Test');
  });

  document.getElementById('close').addEventListener('click', function(e) {
    e.preventDefault();
    card.clear();
    initialiseForm();
    // window.location.href = window.location.href.split('#')[0] + '#closeModal';
  });

  document.getElementById('donate').addEventListener('click', function(e) {
    e.preventDefault();

    document.getElementById('WaitNote').style.display='block';
    document.getElementById('WaitImage').style.display='block';

    if (document.getElementById('donate').innerText.toUpperCase() === 'DONATE NOW') {
      var form = document.getElementById('openModal');
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value,
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
      document.getElementById('donate').innerText = 'CLOSE';
    } else if ((document.getElementById('donate').innerText.toUpperCase() === 'CLOSE')) {
      initialiseForm();
      card.clear();
      // window.location.href = window.location.href.split('#')[0] + '#closeModal';
    }

  });


  function initialiseForm() {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    var progresscontainer = document.getElementById('progress');
    var lineProgressBar = Spinner().Colour('#f79f33');
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

  function register(form) {

    var formdata = $('#mailchimp').serializeArray();
    var mailchimp = {
      email_address: formdata[1].value,
      status: 'subscribed',
      merge_fields: {
        FNAME: formdata[0].value,
        LNAME: formdata[0].value
      }
    };
    var settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/mail/register',
      'method': 'POST',
      'headers': {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      'processData': false,
      'data': JSON.stringify(mailchimp)
    };

    $.ajax(settings).done(function(response) {
      $('#subscribe').parent().append('<div class="error-message" style="display: block; visibility: visible;">' + JSON.parse(response).detail + '</div>');
      console.log(response);
    });
  }


});
