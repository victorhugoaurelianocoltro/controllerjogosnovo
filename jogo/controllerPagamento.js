const pagamentoDAO = require('../../model/DAO/pagamento.js');
const message = require('../../modulo/config.js');

// Inserir novo pagamento
const inserirPagamento = async (dadosPagamento) => {
    if (
        dadosPagamento.id_jogador == '' || dadosPagamento.id_jogador == undefined ||
        dadosPagamento.id_forma_pagamento == '' || dadosPagamento.id_forma_pagamento == undefined ||
        dadosPagamento.valor == '' || dadosPagamento.valor == undefined ||
        dadosPagamento.data_pagamento == '' || dadosPagamento.data_pagamento == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {
        const result = await pagamentoDAO.insertPagamento(dadosPagamento);
        if (result)
            return message.CREATED_ITEM;
        else
            return message.ERROR_INTERNAL_SERVER_DB;
    }
};

// Atualizar pagamento
const atualizarPagamento = async (id, dadosPagamento) => {
    if (id == '' || id == undefined)
        return message.ERROR_INVALID_ID;

    const pagamentoExistente = await pagamentoDAO.selectPagamentoById(id);
    if (!pagamentoExistente)
        return message.ERROR_NOT_FOUND;

    const result = await pagamentoDAO.updatePagamento(id, dadosPagamento);
    if (result)
        return message.UPDATED_ITEM;
    else
        return message.ERROR_INTERNAL_SERVER_DB;
};

// Excluir pagamento
const deletarPagamento = async (id) => {
    const pagamento = await pagamentoDAO.selectPagamentoById(id);
    if (pagamento) {
        const result = await pagamentoDAO.deletePagamento(id);
        if (result)
            return message.DELETED_ITEM;
        else
            return message.ERROR_INTERNAL_SERVER_DB;
    } else {
        return message.ERROR_NOT_FOUND;
    }
};

// Listar todos
const listarPagamentos = async () => {
    const dados = await pagamentoDAO.selectAllPagamentos();
    return dados.length > 0 ? dados : message.ERROR_NOT_FOUND;
};

// Buscar por ID
const buscarPagamento = async (id) => {
    const dados = await pagamentoDAO.selectPagamentoById(id);
    return dados ? dados : message.ERROR_NOT_FOUND;
};

module.exports = {
    inserirPagamento,
    atualizarPagamento,
    deletarPagamento,
    listarPagamentos,
    buscarPagamento
};