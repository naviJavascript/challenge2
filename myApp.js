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

app.use('/', (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

// con el middleware express.static se pueden servir archivos estaticos
// como hojas de estilo por ejemplo
app.use('/public', express.static(stylePath));

app.get('/json', (req,  res) => {
    let response = 'Hello json';
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response = response.toUpperCase();
    }
    res.json({"message": response});
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({"time": req.time});
});

app.get('/:word/echo', (req,res) => {
    let word = req.params.word;
    console.log(word);
    res.send({echo: word});
});



























 module.exports = app;
