/***************************************************************************************
 * Objetivo: Controller para manipulação de dados de Histórico
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***************************************************************************************/

const historicoDAO = require('../../model/DAO/historico.js');
const message = require('../../modulo/config.js');

const inserirHistorico = async (dados, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                dados.id_jogador == '' || dados.id_jogador == undefined ||
                dados.id_jogo == '' || dados.id_jogo == undefined ||
                dados.data_jogo == '' || dados.data_jogo == undefined ||
                dados.tempo_jogado == '' || dados.tempo_jogado == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            }

            let result = await historicoDAO.insertHistorico(dados);
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

const atualizarHistorico = async (id, dados) => {
    try {
        if (
            dados.id_jogador == '' || dados.id_jogador == undefined ||
            dados.id_jogo == '' || dados.id_jogo == undefined ||
            dados.data_jogo == '' || dados.data_jogo == undefined ||
            dados.tempo_jogado == '' || dados.tempo_jogado == undefined
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        let result = await historicoDAO.updateHistorico(id, dados);
        if (result)
            return message.SUCCESS_UPDATED;
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const deletarHistorico = async (id) => {
    try {
        let result = await historicoDAO.deleteHistorico(id);
        if (result)
            return message.SUCCESS_DELETED;
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const listarHistoricos = async () => {
    try {
        let result = await historicoDAO.selectAllHistoricos();
        if (result)
            return { status_code: 200, historicos: result };
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const buscarHistorico = async (id) => {
    try {
        let result = await historicoDAO.selectHistoricoById(id);
        if (result)
            return { status_code: 200, historico: result };
        else
            return message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    inserirHistorico,
    atualizarHistorico,
    deletarHistorico,
    listarHistoricos,
    buscarHistorico
};
