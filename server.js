'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (conn) => {
  console.log(wss.clients)
  conn.on('message', function(data) {
      wss.clients.forEach(function each(client) {
          let response = {
            clients: wss.clients,
            data
          }
          client.send(JSON.stringify(response));
      });
  });
  conn.on('close', () => console.log('Client disconnected'));
});
