/**************************************************************
 * Objetivo: DAO da tabela tbl_avaliacoes
 * Data: 17/04/2025
 * Autor: Victor Hugo
 **************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAvaliacao = async function (avaliacao) {
    try {
        let sql = `
            INSERT INTO tbl_avaliacoes (data_avaliacao,nota)
            VALUES ('${avaliacao.data_avaliacao}',
                     '${avaliacao.nota}'
                     );`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateAvaliacao = async function (avaliacao) {
    try {
        let sql = `
            UPDATE tbl_avaliacoes SET 
                avaliacao = '${avaliacao.avaliacao}'
            WHERE id = ${avaliacao.id}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteAvaliacao = async function (id) {
    try {
        let sql = `DELETE FROM tbl_avaliacoes WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllAvaliacoes = async function () {
    try {
        let sql = `SELECT * FROM tbl_avaliacoes ORDER BY id DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const selectByIDAvaliacao = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_avaliacoes WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacoes,
    selectByIDAvaliacao
}
