class utilizador
{
    constructor(id,nome,email,login,privilegio,exp)
    {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.privilegio = privilegio;
        this.exp = exp;
    }

}
module.exports = utilizador;