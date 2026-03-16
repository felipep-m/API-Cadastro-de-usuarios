import express from 'express'
import mongoose from 'mongoose'
import dns from "node:dns/promises"; 
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express()
app.use (express.json())

// Conecta a aplicação ao banco de dados 
mongoose.connect('')

/* Informa que a conexão foi bem sucedida com o método .then e mostra no console, caso ocorra um erro,
informa qual o erro com o parametro "error" na função dentro do método .catch e mostra no console */
.then( () => console.log("CONECTADO AO BANCO DE DADOS"))
.catch( (error) => console.log(error))

// Cria um esquema para os usuários e define campos e regras de validação.
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    idade: {type: Number, requiered: true},
    email: {type: String, required: true, unique: true}
}, {timestamps: true})

const Usuario = mongoose.model('Usuario',usuarioSchema)

app.listen(3003, () => {
    // Informa que o servidor estão funcionando na porta 3000 corretamente. 
    console.log("Servidor Rodando")
})

// Listar todos os usuários 
app.get('/usuarios', async (request, response) => {
    
    // Procura os usuários no banco de dados
    const usuariosDoBanco = await Usuario.find()
    
    // Responde com os usuários encontrados
    response.json(usuariosDoBanco) 

})

// Criar um novo usuário
app.post('/usuarios', async (request, response) => {
    
    /* Cria um novo usuário no banco de dados, espera a resposta do banco (await)
     e armazena na variável usuarioCriado */ 
    const usuarioCriado = await Usuario.create(request.body)
    
    // Responde com o usuário criado
    response.json(usuarioCriado)
})



