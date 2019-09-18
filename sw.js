(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var appCache = 'myResume-cache';
var projetImgsCache = 'myResume-project-imgs';

self.addEventListener('install', function (event) {
  event.waitUntil(
  caches.open(appCache).then(function (cache) {
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
    'https://unpkg.com/ionicons@4.4.7/dist/css/ionicons.min.css']);


  })["catch"](function (err) {
    console.log("Cache failed to load: ".concat(err));
  }));

});

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);

  // work required to check request path name
  if (requestUrl.origin == location.origin) {
    if (requestUrl.pathname.startsWith('/app/img/')) {
      event.respondWith(servePhoto(event.request));
      return;
    }
  }
  event.respondWith(
  caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));

});

function servePhoto(request) {
  var storageUrl = '';
  if (request.url.includes("webp")) {
    storageUrl = request.url.replace(/-\d+x\.webp$/, '');
  } else {
    storageUrl = request.url; // .replace(/-\d+x\.jpg$/, '');
  }

  return caches.open(projetImgsCache).then(function (cache) {
    return cache.match(storageUrl).then(function (response) {
      if (response) return response;

      return fetch(request).then(function (netwrkResponse) {
        cache.put(storageUrl, netwrkResponse.clone());
        return netwrkResponse;
      });
    });
  });

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvc3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7YUNBQSxJQUFJLFFBQVEsR0FBRyxnQkFBZjtBQUNBLElBQUksZUFBZSxHQUFHLHVCQUF0Qjs7QUFFQSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUMsVUFBUyxLQUFULEVBQWdCO0FBQzdDLEVBQUEsS0FBSyxDQUFDLFNBQU47QUFDSSxFQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixFQUFzQixJQUF0QixDQUEyQixVQUFTLEtBQVQsRUFBZ0I7QUFDdkMsV0FBTyxLQUFLLENBQUMsTUFBTixDQUFhO0FBQ2hCLE9BRGdCO0FBRWhCLGlCQUZnQjtBQUdoQix3QkFIZ0I7QUFJaEIsa0NBSmdCO0FBS2hCLDhCQUxnQjtBQU1oQixnQ0FOZ0I7QUFPaEIsWUFQZ0I7QUFRaEIsdUJBUmdCO0FBU2hCLDRDQVRnQjtBQVVoQiw2Q0FWZ0I7QUFXaEIsZ0VBWGdCLENBQWIsQ0FBUDs7O0FBY0gsR0FmRCxXQWVTLFVBQVMsR0FBVCxFQUFjO0FBQ25CLElBQUEsT0FBTyxDQUFDLEdBQVIsaUNBQXFDLEdBQXJDO0FBQ0gsR0FqQkQsQ0FESjs7QUFvQkgsQ0FyQkQ7O0FBdUJBLElBQUksQ0FBQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFTLEtBQVQsRUFBZ0I7QUFDM0MsTUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFKLENBQVEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUF0QixDQUFqQjs7QUFFQTtBQUNBLE1BQUcsVUFBVSxDQUFDLE1BQVgsSUFBcUIsUUFBUSxDQUFDLE1BQWpDLEVBQXlDO0FBQ3JDLFFBQUcsVUFBVSxDQUFDLFFBQVgsQ0FBb0IsVUFBcEIsQ0FBK0IsV0FBL0IsQ0FBSCxFQUErQztBQUMzQyxNQUFBLEtBQUssQ0FBQyxXQUFOLENBQWtCLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBUCxDQUE1QjtBQUNBO0FBQ0g7QUFDSjtBQUNELEVBQUEsS0FBSyxDQUFDLFdBQU47QUFDSSxFQUFBLE1BQU0sQ0FBQyxLQUFQLENBQWEsS0FBSyxDQUFDLE9BQW5CLEVBQTRCLElBQTVCLENBQWlDLFVBQVMsUUFBVCxFQUFtQjtBQUNoRCxXQUFPLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQVAsQ0FBeEI7QUFDSCxHQUZELENBREo7O0FBS0gsQ0FmRDs7QUFpQkEsU0FBUyxVQUFULENBQW9CLE9BQXBCLEVBQTZCO0FBQ3pCLE1BQUksVUFBVSxHQUFHLEVBQWpCO0FBQ0EsTUFBRyxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBSCxFQUFnQztBQUM1QixJQUFBLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosQ0FBb0IsY0FBcEIsRUFBb0MsRUFBcEMsQ0FBYjtBQUNILEdBRkQsTUFFSztBQUNELElBQUEsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFyQixDQURDLENBQ21DO0FBQ3ZDOztBQUVELFNBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxlQUFaLEVBQTZCLElBQTdCLENBQWtDLFVBQVMsS0FBVCxFQUFnQjtBQUNyRCxXQUFPLEtBQUssQ0FBQyxLQUFOLENBQVksVUFBWixFQUF3QixJQUF4QixDQUE2QixVQUFTLFFBQVQsRUFBbUI7QUFDbkQsVUFBSSxRQUFKLEVBQWMsT0FBTyxRQUFQOztBQUVkLGFBQU8sS0FBSyxDQUFDLE9BQUQsQ0FBTCxDQUFlLElBQWYsQ0FBb0IsVUFBUyxjQUFULEVBQXlCO0FBQ2hELFFBQUEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLGNBQWMsQ0FBQyxLQUFmLEVBQXRCO0FBQ0EsZUFBTyxjQUFQO0FBQ0gsT0FITSxDQUFQO0FBSUgsS0FQTSxDQUFQO0FBUUgsR0FUTSxDQUFQOztBQVdIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IGFwcENhY2hlID0gJ215UmVzdW1lLWNhY2hlJztcclxubGV0IHByb2pldEltZ3NDYWNoZSA9ICdteVJlc3VtZS1wcm9qZWN0LWltZ3MnO1xyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LndhaXRVbnRpbChcclxuICAgICAgICBjYWNoZXMub3BlbihhcHBDYWNoZSkudGhlbihmdW5jdGlvbihjYWNoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKFtcclxuICAgICAgICAgICAgICAgICcvJyxcclxuICAgICAgICAgICAgICAgICcvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAnL2FwcC9jc3Mvc3R5bGUuY3NzJyxcclxuICAgICAgICAgICAgICAgICcvYXBwL2Nzcy9pbWcvcHJvZmlsZS1waWMuanBnJyxcclxuICAgICAgICAgICAgICAgICcvdmVuZG9ycy9jc3MvYW5pbWF0ZS5jc3MnLFxyXG4gICAgICAgICAgICAgICAgJy92ZW5kb3JzL2Nzcy9ub3JtYWxpemUuY3NzJyxcclxuICAgICAgICAgICAgICAgICcvc3cuanMnLFxyXG4gICAgICAgICAgICAgICAgJy9hcHAvanMvc2NyaXB0LmpzJyxcclxuICAgICAgICAgICAgICAgICdodHRwczovL3VucGtnLmNvbS9hb3NAbmV4dC9kaXN0L2Fvcy5qcycsXHJcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91bnBrZy5jb20vYW9zQG5leHQvZGlzdC9hb3MuY3NzJyxcclxuICAgICAgICAgICAgICAgICdodHRwczovL3VucGtnLmNvbS9pb25pY29uc0A0LjQuNy9kaXN0L2Nzcy9pb25pY29ucy5taW4uY3NzJ1xyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDYWNoZSBmYWlsZWQgdG8gbG9hZDogJHtlcnJ9YCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbn0pO1xyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBsZXQgcmVxdWVzdFVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xyXG5cclxuICAgIC8vIHdvcmsgcmVxdWlyZWQgdG8gY2hlY2sgcmVxdWVzdCBwYXRoIG5hbWVcclxuICAgIGlmKHJlcXVlc3RVcmwub3JpZ2luID09IGxvY2F0aW9uLm9yaWdpbikge1xyXG4gICAgICAgIGlmKHJlcXVlc3RVcmwucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwcC9pbWcvJykpe1xyXG4gICAgICAgICAgICBldmVudC5yZXNwb25kV2l0aChzZXJ2ZVBob3RvKGV2ZW50LnJlcXVlc3QpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV2ZW50LnJlc3BvbmRXaXRoKFxyXG4gICAgICAgIGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZSB8fCBmZXRjaChldmVudC5yZXF1ZXN0KTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXJ2ZVBob3RvKHJlcXVlc3QpIHtcclxuICAgIGxldCBzdG9yYWdlVXJsID0gJyc7XHJcbiAgICBpZihyZXF1ZXN0LnVybC5pbmNsdWRlcyhcIndlYnBcIikpe1xyXG4gICAgICAgIHN0b3JhZ2VVcmwgPSByZXF1ZXN0LnVybC5yZXBsYWNlKC8tXFxkK3hcXC53ZWJwJC8sICcnKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgc3RvcmFnZVVybCA9IHJlcXVlc3QudXJsICAgICAgICAgICAgLy8gLnJlcGxhY2UoLy1cXGQreFxcLmpwZyQvLCAnJyk7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgcmV0dXJuIGNhY2hlcy5vcGVuKHByb2pldEltZ3NDYWNoZSkudGhlbihmdW5jdGlvbihjYWNoZSkge1xyXG4gICAgICAgIHJldHVybiBjYWNoZS5tYXRjaChzdG9yYWdlVXJsKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24obmV0d3JrUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlLnB1dChzdG9yYWdlVXJsLCBuZXR3cmtSZXNwb25zZS5jbG9uZSgpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXR3cmtSZXNwb25zZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0iXX0=
