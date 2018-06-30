const CACHE_NAME = '1530360352311';

const URLS_TO_CAHCE = [
  '/stylesheets/stylesheet.css',
  '/images/header-bg.jpg',
  '/images/body-bg.jpg',
  'https://res.cloudinary.com/djgnze1er/image/upload/v1491932773/GitHub_Filled-500_sl3iek.png',
  'https://res.cloudinary.com/djgnze1er/image/upload/v1491932786/LinkedIn-528_kul9pm.png',
  'https://res.cloudinary.com/djgnze1er/image/upload/v1491932768/Twitter-528_iun6md.png',
  'https://res.cloudinary.com/djgnze1er/image/upload/v1491932765/YouTube_2-528_lyg6av.png',
  'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
];

// SW Registration
if ('serviceWorker' in navigator) {
  window.addEventListener ('load', function () {
    navigator.serviceWorker.register ('/serviceworker.js').then (
      function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      },
      function (err) {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}

// SW Lifecycle - install
self.addEventListener ('install', function (event) {
  event.waitUntil (
    caches.open(CACHE_NAME).then(
      function(cache) {
        return cache.addAll (URLS_TO_CAHCE);
      },
      function(err) {
        console.error ('Failed to open the cache');
      }
    )
  );
});

// SW Lifecycle - Fetch
self.addEventListener ('fetch', function (event) {
  event.respondWith (
    caches.match (event.request).then (function (response) {
      if (response) {
        console.log('Pulled in from cache');
        return response;
      }
      var requestToFetch = event.request.clone ();
      fetch (requestToFetch)
        .then (function (response) {
          if (
            !response &&
            response.status !== 200 &&
            response.type !== 'basic'
          ) {
            return response;
          }
          var responseToSend = response.clone ();
          caches.open (CACHE_NAME).then (function (cache) {
            cache.put (requestToFetch, responseToSend);
          });
          console.log('pulled in from network');
          return response;
        })
        .catch (function (err) {
          console.error('sw-fetch-stage failed to fetch a resorse ', err);
        });
    })
  );
});
