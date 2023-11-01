const express = require('express');
const cors = require('cors')
const rotas = require('./rotas/rotas');
const app = express()


app.use(cors())
app.use(express.json())
app.use(rotas)

app.listen(3000)

module.exports = app