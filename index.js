const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
// vamos carregar os middlwares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
// conexão com o servidor de banco de dados
const urldb = "mongodb+srv://senac:123senac@projetonode.xf4ib.mongodb.net/banco?retryWrites=true&w=majority&appName=ProjetoNode"
// estabelecer a conexão com o banco de dados
mongoose.connect(urldb,{useNewUrlParser:true, useUnifiedTopology:true});

//definir a estrutura dos dados
const tabela = new mongoose.Schema({
    nomecliente:String,
    email:String,
    telefone:String,
    usuario:{type:String, unique:true},
    senha:{type:String, required:true}
});
// criar este modelo de dados no banco de dados mongoose. (Criar a tabela)
const Cliente = mongoose.model("tbclientes",tabela);

app.get("/",(req,res)=>{
    Cliente.find().then((result)=>{
        res.status(200).send({dados:result});
    })
    .catch((erro)=>res.status(500).send({erro}));
});
app.get("/projeto/teste",(req,res)=>{
    res.send("Você está em outro endpoint");
});

//configuração do servidor
app.listen("5000",()=>console.log("Servidor online em http://127.0.0.1:5000"));

app.post("/inserir",(req,res)=>{
    const rs = new Cliente(req.body);
    rs.save().then((result,error)=>{
        if(error){
            return res.status(500).send({msg:"Erro"})
        }
        else{
            res.status(201).send({msg:result})
        }
    })
    .catch((er)=>res.status(500).send({msg:er}));
});    

