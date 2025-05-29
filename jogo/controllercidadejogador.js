/**************************************************************
 * Objetivo: Controller da tabela tbl_cidade_jogador
 * Data: 17/04/2025
 * Autor: Victor Hugo 
 **************************************************************/


const MESSAGE = require('../../modulo/config.js')
const cidadeDAO = require('../../model/DAO/cidade_jogador.js')

// Inserir nova cidade
const inserirCidade = async function (cidade, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                cidade.nome == undefined || cidade.nome == '' || cidade.nome == null || cidade.nome.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            } else {
                let result = await cidadeDAO.insertCidade(cidade)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Atualizar cidade
const atualizarCidade = async function (cidade, id, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                cidade.nome == undefined || cidade.nome == '' || cidade.nome == null || cidade.nome.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let resultCidade = await buscarCidade(parseInt(id))

                if (resultCidade.status_code === 200) {
                    cidade.id = parseInt(id)
                    let result = await cidadeDAO.updateCidade(cidade)
                    return result ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else if (resultCidade.status_code === 404) {
                    return MESSAGE.ERROR_NOT_FOUND
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Excluir cidade
const deletarCidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let resultCidade = await buscarCidade(parseInt(id))
            if (resultCidade.status_code === 200) {
                let result = await cidadeDAO.deleteCidade(parseInt(id))
                return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else if (resultCidade.status_code === 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Listar cidades
const listarCidade = async function () {
    try {
        let dados = {}
        let result = await cidadeDAO.selectAllCidade()

        if (result && result.length > 0) {
            dados.status = true
            dados.status_code = 200
            dados.items = result.length
            dados.cidades = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

// Buscar cidade por ID
const buscarCidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let dados = {}
            let result = await cidadeDAO.selectByIDCidade(parseInt(id))

            if (result && result.length > 0) {
                dados.status = true
                dados.status_code = 200
                dados.cidades = result
                return dados
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }
}

module.exports = {
    inserirCidade,
    atualizarCidade,
    deletarCidade,
    listarCidade,
    buscarCidade
}
