console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
// $('.parallax-mirror').parallax({imageSrc: './images/Home_Banner_Camps.jpg'});
//
// var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
//
// 	// build scenes
// 	new ScrollMagic.Scene({triggerElement: "#parallax1"})
// 					.setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
// 					.addIndicators()
// 					.addTo(controller);

// new ScrollMagic.Scene({triggerElement: "#parallax2"})
// 				.setTween("#parallax2 > div", {y: "80%", ease: Linear.easeNone})
// 				.addIndicators()
// 				.addTo(controller);
//
// new ScrollMagic.Scene({triggerElement: "#parallax3"})
// 				.setTween("#parallax3 > div", {y: "80%", ease: Linear.easeNone})
// 				.addIndicators()
// 				.addTo(controller);
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
    // settings: "unslick"
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
