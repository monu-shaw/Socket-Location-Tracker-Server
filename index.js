const app = require('express')();

const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 1e8,
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat', (payload) => {
    //console.log("What is payload", payload);
    io.emit('chat', payload);
  });
  socket.on('load', () => {
    //console.log("What is payload", payload);
    io.emit('load');
    console.log('emitt');
  });
});

app.get('/', (req, res) => res.sendFile(path.resolve('pages/index.html')));
app.get('/test', (req, res) => res.sendFile(path.resolve('pages/test.html')));

server.listen(5000, () => {
  console.log('Server is listening at port 5000...');
});
