const pg = require('pg')

// esto se setea en el archivo .env, en la raiz del proyecto
const postgres = {
  database: process.env.PG_DB,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASS
}

module.exports = {
  query: strSQL => {
    return new Promise((resolve, reject) => {
      const client = new pg.Client(postgres)
      client.connect(err => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          client.query(strSQL, (err, result) => {
            if (err) {
              reject(err)
            } else {
              switch (result.command) {
                case 'SELECT':
                  resolve(result.rows)
                  break
                default:
                  resolve(result)
                  break
              }
              client.end()
            }
          })
        }
      })
    })
  },
}
