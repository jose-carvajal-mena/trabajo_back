const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes.js');
const orm = require('./models');

const app = new Koa();

// Conecta a la base de datos antes de usar orm
orm.sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
        app.context.orm = orm;

        app.use(cors());
        app.use(KoaLogger());
        app.use(koaBody());
        app.use(router.routes());
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    })
    .finally(() => { // Ejecuta esto después de la conexión o del error
        app.listen(3000, () => {
            console.log('Servidor Koa escuchando en el puerto 3000');
        });
    });

module.exports = app; 