chrome.storage.local.get(['xhr'], function(result) {
  console.log('XHR currently is ', result);
});

var port = chrome.runtime.connect({ name: 'xhr-devtools' });
port.onMessage.addListener(function(msg) {
  console.log('devtools.onMessage', msg);

  switch (msg) {
    case msg.getHAR:
      var requests = {};
      msg.getHAR.entries.forEach(ent => {
        const id = ent.connection;
        requests[id].id = ent.connection;
        requests[id].url = ent.request.url;
        requests[id].querString = ent.request.queryString;
        requests[id].response = ent.response && ent.response.status;
        requests[id].responseTime = ent.response && ent.response.time;
      });

      console.log('devtools.onMessage', 'getHAR', requests);
      break;

    case msg.onRequestFinished:
      var request;
      request.id = ent.connection;
      request.url = ent.request.url;
      request.querString = ent.request.queryString;
      request.response = ent.response && ent.response.status;
      request.responseTime = ent.response && ent.response.time;

      console.log('devtools.onMessage', 'onRequestFinished', request);
      break;
  }
});
