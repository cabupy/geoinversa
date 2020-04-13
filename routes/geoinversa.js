const router = require('express').Router()

const db = require('../db')

router.get('/:lat/:lng', async (req, res, next) => {
  const sqlSelect = `SELECT * FROM public.geo_inversa_loc(${req.params.lat}, ${req.params.lng})`
  try {
    const rows = await db.query(sqlSelect)
    if (rows.length) {
      res.status(200).json({ success: true, data: rows[0], ip: req.ip })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

module.exports = router
