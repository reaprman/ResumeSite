if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js').then(function() {
        console.log('Sevice Worker: Registered')
    }).catch(function(err){
        console.log('Service Worker: Registration Failuer ' + err);
    });
}