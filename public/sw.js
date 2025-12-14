// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png', // Adds a small icon in the status bar
    vibrate: [200, 100, 200, 100, 200, 100, 200], // Longer, aggressive vibration so she feels it
    tag: 'message-tag',     // Groups messages
    renotify: true,         // CRITICAL: Plays sound again even if she has unread messages
    requireInteraction: true // Keeps notification on screen until she clicks it
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
