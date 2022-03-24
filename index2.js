
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send("Hello World!");
})

app.post('/', function(request, response){
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Example app listening at http://localhost:${PORT}`);
})