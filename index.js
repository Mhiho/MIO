const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4000;
const errorHandler = require('./_middleware/error-handler');
const cors = require("cors")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    connection.query(`INSERT INTO chat (text) VALUES ('${msg}')`,function(err, rows){
      if (err) throw err;
      
      console.log('row added');
      console.log(rows);
    });
  })
});
app.use(cors())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/users', require('./users/user.controller'));
app.use('/map', require('./map/map.controller'));
app.use(errorHandler);


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});