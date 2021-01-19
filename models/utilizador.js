class utilizador
{
    constructor(id,nome,email,login,privilegio,exp,nivel,minxp,maxxp, nRegistos)
    {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.privilegio = privilegio;
        this.exp = exp;
        this.nivel = nivel;
        this.minxp = minxp;
        this.maxxp = maxxp;
        this.nRegistos = nRegistos;
    }

}
module.exports = utilizador;