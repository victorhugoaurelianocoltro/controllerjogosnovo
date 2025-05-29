//Função para inserir um novo jogo
 

const MESSAGE = require('../../modulo/config.js')

const jogoDAO = require('../../model/DAO/jogo.js')

//função para inserir um novo jogo
const inserirJogo = async function (jogo, contentType) {

    try{

        if(contentType == 'aplication/jason'){


    if( jogo.nome               == undefined   ||   jogo.nome               == ''   || jogo.nome                == null     ||  jogo.nome.length                > 80 ||
        jogo.data_lancamento    == undefined   ||   jogo.data_lancamento    == ''   || jogo.data_lancamento     == null     ||  jogo.data_lancamento.length     > 10 ||
        jogo.versao             == undefined   ||   jogo.versao             == ''   || jogo.versao              == null     ||  jogo.versao.length              > 10 ||
        jogo.tamanho            == undefined   ||   jogo.tamanho.length     > 10    || 
        jogo.descricao          == undefined   ||
        jogo.foto_capa          == undefined   ||   jogo.foto_capa.length   > 200   ||
        jogo.link               == undefined   ||   jogo.link.length        > 200   

      ){
        return MESSAGE.ERROR_REQUIRE_FIELDS //400
    }else{
        // encaminha os dados do novo banco para ser inserido no BD
        let resultjogo = await jogoDAO.insertJogo(jogo)

        if(resultjogo)
            return MESSAGE.SUCCESS_CREATED_ITEM //201
        else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }

}else{{
    return MESSAGE.ERROR_CONTENT_TYPE //415
}
       
        } 
    } catch (error) {
        return ERROR_INTERNAL_SERVER_CONTROLER
}

}

//Função para atualizar um jogo
const atualizarJogo = async function(jogo, id, contentType){ 


    
    try{

        console.log(jogo)
        if(contentType == 'application/json'){


            if( jogo.nome               == undefined   ||   jogo.nome               == ''   || jogo.nome                == null     ||  jogo.nome.length                > 80 ||
                jogo.data_lancamento    == undefined   ||   jogo.data_lancamento    == ''   || jogo.data_lancamento     == null     ||  jogo.data_lancamento.length     > 10 ||
                jogo.versao             == undefined   ||   jogo.versao             == ''   || jogo.versao              == null     ||  jogo.versao.length              > 10 ||
                jogo.tamanho            == undefined   ||   jogo.tamanho.length     > 10    || 
                jogo.descricao          == undefined   ||
                jogo.foto_capa          == undefined   ||   jogo.foto_capa.length   > 200   ||
                jogo.link               == undefined   ||   jogo.link.length        > 200   
        
              ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{

                //Validar se o ID existe no BD
                let resultJogo = await  buscarJogo(parseInt(id))
console.log(resultJogo)
                if(resultJogo.status_code == 200){
                    //update

                //adiciona um atributo id no Json para encaminhar id da requisição
                jogo.id = parseInt(id)
                let result = await jogoDAO.updateJogo(jogo)
console.log(result)
                if(result){
                    return MESSAGE.SUCCESS_UPDATE_ITEM
                }

                }else if(resultJogo.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
                }
            }
        } else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        

    }

}

//Função para excluir um jogo
const deletarJogoPorID = async function(id){ 
   
try{

  if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
    return MESSAGE.ERROR_REQUIRE_FIELDS //400
  }else{
    let resultJogo= await buscarJogo(parseInt(id))
    console.log(resultJogo)
    if(resultJogo.status_code == 200){
        let result = await jogoDAO.deleteJogo(parseInt(id))

        if(result){
            return MESSAGE.SUCCESS_DELETED_ITEM
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }else if(resultJogo.status_code == 404){
        return MESSAGE.ERROR_NOT_FOUND
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    } 
 } 
}
catch (error) {
console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
}

}

//Função para retornar um jogo
const listarJogo = async function(){ 


try{

let dadosjogos = {}


let resultjogo = await jogoDAO.selectAllJogo()

if(resultjogo != false){


if(resultjogo != false || typeof(resultjogo) == 'object'){
    
}

if(resultjogo.length > 0){

    //CRIA UM OBJETO DO TIPO JASON
    dadosjogos.status = true
    dadosjogos.status_code = 200
    dadosjogos.items = resultjogo.length
    dadosjogos.games = resultjogo

    return dadosjogos //200



}else{
    return MESSAGE.ERROR_NOT_FOUND //404
}

}else{
    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
}

} catch (error) {
   return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500

}


}

// função para buscar um jogo
const buscarJogo = async function(id) {
    try{
     if(id == '' || id == undefined|| id == null || isNaN(id) || id <=0){
        return MESSAGE.ERROR_REQUIRE_FIELDS //400
     }else{


        let dadosjogos = {}
        
        
        let resultjogo = await jogoDAO.selectByIDJogo(parseInt(id))
        
               
        
        if(resultjogo != false || typeof(resultjogo) == 'object'){
          
            if(resultjogo.length > 0){
        
                //CRIA UM OBJETO DO TIPO JASON
                dadosjogos.status = true
                dadosjogos.status_code = 200
                dadosjogos.games = resultjogo
            
                return dadosjogos //200
            
            
            
            }else{ 
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        
        
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

     }    
        
  } catch (error) {

    console.log(error)
           return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
        
        }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    deletarJogoPorID,
    listarJogo,
    buscarJogo,
    deletarJogoPorID
}