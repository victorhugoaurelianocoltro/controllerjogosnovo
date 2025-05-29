/**************************************************************
 * Objetivo: DAO da tabela tbl_forma_pagamento
 * Data: 17/04/2025
 * Autor: Victor Hugo
 **************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


//Adiciona um novo registro (linha) dentro da tabela no banco de dados.
const insertFormaPagamento = async function (dados) {
    try {
        let sql = `
            INSERT INTO tbl_forma_pagamento (forma_pagamento)
            VALUES ('${dados.forma_pagamento}')
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}


// Atualiza os dados de um registro que já existe na tabela
const updateFormaPagamento = async function (dados) {
    try {
        let sql = `
            UPDATE tbl_forma_pagamento SET 
                forma_pagamento = '${dados.forma_pagamento}'
            WHERE id = ${dados.id}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}


//Remove um registro da tabela, ou seja, apaga uma linha
const deleteFormaPagamento = async function (id) {
    try {
        let sql = `DELETE FROM tbl_forma_pagamento WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllFormaPagamentos = async function () {
    try {
        let sql = `SELECT * FROM tbl_forma_pagamento ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}


//Recupera informações do banco
const selectByIDFormaPagamento = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_forma_pagamento WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFormaPagamento,
    updateFormaPagamento,
    deleteFormaPagamento,
    selectAllFormaPagamentos,
    selectByIDFormaPagamento
}
