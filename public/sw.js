// public/sw.js

self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  // 1. The Small Badge (Replaces the Bell 🔔)
  // This is a transparent outline. Android loves this.
  const instaBadge = 'https://cdn-icons-png.flaticon.com/512/87/87390.png';

  // 2. The Big Icon (Colorful)
  const instaIcon = 'https://cdn-icons-png.flaticon.com/512/174/174855.png';

  const options = {
    body: data.body,
    
    // Logic: Use your custom icon if you sent one, otherwise use Instagram
    icon: data.icon || instaIcon,  
    badge: instaBadge, 
    
    tag: 'msg',
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Instagram', options)
  );
});

// --- THE IMPORTANT PART ---
// This handles the click.
self.addEventListener('notificationclick', function(event) {
  // 1. Close the notification instantly.
  event.notification.close();

  // 2. DO NOTHING ELSE.
  // No clients.openWindow. No URLs. No focus.
  // The phone will stay exactly where it is.
});
