/**************************************************************
 * Objetivo: Controller da tabela tbl_avaliacoes
 * Data: 17/04/2025
 * Autor: Victor Hugo
 **************************************************************/

const MESSAGE = require('../../modulo/config.js')
const avaliacoesDAO = require('../../model/DAO/avaliacoes.js')

const inserirAvaliacao = async function (avaliacao, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                avaliacao.data_avaliacao == undefined || avaliacao.data_avaliacao == '' || avaliacao.data_avaliacao == null || avaliacao.data_avaliacao.length > 10 ||
                avaliacao.nota == undefined || avaliacao.nota == '' || avaliacao.nota == null || avaliacao.nota.length > 10
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await avaliacoesDAO.insertAvaliacao(avaliacao)
                if (result) return MESSAGE.SUCCESS_CREATED_ITEM
                else return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

const atualizarAvaliacao = async function (avaliacao, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                avaliacao.data == undefined || avaliacao.data == '' || avaliacao.data == null || avaliacao.data.length > 10 ||
                avaliacao.nota == undefined || avaliacao.nota == '' || avaliacao.nota == null || avaliacao.nota.length > 10

            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let resultado = await buscarAvaliacaoPorID(id)
                if (resultado.status_code == 200) {
                    avaliacao.id = parseInt(id)
                    let result = await avaliacoesDAO.updateAvaliacao(avaliacao)
                    if (result) return MESSAGE.SUCCESS_UPDATED_ITEM
                    else return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

const deletarAvaliacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let resultado = await buscarAvaliacaoPorID(id)
            if (resultado.status_code == 200) {
                let result = await avaliacoesDAO.deleteAvaliacao(id)
                if (result) return MESSAGE.SUCCESS_DELETED_ITEM
                else return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

const listarAvaliacoes = async function () {
    try {
        let avaliacoes = await avaliacoesDAO.selectAllAvaliacoes()
        if (avaliacoes) {
            if (avaliacoes.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    items: avaliacoes.length,
                    avaliacoes: avaliacoes
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

const buscarAvaliacaoPorID = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let avaliacao = await avaliacoesDAO.selectByIDAvaliacao(id)
            if (avaliacao && avaliacao.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    avaliacao: avaliacao
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    listarAvaliacoes,
    buscarAvaliacaoPorID
}
