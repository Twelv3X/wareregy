const connection = require("./mySQL");

class queries
{
    constructor(){

    }

     verificarUtilizador(email, password){
        return new Promise ((resolve,reject)=>
        {
        connection.query('SELECT * FROM utilizadores inner join niveis on user_xp BETWEEN min_xp and max_xp WHERE user_email = ? AND user_password = ?', [email, password], function(error, results, fields) {
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
            console.log(error);
            console.log(results);
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

    atualizarExp(exp,uId){
        return new Promise ((resolve,reject)=>
        {
        connection.query("UPDATE utilizadores SET user_xp = user_xp + ? WHERE user_id = ?;", [exp, uId], function(error, results, fields) {
            if (!error)
            {
                return resolve(true);
            }else{
                return reject(false);
            }
        })
    })
    }

    getUserExp(uId){
        return new Promise ((resolve,reject)=>
        {
        connection.query("SELECT user_xp, nivel, min_xp, max_xp, (SELECT count(*) from produtos_registados where registo_data = CURDATE() AND user_id = ?) as nRegistos FROM utilizadores inner join niveis on user_xp BETWEEN min_xp and max_xp WHERE user_id = ?", [uId, uId], function(error, results, fields) {
            if (results.length > 0)
                {
                    console.log(results);
                    return resolve(results);
                }else{
                    return reject(false);
                }
        })
    })
    }
    
 getNrRegistos(uId){
    return new Promise ((resolve,reject)=>
    {
    connection.query("SELECT count(*) as nRegistos from produtos_registados where registo_data = CURDATE() AND user_id = ?", [uId], function(error, results, fields) {
        if (results.length > 0)
            {
                return resolve(results);
            }else{
                return reject(false);
            }
    })
})
}

    novoUtilizador(nome,email,password){
        return new Promise ((resolve,reject)=>
        {
        connection.query("INSERT INTO utilizadores VALUES('',?,?,?,0,0,0)", [nome,email,password], function(error, results, fields) {
            if (!error)
            {
                return resolve(true);
            }else{
                console.log(error);
                return reject(false);
            }
            })
        })
    }


    getRegistos(semana, ano){
    return new Promise ((resolve,reject)=>
    {
    connection.query("SELECT CONCAT(DAY(registo_data),'/',MONTH(registo_data)) as registo_data, count(*) as total from produtos_registados where  week(registo_data) = ? and year(registo_data) = ? group by day(registo_data) ; ", [semana,ano], function(error, results, fields) {
        if (results.length > 0)
            {
                return resolve(results);
            }else{
                return reject(false);
            }
        })
        })
    }

    mudarPassword(id,password){
        return new Promise ((resolve,reject)=>
        {
        connection.query("UPDATE utilizadores SET user_login = 1, user_password=? WHERE user_id=?", [password,id], function(error, results, fields) {
            if (!error)
            {
                return resolve(results);
            }else{
                console.log(error);
                return reject(false);
            }
            })
        })
    }

    enviarIncidencia(inci)
    {
        return new Promise ((resolve,reject)=>
        {
            connection.query('INSERT INTO produtos_incidencias (user_id, produto_id, caminhoFoto, incid_data, incid_hora, incid_comentario) VALUES (?,?,?,?,?,?)',[inci.user_id, inci.produto_id, inci.caminhoFoto, inci.incid_data, inci.incid_hora, inci.incid_comentario], function(error, results, fields)
            {
                console.log(error);
                if (!error)
                {
                    return resolve(true);
                }else{
                    return reject(false);
                }
            })
        })
    }

    getEstatisticas(user_id, data){

        return new Promise ((resolve,reject)=>
        {
            connection.query('SELECT HOUR(SEC_TO_TIME(registo_hora)) as hora, count(*) as total FROM produtos_registados where user_id = ? and registo_data = ? group by HOUR(SEC_TO_TIME(registo_hora))',[user_id, data], function(error, results, fields)
            {
                if (results.length > 0)
                {
                    return resolve(results);
                }else{
                    return reject(false);
                }
            })
        })

        
    }

}
module.exports = queries;