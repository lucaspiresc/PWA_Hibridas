self.addEventListener('install', function(event){
  console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event){
  console.log(event.request.url);
  let resposta = caches.open('pwa-v1').then(function(cache){
    return cache.match(event.request).then(function(recurso){
      if(recurso){
		console.log("${event.request.url} da cache");
        return recurso;
      }

	  console.log("${event.request.url} da web");
      return fetch(event.request).then(function(recurso){
        cache.put(event.request,recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});