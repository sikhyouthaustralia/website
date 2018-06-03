//Using Mike Bostock's Towards Reusable Charts Pattern
'use strict';

function Spinner() {

  // All options that should be accessible to caller
  var colour = '#FFEA82';
  var animate = 1.0;
  var bar;

  function Line(selection) {

    var container = selection;

    container.setAttribute('style', 'margin: 20px; width: 150px;height: 150px; position: relative;');

    bar = new ProgressBar.Circle(container, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#aaa',
        width: 1
      },
      to: {
        color: '#f79f33',
        width: 4
      },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        switch (value) {
          case 0:
            circle.setText('');
            break;
          case 100:
            circle.setText('Thank You');
            break;
          default:
            circle.setText(value);
        }
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    //bar.text.style.fontSize = '2rem';

    bar.animate(animate); // Number from 0.0 to 1.0

  }

  Line.Colour = function(value) {
    if (!arguments.length) {
      return colour;
    }
    colour = value;
    return Line;
  };

  Line.Animate = function(value) {
    if (!arguments.length) {
      //bar.animate(value);
      return animate;
    }
    animate = value;
    bar.animate(animate);
    return Line;
  };

  return Line;
}
