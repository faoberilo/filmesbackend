const express = require('express');
const router = express.Router();
var id=0
var filmes=[
    {
        nome:"Jurassic Park",
        capa:"https://upload.wikimedia.org/wikipedia/pt/thumb/e/e7/Jurassic_Park_poster.jpg/250px-Jurassic_Park_poster.jpg",
        genero:"Ficção",
        nota:9,
        id: id
    }
];

router.get("/",(req,res)=>{
    res.send(filmes);
});

router.get("/:id", (req,res)=>{
    const idParam = req.params.id;
    const filme = filmes.find(filme=> filme.id == idParam);
    if(!filme) {
        res.status(404).send({
            message: 'Filme não encontrado'
        })
        return;
    }
    res.send(filme);
    
});

router.post("/add",(req,res)=>{
    const filme = req.body;
    filme.id  = id+1;
    id++;
    if(!filme || !filme.nome || !filme.capa || !filme.genero || !filme.nota) {
        res.status(400).send({
            message: 'Filme não cadastrado esta faltando algum campo!!!'
        })
        return;
    }
    filmes.push(filme);
    res.status(201).send({
        message: 'Cadastrado com sucesso',
        data: filme
    });
});

router.put('/edit/:id', (req, res) => {
    const filmeEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }
    res.send({
        message: `Filme atualizado com sucesso`,
        data: filmes[index]
    })
});

router. delete('/delete/:id',(req,res)=>{
    const idParam = req.params.id;
    const index = filmes.findIndex(filme=>filme.id==idParam);
    filmes.splice(index,1);
    res.send({
        message: "Filme excluido com sucesso!!!"
    });
});

module.exports = router;
