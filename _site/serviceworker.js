if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      debugger;
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      debugger;
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}