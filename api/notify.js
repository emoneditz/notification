// api/notify.js
const webPush = require('web-push');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 1. Get Action and Link from Dashboard
    const { subscription, message, icon, title, action, link } = req.body;

    const publicVapidKey = 'BJYb96vvdeZ6Bp3eZ6XNnVjWVTuli0o-6pdIp4BU1tq4w-u8miNBTXd6WleIfBdSTH4HsMcRHwL9_UoMbQXDLK4';
    const privateVapidKey = 'ctxNre4V43fDkoKERiAQiSf5yjyFCIME5yNw9ctDUPU';

    webPush.setVapidDetails(
      'mailto:test@test.com',
      publicVapidKey,
      privateVapidKey
    );

    // 2. Send everything to the phone
    const payload = JSON.stringify({ 
      title: title || 'New Message', 
      body: message,
      icon: icon,
      action: action, // 'close' or 'open'
      link: link      // The website to open
    });

    const options = {
      headers: { 'Urgency': 'high' }
    };

    try {
      await webPush.sendNotification(subscription, payload, options);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed' });
    }
  } else {
    res.status(405).end();
  }
}
