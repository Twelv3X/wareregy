class registo
{
    constructor(regId, userId, produtoId, registoData, registoHora)
    {
        this.regId = regId;
        this.userId = userId;
        this.produtoId = produtoId;
        this.registoData = registoData;
        this.registoHora = registoHora;
    }

}
module.exports = registo;