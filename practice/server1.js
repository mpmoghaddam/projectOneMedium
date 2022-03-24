let express = require ('express');
let app = express();

app.post('/', function(chooseNumberOfGame = (numberOfPlaysInput), res){
    res.send(`you want to play ${numberOfPlays} times. Please choose your option here:\n
    curl http://localhost:4000/player1Selection?selection1={selection1}\n`);
})

let server = app.listen(8080, function(){
    let host = server.address().address
    let port = server.address.port
    console.log("server is running at http://%s:%s", host, port)
})