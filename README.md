### API GeoInversa

> API para devolver direcciones mediante coordenadas (lng, lat) decimales.

###### Clonar el proyecto

```bash
git clone https://github.com/cabupy/geoinversa.git
cd geoinversa/
npm install
```

##### Configurar dotenv()

En la raiz del proyecto crear el archivo `.env`

```bash
cd geoinversa/
touch .env
```

Dentro del archivo incluir las siguientes variables de entorno para `process.env` 

```bash
IP='localhost'
PORT=33000
PG_DB='osm_ar'
PG_PORT=5432
PG_HOST='localhost'
PG_USER='postgres'
PG_PASS='postgres
```

##### OSM Argentina

Descargar la BD Postgresql + Postgis

Archivo: [osm_ar.sql.bzip2](http://s3.vamyal.com/osm_ar.sql.bz2) 

##### Levantar el proyecto node (en desarrollo)

```bash
cd geoinversa/
nodemon server.js
```

##### Levantar el proyecto node (en producción)

Usar systemctl o en su defecto pm2.

### Autor

- Carlos Vallejos, `Vamyal S.A.`