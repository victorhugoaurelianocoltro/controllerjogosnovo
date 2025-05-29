const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir pagamento
const insertPagamento = async (dados) => {
    try {
        const sql = `
            INSERT INTO tbl_pagamento (id_jogador, id_forma_pagamento, valor, data_pagamento)
            VALUES (${dados.id_jogador}, ${dados.id_forma_pagamento}, ${dados.valor}, '${dados.data_pagamento}');
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Atualizar pagamento
const updatePagamento = async (id, dados) => {
    try {
        const sql = `
            UPDATE tbl_pagamento SET
                id_jogador = ${dados.id_jogador},
                id_forma_pagamento = ${dados.id_forma_pagamento},
                valor = ${dados.valor},
                data_pagamento = '${dados.data_pagamento}'
            WHERE id = ${id};
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Deletar pagamento
const deletePagamento = async (id) => {
    try {
        const sql = `DELETE FROM tbl_pagamento WHERE id = ${id};`;
        const result = await prisma.$executeRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Selecionar todos
const selectAllPagamentos = async () => {
    try {
        const sql = `SELECT * FROM tbl_pagamento;`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Selecionar por ID
const selectPagamentoById = async (id) => {
    try {
        const sql = `SELECT * FROM tbl_pagamento WHERE id = ${id};`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result[0] : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    insertPagamento,
    updatePagamento,
    deletePagamento,
    selectAllPagamentos,
    selectPagamentoById
};
