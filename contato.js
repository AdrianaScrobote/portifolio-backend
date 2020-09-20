const contato = function(app){
    
    const db = require('./model/database')

    app.post('/contato/gravar/', function(req, res){

        let retorno = {"msg": "Os dados foram cadastrados com sucesso!"}
        res.json(retorno);
        res.end();
    })
}

module.exports = contato