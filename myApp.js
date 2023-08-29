require('dotenv').config();
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

app.get('/json', (req,  res) => {
    let hello = '';
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        hello = hello.toUpperCase();
    } else {
        hello = 'Hello json';
    }
    res.json({"message": hello});
});






























 module.exports = app;
