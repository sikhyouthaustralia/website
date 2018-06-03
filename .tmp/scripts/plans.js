'use strict';

var settings = {
  'async': true,
  'crossDomain': true,
  'url': 'https://expressroutes-sbyvubgxoj.now.sh/v1/donate/plans',
  'method': 'GET',
  'headers': {
    'cache-control': 'no-cache'
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
  console.log(JSON.parse(response));
  var subscriptions = JSON.parse(response).detail.map(function (plan) {

    var retVal = {
      id: plan.id,
      currency: plan.currency,
      amount: plan.amount / 100,
      interval: plan.interval
    };
    console.log(retVal);
    return retVal;
  });

  var compiledsubscriptions = Handlebars.templates.subscriptions;
  console.log(compiledsubscriptions(subscriptions));
  $('#subscriptions').html(compiledsubscriptions(subscriptions));
});
//# sourceMappingURL=plans.js.map
