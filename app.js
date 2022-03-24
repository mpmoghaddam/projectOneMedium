let express = require ('express');

let app  = express();

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.sendFile('C:/SODV9105_Web/Web_ Project_Node_Exercise -Demo/html/index.html');
});

app.post('/submit-student-data', function(req, res){
    let name = req.body.firstName +' '+req.body.lastName;
    res.send(name +' submitted successfully');
});

app.post('update-data', function(req, res){
    res.send('Put request');
});

app.delete('delete-data', function(req, res){
    res.send('Delete request');
});


let server = app.listen(5000, function(){
    console.log('Node server is running...');
});
