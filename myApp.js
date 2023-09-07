require('dotenv').config();
let express = require('express');
let app = express();


console.log('hello world');
// console.log(__dirname);

const indexPath = __dirname + '/views/index.html';
const public = __dirname + '/public';

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
// la ventaja de usar este middeleware es que podemos servir toda una carpeta
// en este caso la carpeta public donde estan los archivos estaticos, como hojas de
// estilo y js
app.use('/public', express.static(public));

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


// parametros de consulta o parametros query
app.route('/name').get((req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    res.send({name: first + " " + last});
}).post((req, res) => {

});
























 module.exports = app;
