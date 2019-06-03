chrome.devtools.panels.create('XHR', 'XHR.png', 'XHR.html', function(panel) {
  // code invoked on panel creation

  chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== 'xhr-devtools') return;
    port.postMessage({ info: 'xhr-devtools is connected' });

    chrome.devtools.network.getHAR(function(har) {
      chrome.storage.local.set({ xhr: har.entries });

      port.postMessage({ getHAR: har });
    });

    chrome.devtools.network.onRequestFinished.addListener(args => {
      port.postMessage({ onRequestFinished: args });
    });
  });
});
