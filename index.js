var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http)
;

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
