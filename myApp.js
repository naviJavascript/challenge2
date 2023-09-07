require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


const indexPath = __dirname + '/views/index.html';
const public = __dirname + '/public';

// con el middleware express.static se pueden servir archivos estaticos
// la ventaja de usar este middeleware es que podemos servir toda una carpeta
// en este caso la carpeta public donde estan los archivos estaticos, como hojas de
// estilo y js
app.use('/public', express.static(public));
//------------------------------------------------

// middleware bodyParser sirve para analizar el cuerpo de una solicitud o peticion
// y se debe montar antes de las rutas que dependan del mismo
app.use(bodyParser.urlencoded({extended: false}));

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


// middleware bodyParser sirve para analizar el cuerpo de una solicitud post
// y se debe montar antes de las rutas que dependan del mismo

app.use('/name', bodyParser.urlencoded({extended: false}));

// parametros de consulta o parametros query
app.route('/name').get((req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    res.send({name: first + " " + last});
}).post((req, res) => {
  
    let first = req.body.first;
    let last =  req.body.last;
    res.send({name: first + " " + last});
});
























 module.exports = app;
