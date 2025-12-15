// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  // --- 1. THE BADGE DICTIONARY ---
  const smartBadges = {
      // Instagram
      'https://cdn-icons-png.flaticon.com/512/174/174855.png': 'https://cdn-icons-png.flaticon.com/512/87/87390.png',
      
      // WhatsApp
      'https://cdn-icons-png.flaticon.com/512/733/733585.png': 'https://cdn-icons-png.flaticon.com/512/152/152740.png',
      
      // Pinterest (FIXED) 🔴
      // Key = The RED Circle P (Old one you liked)
      // Value = The Link you just gave me (49440.png)
      'https://cdn-icons-png.flaticon.com/512/145/145808.png': 'https://cdn-icons-png.flaticon.com/512/49/49440.png',
      
      // Facebook
      'https://cdn-icons-png.flaticon.com/512/124/124010.png': 'https://cdn-icons-png.flaticon.com/512/20/20673.png',
      
      // Messenger (Reverted to Gradient) 🔵
      'https://cdn-icons-png.flaticon.com/512/5968/5968771.png': 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png'
  };

  const sentIcon = data.icon || 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png';
  
  // Auto-Swap Logic
  const finalBadge = smartBadges[sentIcon] || sentIcon;

  const options = {
    body: data.body,
    icon: sentIcon,   
    badge: finalBadge, 
    tag: 'msg',
    renotify: true,
    requireInteraction: true,
    data: {
        action: data.action,
        link: data.link
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Message', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const payload = event.notification.data;
  if (payload.action === 'open' && payload.link) {
      event.waitUntil(clients.openWindow(payload.link));
  }
});
