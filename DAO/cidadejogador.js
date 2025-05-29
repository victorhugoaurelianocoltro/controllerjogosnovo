/**************************************************************
 * Objetivo: DAO da tabela tbl_cidade_jogador
 * Data: 17/04/2025
 * Autor: Victor Hugo
 **************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertCidade = async function (cidade) {
    try {
        let sql = `INSERT INTO tbl_cidade_jogador (nome) VALUES ('${cidade.nome}');`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateCidade = async function (cidade) {
    try {
        let sql = `UPDATE tbl_cidade_jogador SET nome = '${cidade.nome}' WHERE id = ${cidade.id};`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteCidade = async function (id) {
    try {
        let sql = `DELETE FROM tbl_cidade_jogador WHERE id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllCidade = async function () {
    try {
        let sql = `SELECT * FROM tbl_cidade_jogador ORDER BY id DESC;`
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        return false
    }
}

const selectByIDCidade = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_cidade_jogador WHERE id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertCidade,
    updateCidade,
    deleteCidade,
    selectAllCidade,
    selectByIDCidade
}
