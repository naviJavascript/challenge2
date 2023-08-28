let express = require('express');
let app = express();

console.log('hello world');
console.log(__dirname);

const absolutePath = __dirname + '/views/index.html';

/*
app.get('/', (req, res) => {
    res.send('Hello Express');
});
*/

app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});






























 module.exports = app;
