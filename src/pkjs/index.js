var fetchInterval = 1000 * 60;
var stopId = 4983;
//var dummyResult = '{"status":"OK", "stopDesc":"HART & FAR WEST", "list":[{ "route":"661", "dir":"I", "name":"661-FW Far West/UT-IB", "type":"1", "est":"09:23 AM", "estMin":2, "real":true, "vId":"2502", "block":"661-08", "sched":"09:23 AM", "latLng":"[ 30.351601, -97.756714]", "poll":"09:19 AM" }]}';

function getRequestUrl(stopId) {
  return 'http://capmetro.org/planner/s_nextbus2.asp?stopid=' + stopId + '&opt=2&_=' + Date.now();
}

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}

Pebble.on('message', function(event) {
  console.log('pebble received fetch');
  if (event.data.fetch) {
    console.log('pebble fetching...');
    var url = getRequestUrl(stopId);
    request(url, 'GET', function(data) {
      console.log('sending data to watch');
      Pebble.postMessage(JSON.parse(data));
    });
  }
});
