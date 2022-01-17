'use strict' 
//Importações de bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

//Inicia aplicação
const app = express();
const router = express.Router();
mongoose.connect(config.connectionString);

//Importa Modelos de dados
const Custumer = require('./models/customer-model');
const Publication = require('./models/publication-model');

//Importa as Rotas
const index = require('./routes/index-route');
const customerRoute = require('./routes/customer-route');
const publicationRoute = require('./routes/publication-route');


//Converte em json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index)
app.use('/customer', customerRoute);
app.use('/publication', publicationRoute);

module.exports = app;