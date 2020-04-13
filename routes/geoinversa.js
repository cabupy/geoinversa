const router = require('express').Router()

const db = require('../db')

router.get('/:lat/:lng', async (req, res, next) => {
  const sqlSelect = `SELECT * FROM public.geo_inversa_loc(${req.params.lat}, ${req.params.lng})`
  //console.log(sqlSelect)
  const rows = await db.query(sqlSelect)
  if (rows.length) {
    res.status(200).json({ success: true, data: rows, rowsCount: rows.length })
  } else {
    res.status(404).json({ success: false, data: [], rowsCount: rows.length })
  }
})

module.exports = router
