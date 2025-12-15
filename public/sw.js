// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  // Default Bell Icon
  const defaultIcon = 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png';

  const options = {
    body: data.body,
    icon: data.icon || defaultIcon, 
    badge: defaultIcon, 
    tag: 'msg',
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    // 3. Use the title sent from Dashboard (or the default set in Backend)
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
