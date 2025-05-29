/***************************************************************************************
 * Objetivo: DAO para manipulação dos dados de Amigos de Jogador no banco de dados
 * Data: 29/05/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertAmigoJogador = async (dados) => {
    try {
        const result = await prisma.amigoJogador.create({
            data: {
                id_jogador: dados.id_jogador,
                id_amigo: dados.id_amigo
            }
        });
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateAmigoJogador = async (id, dados) => {
    try {
        const result = await prisma.amigoJogador.update({
            where: { id: Number(id) },
            data: {
                id_jogador: dados.id_jogador,
                id_amigo: dados.id_amigo
            }
        });
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteAmigoJogador = async (id) => {
    try {
        const result = await prisma.amigoJogador.delete({
            where: { id: Number(id) }
        });
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const selectAllAmigosJogador = async () => {
    try {
        const result = await prisma.amigoJogador.findMany();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const selectAmigoJogadorById = async (id) => {
    try {
        const result = await prisma.amigoJogador.findUnique({
            where: { id: Number(id) }
        });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    insertAmigoJogador,
    updateAmigoJogador,
    deleteAmigoJogador,
    selectAllAmigosJogador,
    selectAmigoJogadorById
};
