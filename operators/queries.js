const connection = require("./mySQL");
const utilizador = require("../models/utilizador");

class queries
{
    constructor(){

    }

        verificarUtilizador(email, password){
        return new Promise ((resolve,reject)=>
        {
        connection.query('SELECT * FROM utilizadores WHERE user_email = ? AND user_password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
                               
                //console.log(results);
                return resolve(results);
            }else{
                return reject(0);
            }
        })
    })
}
}
module.exports = queries;