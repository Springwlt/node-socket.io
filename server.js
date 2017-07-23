var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
var socketId = [];
io.on('connection', function(socket){
    //给所有的客户端广播消息
    socketId.push(socket.id);
    socket.emit("msg",{data:socketId});
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });

});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});
