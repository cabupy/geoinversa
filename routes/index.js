const router = require('express').Router()

const Geoinversa = require('./geoinversa')

router.use('/geoinversa', Geoinversa)

module.exports = router