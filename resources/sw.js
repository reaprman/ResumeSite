let appCache = 'myResume-cache';
let projetImgsCache = 'myResume-project-imgs';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(appCache).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/app/css/style.css',
                '/app/css/img/profile-pic.jpg',
                '/vendors/css/animate.css',
                '/vendors/css/normalize.css',
                '/sw.js',
                '/app/js/script.js',
                'https://unpkg.com/aos@next/dist/aos.js',
                'https://unpkg.com/aos@next/dist/aos.css',
                'https://unpkg.com/ionicons@4.4.7/dist/css/ionicons.min.css'

            ]);
        }).catch(function(err) {
            console.log(`Cache failed to load: ${err}`);
        })
    );
});

self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);

    // work required to check request path name
    if(requestUrl.origin == location.origin) {
        if(requestUrl.pathname.startsWith('/app/img/')){
            event.respondWith(servePhoto(event.request));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

function servePhoto(request) {
    let storageUrl = '';
    if(request.url.includes("webp")){
        storageUrl = request.url.replace(/-\d+x\.webp$/, '')
    }else{
        storageUrl = request.url            // .replace(/-\d+x\.jpg$/, '');
    }   

    return caches.open(projetImgsCache).then(function(cache) {
        return cache.match(storageUrl).then(function(response) {
            if (response) return response;

            return fetch(request).then(function(netwrkResponse) {
                cache.put(storageUrl, netwrkResponse.clone());
                return netwrkResponse;
            });
        });
    });

}