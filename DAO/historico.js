/***************************************************************************************
 * Objetivo: DAO para manipulação de dados de Histórico
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertHistorico = async (dados) => {
    try {
        let sql = `
            INSERT INTO tbl_historico (
                id_jogador,
                id_jogo,
                data_jogo,
                tempo_jogado
            ) VALUES (
                ${dados.id_jogador},
                ${dados.id_jogo},
                '${dados.data_jogo}',
                '${dados.tempo_jogado}'
            );
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateHistorico = async (id, dados) => {
    try {
        let sql = `
            UPDATE tbl_historico SET
                id_jogador = ${dados.id_jogador},
                id_jogo = ${dados.id_jogo},
                data_jogo = '${dados.data_jogo}',
                tempo_jogado = '${dados.tempo_jogado}'
            WHERE id = ${id};
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteHistorico = async (id) => {
    try {
        let sql = `DELETE FROM tbl_historico WHERE id = ${id}`;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const selectAllHistoricos = async () => {
    try {
        let sql = `SELECT * FROM tbl_historico`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const selectHistoricoById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_historico WHERE id = ${id}`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result[0] : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertHistorico,
    updateHistorico,
    deleteHistorico,
    selectAllHistoricos,
    selectHistoricoById
};
