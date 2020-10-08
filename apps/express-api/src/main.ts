/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-api!' });
});

const port = Number(process.env.PORT) || 3333;
const hostname = process.env.HOSTNAME || 'localhost';
const ssl = process.env.SSL === 'true' ? true : false;
let server = null;

if (ssl) {
  const keyPath = process.env.SSL_KEY_PATH || '';
  const certPath = process.env.SSL_CERT_PATH || '';
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, keyPath)),
    cert: fs.readFileSync(path.join(__dirname, certPath)),
  };
  server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Listening at https://${hostname}:${port}/api`);
  });
} else {
  server = app.listen(port, () => {
    console.log(`Listening at http://${hostname}:${port}/api`);
  });
}

server.on('error', console.error);
