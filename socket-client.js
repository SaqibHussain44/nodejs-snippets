const io = require('socket.io-client');

const socket = io('http://0.0.0.0:3000/', {
  transports: ['websocket']
});

socket.on('connect',()=>{
    console.log('socket connect success!')
    console.log(socket.connected)
    if (socket.connected) {
        console.log('emitting ')
        socket.emit('event', "someid", function(data){
            console.log('ACK from server wtih data: ', data);
        });
    }
})

socket.on('connect_failed', function() {
  console.log("Connect failed (port " + socket_port + ")");
});

socket.on('error', function(err) {
  console.log("Socket.io reported a generic error", err);
});
socket.on('reconnect_error', function(err, abc) {
  console.log("Socket.io reported a generic error22", err, abc);
});

socket.on('connect_error', function(err, abc) {
  console.log("Socket.io reported a generic error12", err, abc);
});
