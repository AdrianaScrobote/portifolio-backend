const sequelize = require('sequelize')
require('mysql2')

class databaseManager{

  // Criação do singleton
  constructor() {
    if (!databaseManager.instance) {
      this.models = {};
      this.connection = false;
      databaseManager.instance = this;
    }

    return databaseManager.instance;
  }

  async startConnetion(){

    try{
      this.connection = new sequelize(
        'portifolio', 
        'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            logging: false, // não retornar logs
        }
      )

      await this.connection
        .authenticate()
        .then(async () => {
          await console.log("Conexao realizada com sucesso");
        })
        .catch(err => {
          throw new Error(err);
        });
    }
    catch (err) {
      new Error(JSON.stringify({ message: err.message }));
    }
  }

  async isConnected() {
    if (!this.connection) {
      return false;
    }
    return true;
  }

  async queryExec(query, rtnIdInsert = false) {
    try {
      let response = null,
        typeOper = null,
        operator = query
          .trim()
          .split(" ")
          .shift()
          .toUpperCase();

      if (operator == "SELECT") typeOper = sequelize.QueryTypes.SELECT;
      else if (operator == "INSERT") typeOper = sequelize.QueryTypes.INSERT;
      else if (operator == "UPDATE") typeOper = sequelize.QueryTypes.UPDATE;
      else typeOper = sequelize.QueryTypes.SELECT

      response = await this.connection.query(query, { type: typeOper });
      return response;
      
    } catch (err) {
      return {
        status: "error",
        message: err.message
      };
    }
  }

  // Finaliza a conexão com o banco de dados
  async closeConnection() {
    try {
      await this.connection.close();
      this.connection = null;
      return true;
    } catch (err) {
      new Error(JSON.stringify({ message: err.message }));
    }
  }
}

module.exports = new databaseManager();