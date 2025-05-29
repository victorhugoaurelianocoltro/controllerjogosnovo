/**************************************************************
 * Objetivo: Controller da tabela tbl_forma_pagamento
 * Data: 17/04/2025
 * Autor: Victor Hugo
 **************************************************************/

const MESSAGE = require('../../modulo/config.js')
const formaPagamentoDAO = require('../../model/DAO/forma_pagamento.js')

const inserirFormaPagamento = async function (dados, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                dados.forma_pagamento == undefined || dados.forma_pagamento == '' || dados.forma_pagamento == null || dados.forma_pagamento.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let result = await formaPagamentoDAO.insertFormaPagamento(dados)
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

const atualizarFormaPagamento = async function (dados, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                dados.forma_pagamento == undefined || dados.forma_pagamento == '' || dados.forma_pagamento == null || dados.forma_pagamento.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                let resultado = await buscarFormaPagamentoPorID(id)
                if (resultado.status_code == 200) {
                    dados.id = parseInt(id)
                    let result = await formaPagamentoDAO.updateFormaPagamento(dados)
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

const deletarFormaPagamento = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let resultado = await buscarFormaPagamentoPorID(id)
            if (resultado.status_code == 200) {
                let result = await formaPagamentoDAO.deleteFormaPagamento(id)
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

const listarFormaPagamentos = async function () {
    try {
        let pagamentos = await formaPagamentoDAO.selectAllFormaPagamentos()
        if (pagamentos) {
            if (pagamentos.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    items: pagamentos.length,
                    forma_pagamento: pagamentos
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

const buscarFormaPagamentoPorID = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let pagamento = await formaPagamentoDAO.selectByIDFormaPagamento(id)
            if (pagamento && pagamento.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    forma_pagamento: pagamento
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
    inserirFormaPagamento,
    atualizarFormaPagamento,
    deletarFormaPagamento,
    listarFormaPagamentos,
    buscarFormaPagamentoPorID
}
