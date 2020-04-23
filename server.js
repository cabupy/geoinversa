require('dotenv').config()

const http = require('http')
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  cors({
    methods: ['OPTIONS', 'GET'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  })
)

// Algunas cuestiones para estar detras de NGINX
app.set('trust proxy', true)
app.set('strict routing', true)
app.set('case sensitive routing', true)
// Agragamos el header powered-by en un middleware
app.set('x-powered-by', false)
app.use( (req, res, next) => {
  res.header('X-Powered-By', 'Cabu Vallejos <cabu.dev>');
  res.header('X-Hello-Human', 'Hola humano !');
  next();
})

app.use(volleyball)

app.use('/v1', routes)

// El resto de metodos y rutas
app.use('*', function (req, res, next) {
  res.status(200).json({
    success: false,
    message: 'API para GEOINVERSA - No se encontró la ruta.',
  })
  next()
})

console.time('Arrancamos el server en')
const server = http
  .createServer(app)
  .listen(process.env.PORT, process.env.IP, () => {
    console.log(`http://${server.address().address}:${server.address().port}`)
    console.timeEnd('Arrancamos el server en')
  })

// Si hay una promesa sin un catch
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: ${p} reason: ${reason}`)
  process.exit(1)
})

// Si ocurre alguna exception que no este debidamente tratada.
process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err}\n`)
  process.exit(1)
})
