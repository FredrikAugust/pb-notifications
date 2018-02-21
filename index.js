/**
 *
 * Main file; send a notification when you get a notification on pushbullet.
 *
 * Fredrik A. Madsen-Malmo - MIT License
 *
 */

const WebSocket = require('websocket');

const API_KEY = process.env.PUSHBULLET_API_KEY;

const conn = new WebSocket(`wss://stream.pushbullet.com/websocket/${API_KEY}`);

conn.on('open', () => {
  console.log('Connection established.');
});

conn.on('message', (data) => {
  console.log(`Received data: ${data}`);
});
