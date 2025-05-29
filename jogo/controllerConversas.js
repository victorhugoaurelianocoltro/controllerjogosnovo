/***************************************************************************************
 * Objetivo: Controller para manipulação de dados de Conversas
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***************************************************************************************/

const conversasDAO = require('../../model/DAO/conversas.js');
const message = require('../../modulo/config.js');

const inserirConversa = async (dados, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                dados.id_remetente == '' || dados.id_remetente == undefined ||
                dados.id_destinatario == '' || dados.id_destinatario == undefined ||
                dados.mensagem == '' || dados.mensagem == undefined ||
                dados.data_hora_envio == '' || dados.data_hora_envio == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }

            let result = await conversasDAO.insertConversa(dados);
            if (result)
                return message.SUCCESS_CREATED;
            else
                return message.ERROR_INTERNAL_SERVER;
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const atualizarConversa = async (id, dados) => {
    try {
        if (
            dados.id_remetente == '' || dados.id_remetente == undefined ||
            dados.id_destinatario == '' || dados.id_destinatario == undefined ||
            dados.mensagem == '' || dados.mensagem == undefined ||
            dados.data_hora_envio == '' || dados.data_hora_envio == undefined
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        let result = await conversasDAO.updateConversa(id, dados);
        if (result)
            return message.SUCCESS_UPDATED;
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const deletarConversa = async (id) => {
    try {
        let result = await conversasDAO.deleteConversa(id);
        if (result)
            return message.SUCCESS_DELETED;
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const listarConversas = async () => {
    try {
        let result = await conversasDAO.selectAllConversas();
        if (result)
            return { status_code: 200, conversas: result };
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const buscarConversa = async (id) => {
    try {
        let result = await conversasDAO.selectConversaById(id);
        if (result)
            return { status_code: 200, conversa: result };
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    inserirConversa,
    atualizarConversa,
    deletarConversa,
    listarConversas,
    buscarConversa
};
