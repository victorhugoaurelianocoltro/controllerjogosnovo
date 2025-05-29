/**************************************************
 * Objetivo: 
 * Data: 20/02/2025
 * Autor: Victor Hugo
 * Versão: 1.0
 * Observação:
 * *******Para confifgurar e instalar a API, precisamos das seguintes Bibliotecas
 *                            express            npm install express --save
 * 
 * 
 * 
 * para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando: 
 * npx prisma migrate dev
 *************************************************/


// Import das bibliotecas 
const express      = require('express')                                                              
const cors         =  require('cors')
const bodyParser   = require('body-parser')

const controllerConversas = require('./controller/conversas/controllerconversas.js');
const controllerHistorico = require('./controller/historico/controllerhistorico.js');
const controllerJogo = require('./controller/jogo/controllerjogo.js')
const controllerAvaliacao = require('./controller/jogo/avaliacoes.js')
const controllerPagamento = require('./controller/jogo/pagamento.js')
const amigojogadorController = require('./controller/amigoJogador.js');


// Estabelecendo o formato de dados que devera chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//cria o objeto app criar a API
const app = express()

app.use((request, response, next)   =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')


    app.use(cors())
    next()

})


// apartir daqui é a tabela jogosavaliacao

//  jogosavaliacao  -  inserir
app.post('/v1/controle-jogos/avaliacoes', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerAvaliacao.inserirAvaliacao(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// jogosavaliacao - listar todos
app.get('/v1/controle-jogos/avaliacoes', cors(), bodyParserJSON, async function (request, response) {
    let result = await controllerAvaliacao.listarAvaliacoes()

    response.status(result.status_code)
    response.json(result)
})

// jogosavaliacao - Atualizar
app.put('/v1/controle-jogos/avaliacoes/:id', cors(), bodyParserJSON, async (request, response) => {
    try {
        let idAvaliacao = request.params.id;
        let dadosBody = request.body;

        console.log('ID:', idAvaliacao);
        console.log('Body:', dadosBody);

        let result = await controllerAvaliacao.atualizarAvaliacao(idAvaliacao, dadosBody);

        response.status(result.status_code).json(result);
    } catch (error) {
        console.error('Erro na rota PUT avaliação:', error);
        response.status(500).json({ status: false, message: 'Erro interno.' });
    }
});


//apartir daqui é a tabela pagamento

// Pagamento - Inserir
app.post('/v1/controle-jogos/pagamento', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let result = await controllerPagamento.inserirPagamento(dadosBody, contentType);
    response.status(result.status_code).json(result);
});


// Pagamento - Listar todos
app.get('/v1/controle-jogos/pagamento', cors(), async (request, response) => {
    let result = await controllerPagamento.listarPagamentos();
    response.status(result.status_code).json(result);
});

// Pagamento - Buscar por ID
app.get('/v1/controle-jogos/pagamento/:id', cors(), async (request, response) => {
    let result = await controllerPagamento.buscarPagamento(request.params.id);
    response.status(result.status_code).json(result);
});

// Pagamento -  Atualizar
app.put('/v1/controle-jogos/pagamento/:id', cors(), bodyParserJSON, async (request, response) => {
    let result = await controllerPagamento.atualizarPagamento(request.params.id, request.body);
    response.status(result.status_code).json(result);
});

// Pagamento - Deletar
app.delete('/v1/controle-jogos/pagamento/:id', cors(), async (request, response) => {
    let result = await controllerPagamento.deletarPagamento(request.params.id);
    response.status(result.status_code).json(result);
});


// apartir daqui é a tabela historico

//historico - Inserir
app.post('/v1/controle-jogos/historico', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await controllerHistorico.inserirHistorico(dadosBody, contentType);
    response.status(result.status_code).json(result);
});

//historico -  Listar todos
app.get('/v1/controle-jogos/historico', cors(), async (request, response) => {
    let result = await controllerHistorico.listarHistoricos();
    response.status(result.status_code).json(result);
});


//historico -  buscar por id
app.get('/v1/controle-jogos/historico/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let result = await controllerHistorico.buscarHistorico(id);
    response.status(result.status_code).json(result);
});


