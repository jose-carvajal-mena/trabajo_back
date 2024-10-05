const Router = require('koa-router');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');
const router = new Router();

// Rutas para User
router.post('/users', userController.createUser); // Crear un usuario
router.get('/users', userController.getAllUsers); // Listar todos los usuarios
router.get('/users/:username', userController.getUserDetails); // Detalle de un usuario
router.post('/users/:username', userController.loginUser); // Detalle de un usuario
router.get('/users/:username/chats', userController.getUserChats); // Chats de un usuario

// Rutas para Chat
router.post('/chats', chatController.createChat); // Crear un chat entre dos usuarios
router.get('/chats/:id/messages', chatController.getChatMessages); // Obtener mensajes de un chat
router.delete('/chats/:id', chatController.deleteChat); // Eliminar un chat
router.get('/chats/:id', chatController.getChatById); // Obtener un chat
router.get('/chats/:username1/:username2', chatController.getChatBetweenUsers); // Obtener el chat entre dos usuarios

// Rutas para Message
router.post('/messages', messageController.createMessage); // Crear un mensaje
router.get('/messages/:id', messageController.getMessage); // Obtener un mensaje específico
router.put('/messages/:id', messageController.updateMessage); // Actualizar un mensaje
router.delete('/messages/:id', messageController.deleteMessage); // Eliminar un mensaje

module.exports = router;
