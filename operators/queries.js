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
        connection.query("SELECT user_id, produto_id, produto_nome, produto_peso, registo_data, registo_hora FROM produtos_registados natural join produtos WHERE user_id= ? AND registo_data = ? ORDER BY registo_hora ASC", [user_id, registo_data], function(error, results, fields) {

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

    enviarRegisto(registo)
    {
        return new Promise ((resolve,reject)=>
        {
            connection.query('INSERT INTO produtos_registados VALUES (?,?,?,?,?)',[registo.regId, registo.userId, registo.produtoId, registo.registoData, registo.registoHora], function(error, results, fields)
            {
                if (!error)
                {
                    return resolve(true);
                }else{
                    return reject(false);
                }
            })
        })
    }
}
module.exports = queries;