//historico - Atualizar 
app.put('/v1/controle-jogos/historico/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id;
    let dadosBody = request.body;

    let result = await controllerHistorico.atualizarHistorico(id, dadosBody);
    response.status(result.status_code).json(result);
});


//historico -  Deletar
app.delete('/v1/controle-jogos/historico/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let result = await controllerHistorico.deletarHistorico(id);
    response.status(result.status_code).json(result);
});


// apartir daqui é a tabela conversas

// conversas - Inserir
app.post('/v1/controle-jogos/conversas', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await controllerConversas.inserirConversa(dadosBody, contentType);
    response.status(result.status_code).json(result);
});


// conversas -  Listar todos
app.get('/v1/controle-jogos/conversas', cors(), async (request, response) => {
    let result = await controllerConversas.listarConversas();
    response.status(result.status_code).json(result);
});


// conversas - Buscar por ID 
app.get('/v1/controle-jogos/conversas/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let result = await controllerConversas.buscarConversa(id);
    response.status(result.status_code).json(result);
});


// conversas -  Atualizar
app.put('/v1/controle-jogos/conversas/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id;
    let dadosBody = request.body;

    let result = await controllerConversas.atualizarConversa(id, dadosBody);
    response.status(result.status_code).json(result);
});


// conversas -  Deletar
app.delete('/v1/controle-jogos/conversas/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let result = await controllerConversas.deletarConversa(id);
    response.status(result.status_code).json(result);
});



// apartir daqui é a tabela amigojogador

// amigojogador - Inserir
app.post('/amigo-jogador', async (req, res) => {
    const result = await amigoJogadorController.inserirAmigoJogador(req.body, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

// amigojogador - Atualizar
app.put('/amigo-jogador/:id', async (req, res) => {
    const result = await amigoJogadorController.atualizarAmigoJogador(req.params.id, req.body);
    res.status(result.status_code).json(result);
});

// amigojogador - Deletar
app.delete('/amigo-jogador/:id', async (req, res) => {
    const result = await amigoJogadorController.deletarAmigoJogador(req.params.id);
    res.status(result.status_code).json(result);
});

// amigojogador - Listar todos
app.get('/amigo-jogador', async (req, res) => {
    const result = await amigoJogadorController.listarAmigosJogador();
    res.status(result.status_code).json(result);
});

// amigojogador - Buscar por ID
app.get('/amigo-jogador/:id', async (req, res) => {
    const result = await amigoJogadorController.buscarAmigoJogador(req.params.id);
    res.status(result.status_code).json(result);
});





//EndPoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogos', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type 
let contentType = request.headers['content-type']

// console.log(Request.headers)
    //recebe o conteudo do body da requisição
    let dadosbody = request.body

    //Encaminhando  os dados do body da requisição para a controller inserir  no BD
    let resultJogo = await controllerJogo.inserirJogo(dadosbody, contentType)


    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo',  cors(), bodyParserJSON, async function (request, response) {
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo/:id', cors(), async function(request, response) {
    let idJogo = request.params.id

    let resultJogo = await controllerJogo.buscarJogo(idJogo); 

    response.status(resultJogo.status_code); 
    response.json(resultJogo); 
});

app.delete('/v1/controle-jogos/jogo/:id', cors(), async function(request, response) {

//recebe o id da requisição
    let idJogo = request.params.id 

    let resultJogo = await controllerJogo.deletarJogoPorID(idJogo); 

    response.status(resultJogo.status_code); 
    response.json(resultJogo); 
});



app.put('/v1/controle-jogos/jogo/:id',cors(), bodyParserJSON ,async function (request, response) {
    let contentType = request.headers['content-type']
    let idJogo = request.params.id
    let dadosbody = request.body

    let resultJogo = await controllerJogo.atualizarJogo(dadosbody,idJogo, contentType)



    response.status(resultJogo.status_code)
    response.json(resultJogo)

})


app.listen(8080, function(){
    console.log('API aguardando requisições . . .')
})  