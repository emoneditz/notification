// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  // 1. The Big Picture (Right side) - Colorful
  // If you don't send an icon, it defaults to the Colorful Instagram Logo
  const bigIcon = data.icon || 'https://cdn-icons-png.flaticon.com/512/174/174855.png';

  // 2. The Small Badge (Left side / Status Bar) - THE FIX 🔧
  // This URL is a special "Outline" version of the logo.
  // It works perfectly in the status bar without turning into a white block.
  const smallBadge = 'https://cdn-icons-png.flaticon.com/512/87/87390.png';

  const options = {
    body: data.body,
    icon: bigIcon,  
    badge: smallBadge, // <--- This changes the Bell 🔔 to the Insta Icon!
    tag: 'msg',
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    // I set the default title to 'Instagram' so it looks real
    self.registration.showNotification(data.title || 'Instagram', options)
  );
});

// --- CLICK BEHAVIOR: DO NOTHING ---
self.addEventListener('notificationclick', function(event) {
  // Just close the notification.
  // We removed the 'clients.openWindow' line, so the site will NOT open.
  event.notification.close();
});
