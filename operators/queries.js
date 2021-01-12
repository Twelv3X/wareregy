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

                return resolve(results);
            }else{
                return reject(false);
            }
        })
    })
}

    devolverRegistos(user_id, registo_data){
        return new Promise ((resolve,reject)=>
        {
        connection.query("SELECT produto_id, produto_nome, produto_peso, LEFT(SEC_TO_TIME(registo_hora),5)as registo_hora FROM produtos_registados natural join produtos WHERE user_id= ? AND registo_data = ? ORDER BY registo_hora ASC", [user_id, registo_data], function(error, results, fields) {

            if (results.length > 0) {
                               
                return resolve(results);
            }else{
                return reject(false);
            }
        })
    })
}

    consultarRegistos(userid)
    {
        return new Promise ((resolve,reject)=>
        {
            connection.query('SELECT produto_id, produto_nome, produto_peso, produto_loc, SEC_TO_TIME(registo_hora)as registo_hora, DATE_FORMAT(registo_data,"%d/%m/%Y") as registo_data FROM produtos_registados natural join produtos WHERE user_id = ?', [userid], function(error, results, fields)
            {
                if (results.length > 0)
                {
                    return resolve(results);
                }else{
                    return reject(0);
                }
            })
        })
    }

    consultarAllRegistos()
    {
        return new Promise ((resolve,reject)=>
        {
            connection.query('SELECT produto_id, produto_nome, produto_peso, produto_loc, SEC_TO_TIME(registo_hora)as registo_hora, DATE_FORMAT(registo_data,"%d/%m/%Y") as registo_data FROM produtos_registados natural join produtos', function(error, results, fields)
            {
                if (results.length > 0)
                {
                    return resolve(results);
                }else{
                    return reject(0);
                }
            })
        })
    }
}
module.exports = queries;