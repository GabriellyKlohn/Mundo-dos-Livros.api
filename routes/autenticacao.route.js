//Injeta o express e utiliza a função de roteamento
const  express = require('express');
const router = express.Router();
//Injeta  as funções de acesso ao banco de dados
const sql = require('../models/autenticacao.model');
//Injeta as funções de criptografia do sha1
const sha1 = require('sha1');
//Cria um endpoint para autenticar o usuário
router.post('/autenticar',(req,res)=>{
    //Armazena os dados do body em uma variável
    //para ficar mais legível
    let requisicao = req.body;
    //Criptografia a senha utilizando sha1
    requisicao.senha = sha1(requisicao.senha);
    //Executa a função para testar o acesso do usuário
    sql.autenticaUsuario(req.body.login,req.body.senha)
    .then((resposta)=>{
        //Pega a resposta da função e verifica se é um erro
        if(resposta instanceof Error){
            //Se for um erro envia o status 500 (erro no servidor)
            //com o erro
            res.status(500).json(resposta);
            return;
        }
        //Verifica se o tamanho da resposta é 1 (um usuário)
        if(resposta.length != 1){
            //Caso negativo, envia status 401 (não autorizado)
            res.status(401).json({mensagem:'Usuário não autorizado'})
            return;
        }
        //Envia o status 200 (ok)
        res.status(200).json(resposta);
    })
})

//Endpoint temporário para geração de senha criptografada
router.post('/geraSenhaCripto',(req,res)=>{
    //Guarda a senha em uma variavel
    let senha = req.body.senha;
    //Verifica se a senha não é vazia
    if(!senha || senha == ''){
        res.status(400).json({mensagem:'Senha vazia'})
        return;
    }
    senha = sha1(senha);
    res.status(201).json({senha})
})






module.exports = router;