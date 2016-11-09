var rocky = require('rocky');
var stopData = false;

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  //var d = new Date();

  // Set the text color
  ctx.fillStyle = 'white';

  // Display the stop data
  if (stopData) {
    ctx.textAlign = 'left';
    ctx.fillText(stopData.stopDesc, 0, 0, w);
    var lines = [];
    for (var i = 0; i < stopData.list.length; i++) {
      var estTime = stopData.list[i].est;
      var schedTime = stopData.list[i].sched;
      var minutes = stopData.list[i].estMin;
      lines.push(minutes + ' mins');
      lines.push('    sched: ' + schedTime);
      lines.push('    est:   ' + estTime);
      lines.push('');
    }
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 0, (i+1) * 14, w);
    }
  } else {
    ctx.textAlign = 'center';
    ctx.fillText('loading...', w / 2, h / 2, w);  
  }
  
});

// refresh data every minute
rocky.on('minutechange', function(event) {
  console.log('fetching update...');
  rocky.postMessage({'fetch': true});
});

rocky.on('message', function(event) {
  //result = event.data;
  //console.log(JSON.stringify(event.data));
  stopData = event.data;
  rocky.requestDraw();
});