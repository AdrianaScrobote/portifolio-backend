const contato = async function(app){
    
    const db = require('./model/database')
    
    app.post('/contato/gravar/', async function(req, res){

        let data = [],
        error = [],
        statusCodeResponse = 200,
        response = {
        statusCode: null,
        body: null
        };

        try {
            await db.startConnetion()

            if(await db.isConnected()){

                let contato = await db.queryExec(`
                            insert into contato
                                (nome, 
                                email, 
                                assunto, 
                                mensagem, 
                                dt_cadastro)
                            values 
                                ('`+ req.body.nome +`', 
                                '`+ req.body.email +`', 
                                '`+ req.body.assunto +`',
                                '`+ req.body.mensagem +`', 
                                '`+ req.body.dt_cadastro +`')
                            `)

                if(contato.status == 'error'){
                    statusCodeResponse = 500
                    error.push({input: contato.body, msg: contato.message})
                }
                else{
                    data.push({input: contato.body, msg: "Contato cadastrado com sucesso!"})
                }
            }
            else{
                statusCodeResponse = 500
                error.push({input: contato.body, msg: "Não foi possível realizar a conexão com o banco de dados"})
            }
        } catch (e) {
            statusCodeResponse = 404;
            error.push(e.stack);
        } finally {
          
            await db.closeConnection()

            response.statusCode = statusCodeResponse;
        
            response.body = {
            data: data,
            errors: error
            };

            res.json(response);
            res.end();
        }
    })
}

module.exports = contato