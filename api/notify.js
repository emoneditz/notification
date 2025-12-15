// api/notify.js
const webPush = require('web-push');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 1. Extract 'title' from the request
    const { subscription, message, icon, title } = req.body;

    const publicVapidKey = 'BJYb96vvdeZ6Bp3eZ6XNnVjWVTuli0o-6pdIp4BU1tq4w-u8miNBTXd6WleIfBdSTH4HsMcRHwL9_UoMbQXDLK4';
    const privateVapidKey = 'ctxNre4V43fDkoKERiAQiSf5yjyFCIME5yNw9ctDUPU';

    webPush.setVapidDetails(
      'mailto:test@test.com',
      publicVapidKey,
      privateVapidKey
    );

    // 2. Logic: If title is empty, use "New Message"
    const finalTitle = title || 'New Message';

    const payload = JSON.stringify({ 
      title: finalTitle, 
      body: message,
      icon: icon 
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
