const router = require('express').Router()

const db = require('../db')

// Para AyudaPY
router.get('/:lat/:lng', async (req, res, next) => {
  // bd osm_py
  const sqlSelect = `SELECT * FROM public.geo_inversa_loc(${req.params.lat}, ${req.params.lng})`
  try {
    const rows = await db.query(sqlSelect)
    if (rows.length) {
      res.status(200).json({ success: true, data: rows[0], ip: req.ips })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

// Para Argentina por vos. Ejemplo: http://localhost:33000/v1/geoinversa/ar/-58.382675/-34.603728
router.get('/ar/:lng/:lat', async (req, res, next) => {
  // bd osm_ar
  const sqlSelect = `SELECT * FROM vamyal.getAddress(${req.params.lng}, ${req.params.lat})`
  try {
    const rows = await db.query(sqlSelect)
    if (rows.length) {
      res.status(200).json({ success: true, data: rows[0], ip: req.ips })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

module.exports = router
