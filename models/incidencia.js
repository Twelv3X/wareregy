class incidencia
{
    constructor(user_id, produto_id, caminhoFoto, incid_data, incid_hora, incid_comentario)
    {
        this.user_id = user_id;
        this.produto_id = produto_id;
        this.caminhoFoto = caminhoFoto;
        this.incid_data = incid_data;
        this.incid_hora = incid_hora;
        this.incid_comentario = incid_comentario;
    }

}
module.exports = incidencia;