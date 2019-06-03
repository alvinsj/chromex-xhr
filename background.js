chrome.runtime.onConnect.addListener(function(port) {
  if (port.name !== 'xhr-background') return;

  port.onMessage.addListener(function(msg) {
    port.postMessage({ echo: msg });
  });
});
