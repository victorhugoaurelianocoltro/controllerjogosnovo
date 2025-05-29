//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da Classe do prisma client, para gerar um objeto
const prisma =  new PrismaClient()

//Funcão para inserir no banco de dados um novo jogo
const insertJogo = async function(jogo){

try { // para continuar rodando a API, volta o 500, mais ainda funciona



    

    let sql  = `insert into tbl_jogo(   
                                        nome,
                                        data_lancamento,
                                        versao,
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link
                                    ) values (
                                        '${jogo.nome}',
                                        '${jogo.data_lancamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo.descricao}',
                                        '${jogo.foto_capa}',
                                        '${jogo.link}'
                                    );`

    //Executa o Script SQL no BD e AGUARDA (AWAIT) o retorbo do BD
    let result = await prisma.$executeRawUnsafe(sql)  //insert

    if(result)
        return true
    else
        return false
} catch (error) { // para continuar rodando a API, volta o 500, mais ainda funciona
    console.log(log)  //coloque o console log, para saber qual é o erro, tem que ser dentro do catch
    return false
}
    
}

//Funcão para atualizar no Banco de Dados um jogo existente
const updateJogo = async function(jogo){
    
try{

    let sql = `update tbl_jogo set 

                                    nome                    = '${jogo.nome}',               
                                    data_lancamento         = '${jogo.data_lancamento}',
                                    versao                  = '${jogo.versao}',
                                    tamanho                 = '${jogo.tamanho}',
                                    descricao               = '${jogo.descricao}',
                                    foto_capa               = '${jogo.foto_capa}',
                                    link                    = '${jogo.link}' `


      let result = await prisma.$executeRawUnsafe(sql)                                


    if(result){
        return true
    }else{
        return false
    }

} catch(error) {
    console.log(error)
    return false     
}

}

//Funcão para excluir no Banco de Dados de um jogo existente
const deleteJogo = async function(id){
    try{

        //Script SQL e aguarda os dados do BD
        let sql = 'delete from tbl_jogo  where id='+id

        //executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe (sql) //select

    if(result)
         return true
     else 
          return false   
    } catch (error){
return false
    }

}

//Funcão para retornar do Banco de Dados uma lista de jogos
const selectAllJogo = async function(){
    try{

        //Script SQL e aguarda os dados do BD
        let sql = 'select * from tbl_jogo order by id desc'

        //executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe (sql) //select

    if(result)
         return result
     else 
          return false   
    } catch (error){
return false
    }

}

//Funcão para buscar no banco de dados um jogo pelo ID
const selectByIDJogo = async function(id){
    try{

        //Script SQL e aguarda os dados do BD
        let sql = 'select * from tbl_jogo where id='+id

        //executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe (sql) //select

    if(result)
         return result
     else 
          return false   
    } catch (error){
return false
    }


}



module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIDJogo,
    deleteJogo
}