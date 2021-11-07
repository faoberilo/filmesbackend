const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
const filmesRouter = require('./routes/filmes.routes')

app.use(express.json());
app.use(cors());    
app.use('/filmes', filmesRouter)

app.listen(port, ()=> {
    console.log(`O app esta rondando em: http://localhost:${port}`)
});