# Node socket.io Api

- 如何在express项目中使用socket.io

## 技术栈
- nodejs
- express
- socket.io

## 常用的技术说名
- io.on(‘connection’,function(socket));//监听客户端连接,回调函数会传递本次连接的socket

- io.sockets.emit(‘String’,data);//给所有客户端广播消息

- io.sockets.socket(socketid).emit(‘String’, data);//给指定的客户端发送消息

- socket.on(‘String’,function(data));//监听客户端发送的信息

- socket.emit(‘String’, data);//给该socket的客户端发送消息

- socket.broadcast.emit("msg",{data:"hello,everyone"}); //给除了自己以外的客户端广播消息

- io.sockets.emit("msg",{data:"hello,all"});//给所有客户端广播消息

- 分组
socket.on('group1', function (data) {
        socket.join('group1');
});
socket.on('group2',function(data){
        socket.join('group2');
 });
- 客户端发送

socket.emit(‘group1’)，就可以加入group1分组；
socket.emit(‘group2’)，就可以加入group2分组；

一个客户端可以存在多个分组（订阅模式）

- 踢出分组 socket.leave(data.room);

- 对分组中的用户发送信息
socket.broadcast.to('group1').emit('event_name', data); //不包括自己
io.sockets.in('group1').emit('event_name', data); //包括自己
- broadcast方法允许当前socket client不在该分组内

- 获取连接的客户端socket
io.sockets.clients().forEach(function (socket) {
    //.....
})

##客户端socket.on()监听的事件：
- connect：连接成功
- connecting：正在连接
- disconnect：断开连接
- connect_failed：连接失败
- error：错误发生，并且无法被其他事件类型所处理
- message：同服务器端message事件
- anything：同服务器端anything事件
- reconnect_failed：重连失败
- reconnect：成功重连
- reconnecting：正在重连
- 当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
