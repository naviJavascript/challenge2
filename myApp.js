let express = require('express');
let app = express();

console.log('hello world');
// console.log(__dirname);

const indexPath = __dirname + '/views/index.html';
const stylePath = __dirname + '/public';

/*
app.get('/', (req, res) => {
    res.send('Hello Express');
});
*/


app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.use('/public', express.static(stylePath));
































 module.exports = app;
