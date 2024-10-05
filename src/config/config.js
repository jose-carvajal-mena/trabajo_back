


module.exports = {
  "development": {
    "username": "postgres",
    "password": "hola",
    "database": 'ejemplo',  
    "host": "127.0.0.1",
    "port": 5432,  
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `${process.env.DB_NAME}_test`,  // Base de datos de prueba
    "host": process.env.DB_HOST,
    "port": 5433,  // Puerto correcto
    "dialect": "postgres",
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `${process.env.DB_NAME}_production`,  // Base de datos de producción
    "host": process.env.DB_HOST,
    "port": 5433,  // Puerto correcto
    "dialect": "postgres",
  }
}
