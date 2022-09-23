require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: process.env.APP_URL,
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 4000;
const HTTP_SUCESS_CODE = 200;

app.use(express.json());

app.get('/websocket', (_req, res) => {
  try {
    res.status(HTTP_SUCESS_CODE).json({ message: 'sucess', content: '/' });
  } catch (error) {
    res.status(404).json({ message: 'sucess', content: '/' });
  }
});

app.get('/websocket/healthcheck', (_req, res) => {
  res
    .status(HTTP_SUCESS_CODE)
    .json({ message: 'sucess', content: '/healthcheck' });
});

app.post('/websocket/status', (req, res) => {
  const { id, status } = req.body;

  try {
    io.emit('confirmTransaction', { ...req.body, id, status });
    res.status(HTTP_SUCESS_CODE).json({ message: 'sucess' });
  } catch (error) {
    res.status(404).json({ message: 'sucess', content: '/' });
  }
});

server.listen(PORT, () => {
  console.log(`[HTTP] Listen => Server is running at port ${PORT}`);
});
