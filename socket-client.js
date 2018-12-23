const io = require('socket.io-client');

const socket = io('https://socket.someurl/', {
  transports: ['websocket']
});

socket.on('connect',()=>{
    console.log('socket connect success!')
    console.log(socket.connected)
    if (socket.connected) {
        console.log('emitting ')
        socket.emit('getPayment', "5UYtueEig", function(data){
            console.log('ACK from server wtih data: ', data);
        });
    }
})

socket.on('connect_failed', function() {
  console.log("Connect failed (port " + socket_port + ")");
});

socket.on('error', function() {
  console.log("Socket.io reported a generic error");
});
socket.on('reconnect_error', function(err, abc) {
  console.log("Socket.io reported a generic error22", err, abc);
});
socket.on('connect_error', function(err, abc) {
  console.log("Socket.io reported a generic error12", err, abc);
});
