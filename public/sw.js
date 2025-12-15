// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  // Default Icon (Pinterest style or whatever you want)
  const defaultIcon = 'https://cdn-icons-png.flaticon.com/512/145/145808.png';
  const finalIcon = data.icon || defaultIcon;

  const options = {
    body: data.body,
    icon: finalIcon,  
    badge: finalIcon, 
    tag: 'msg',
    renotify: true,
    requireInteraction: true,
    
    // CRITICAL: We save the Action instructions inside the notification
    data: {
        action: data.action, // 'open' or 'close'
        link: data.link      // The URL
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Retrieve the saved instructions
  const payload = event.notification.data;

  // LOGIC:
  if (payload.action === 'open' && payload.link) {
      // If mode is 'open', open the link!
      event.waitUntil(
        clients.openWindow(payload.link)
      );
  } else {
      // If mode is 'close' (Stealth), DO NOTHING.
  }
});
