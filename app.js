// Includes
const express = require('express')
const app = require('express')()

app.use(express.json())
app.use(express.static(__dirname + '/public'));


// Funcionalidades de contato
const func_contato = require('./contato')
func_contato(app)


// main
const porta = 1235;
app.listen(porta, function() {
  console.log('CRUD NODE\nServidor rodando na porta %s...', porta);
})