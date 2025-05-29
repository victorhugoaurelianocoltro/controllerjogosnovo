/*************************************************************************************** 
 * Objetivo: Controller para manipulação de dados de Amigos de Jogador
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.1
 ***************************************************************************************/

const amigoJogadorDAO = require('../../model/DAO/amigojogador.js');
const message = require('../../modulo/config.js');

const inserirAmigoJogador = async (dados, contentType) => {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!dados.id_jogador || !dados.id_amigo) {
                return message.ERROR_REQUIRED_FIELDS;
            }

            const result = await amigoJogadorDAO.insertAmigoJogador(dados);
            return result ? message.SUCCESS_CREATED : message.ERROR_INTERNAL_SERVER;
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const atualizarAmigoJogador = async (id, dados) => {
    try {
        if (!dados.id_jogador || !dados.id_amigo) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const result = await amigoJogadorDAO.updateAmigoJogador(id, dados);
        return result ? message.SUCCESS_UPDATED : message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const deletarAmigoJogador = async (id) => {
    try {
        const result = await amigoJogadorDAO.deleteAmigoJogador(id);
        return result ? message.SUCCESS_DELETED : message.ERROR_NOT_FOUND;
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const listarAmigosJogador = async () => {
    try {
        const result = await amigoJogadorDAO.selectAllAmigosJogador();
        if (result && result.length > 0) {
            return {
                status_code: 200,
                data: result
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const buscarAmigoJogador = async (id) => {
    try {
        const result = await amigoJogadorDAO.selectAmigoJogadorById(id);
        if (result) {
            return {
                status_code: 200,
                data: result
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    inserirAmigoJogador,
    atualizarAmigoJogador,
    deletarAmigoJogador,
    listarAmigosJogador,
    buscarAmigoJogador
};
