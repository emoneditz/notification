// api/notify.js
const webPush = require('web-push');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subscription, message } = req.body;

    // YOUR KEYS
    const publicVapidKey = 'BJYb96vvdeZ6Bp3eZ6XNnVjWVTuli0o-6pdIp4BU1tq4w-u8miNBTXd6WleIfBdSTH4HsMcRHwL9_UoMbQXDLK4';
    const privateVapidKey = 'ctxNre4V43fDkoKERiAQiSf5yjyFCIME5yNw9ctDUPU';

    webPush.setVapidDetails(
      'mailto:test@test.com',
      publicVapidKey,
      privateVapidKey
    );

    const payload = JSON.stringify({ 
      title: 'New Message', 
      body: message 
    });

    try {
      await webPush.sendNotification(subscription, payload);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send' });
    }
  } else {
    res.status(405).end();
  }
}
