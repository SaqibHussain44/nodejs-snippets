const express = require('express')
var bodyParser = require('body-parser')
var http = require('http');
var Web3 = require('web3');
var io = require('socket.io').listen(server);  //pass a http.Server instance

const app = express()
var web3 = new Web3("https://rinkeby.infura.io/v3/someid");

const port = 3000
app.use(bodyParser.json())

var server = http.createServer(app);

io.on('connection', client => {
    console.log('--------- connected **')
    client.on('event', data => { 
        console.log('--------- event on')
    });
    client.on('disconnect', () => {
        console.log('--------- disconnect on')
    });
});

app.get('/', (req, res) => {
    // compiled solidity source code using https://remix.ethereum.org
    var code = "0xf8aa81c685098bca5a00827bb3944082459185f949f9e04097645b8976bc16dd3d4a80b84466e7ea0f000000000000000000000000288cf235f94faa0d8049bc7e19f4fda2452b7e9600000000000000000000000000000000000000000000000000000000000003e82ba034e21530f5e27d2bf0a7af7cb47b78855de619243b716ea95d776a30280a051aa00c0a262a3522fb4e5c338caa2a57fc1e0d8aea6aadad03c9e9d5e4eeec29b799";

    web3.eth.sendSignedTransaction(code)
    .on('transactionHash', function(hash){
        console.log(' hash  ---------------', hash)
    })
    .on('receipt', function(receipt){
        console.log('receipt ---------------- ', receipt)
    })
    .on('confirmation', function(confirmationNumber, receipt){ 
        console.log('confirmationNumber -------- ', confirmationNumber)
     })
    .on('error -----------()', console.error); // If a out of gas error, the second parameter is the receipt.
    res.send('Hello world')

})

server.listen(port, () => console.log(`Token Deployment service listening on port ${port}!`))