#!/usr/bin/node
/**
 *
 * Main file; send a notification when you get a notification on pushbullet.
 *
 * Fredrik A. Madsen-Malmo - MIT License
 *
 */

const WebSocket = require('ws');
const notifier = require('node-notifier');

const API_KEY = process.env.PUSHBULLET_API_KEY;

const conn = new WebSocket(`wss://stream.pushbullet.com/websocket/${API_KEY}`);

conn.on('open', () => {
  console.log('Connection established.');
});

conn.on('message', (raw) => {
  const data = JSON.parse(raw);

  console.log(`Received message of type ${data.type}`);

  if (data["type"] != 'push') {
    return;
  }

  console.log(`Dispatching notification: ${data.push.application_name} | ${data.push.title}`);

  notifier.notify({
    title: `${data.push.application_name} | ${data.push.title}`,
    message: data.push.body,
    icon: 'phone'
  });
});

conn.on('close', () => {
  notifier.notify({
    title: 'Pushbullet service stopped',
    message: 'The pushbullet notification service has stopped. Please restart it if you wish to receive notifications from other pushbullet devices.'
  });
});
