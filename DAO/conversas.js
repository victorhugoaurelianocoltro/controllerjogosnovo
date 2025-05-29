/***************************************************************************************
 * Objetivo: DAO para manipulação de dados de Conversas
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertConversa = async (dados) => {
    try {
        let sql = `
            INSERT INTO tbl_conversas (
                id_remetente,
                id_destinatario,
                mensagem,
                data_hora_envio
            ) VALUES (
                ${dados.id_remetente},
                ${dados.id_destinatario},
                '${dados.mensagem}',
                '${dados.data_hora_envio}'
            );
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateConversa = async (id, dados) => {
    try {
        let sql = `
            UPDATE tbl_conversas SET
                id_remetente = ${dados.id_remetente},
                id_destinatario = ${dados.id_destinatario},
                mensagem = '${dados.mensagem}',
                data_hora_envio = '${dados.data_hora_envio}'
            WHERE id = ${id};
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteConversa = async (id) => {
    try {
        let sql = `DELETE FROM tbl_conversas WHERE id = ${id}`;
        const result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const selectAllConversas = async () => {
    try {
        let sql = `SELECT * FROM tbl_conversas`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const selectConversaById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_conversas WHERE id = ${id}`;
        const result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result[0] : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertConversa,
    updateConversa,
    deleteConversa,
    selectAllConversas,
    selectConversaById
};
