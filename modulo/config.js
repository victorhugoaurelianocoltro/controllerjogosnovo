/***********************************************
 * Objetivo: Arquivo de padronização de mensagens e status code para o projeto
 * Data: 20/02/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 ***********************************************/ 

const ERROR_REQUIRE_FIELDS   =  {status: false, status_code : 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada ! ! !"}

const ERROR_INTERNAL_SERVER_CONTROLER  =  {status: false, status_code : 500, message:"Não foi possivel processar a requisição, pois ocorreram erros internos no servidor da CONTROLER ! ! !" }
const ERROR_INTERNAL_SERVER_MODEL      =  {status: false, status_code : 500, message:"Não foi possivel processar a requisição, pois ocorreram erros internos no servidor da MODEL ! ! !" }
const ERROR_CONTENT_TYPE               =  {status: false, status_code : 415, message: "não foi possivel processar a requisição, pois o formato de dados encaminhado não é suportado pelo Servidor. Favor encaminhar apenas JSON "}
const ERROR_NOT_FOUND                  =  {status: false, status_code : 404, message: "não foram encontrados items para retornar"}

//
const SUCCESS_CREATED_ITEM    =  {status: true, status_code: 201, message:  "Item criado com sucesso ! ! !"}
const SUCCESS_DELETED_ITEM    =  {status: true, status_code: 200, message:  "Item deletado com sucesso ! ! !"}
const SUCCESS_UPDATE_ITEM    =  {status: true, status_code: 200, message:  "Item atualizado com sucesso ! ! !"}

module.exports = {
    ERROR_REQUIRE_FIELDS,
    ERROR_INTERNAL_SERVER_CONTROLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATE_ITEM
}