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
// devuelve poligonos y lineas
router.get('/ar/:lng/:lat', async (req, res, next) => {
  // bd osm_ar
  const sqlSelectAddress = `SELECT * FROM vamyal.getAddress(${req.params.lng}, ${req.params.lat})`
  const sqlSelectPolygons = `SELECT * FROM vamyal.getPolygons(${req.params.lng}, ${req.params.lat})`
  try {
    const rowsA = await db.query(sqlSelectAddress)
    const rowsP = await db.query(sqlSelectPolygons)
    if (rowsA.length || rowsA.length) {
      res.status(200).json(
        { 
          success: true, 
          data: { 
            address: (rowsA[0].getaddress ? rowsA[0].getaddress : ''), 
            polygons: (rowsP[0].getpolygons ? rowsP[0].getpolygons : '')
          }, 
          ip: req.ips 
        })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

// solo lineas
router.get('/ar/lines/:lng/:lat', async (req, res, next) => {
  // bd osm_ar
  const sqlSelectAddress = `SELECT * FROM vamyal.getAddress(${req.params.lng}, ${req.params.lat})`
  try {
    const rowsA = await db.query(sqlSelectAddress)
    if (rowsA.length) {
      res.status(200).json({ success: true, data: { address : rowsA[0].getaddress }, ip: req.ips })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

// solo poligonos
router.get('/ar/polygons/:lng/:lat', async (req, res, next) => {
  // bd osm_ar
  const sqlSelectPolygons = `SELECT * FROM vamyal.getPolygons(${req.params.lng}, ${req.params.lat})`
  try {
    const rowsP = await db.query(sqlSelectPolygons)
    if (rowsP.length) {
      res.status(200).json({ success: true, data: { polygons: rowsP[0].getpolygons }, ip: req.ips })
    } else {
      res.status(404).json({ success: false, data: {}, message: 'No se obtuvieron resultados.' })
    } 
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Error al buscar la dirección.' })  
  }
  
})

module.exports = router
