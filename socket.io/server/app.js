var io = require('socket.io')(3002);
var fs = require('fs');
var url = require("url");

// 连接成功事件
io.on('connection', function (socket) {
  socket.on('chatevent', function (data, cb) {
  	var msg = data.msg;
  	// 将前台信息 发送给所有人
    cb('success!');
    io.emit('chatevent', data);
  });
  socket.on('disconnect', function (data) {
    console.log('已断开连接，data:' + data);
  });

  socket.on('auth', function(data, cb){
  	// data里的参数用不着, 100%返回授权通过
  	cb({"code":0, "msg":"xx"});
  });
  socket.on('command', function(data, cb){
  	var _action = "";
  	_action = data.action;
  	// 根据data里参数判断，执行哪一类业务逻辑（本次是主要两中：getTicket  startGame）
  	if (_action == "getTickets"){
  		console.log('请求票成功！');
  		cb({"status":200, "msg":"getTicket Success"});
  	} else if(_action == "join"){
  		console.log('请求开始游戏成功！');
  		cb({"status":200, "msg":"给你一些中文，最好是乱码！"});
  	}
  });
});
