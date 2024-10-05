const { Chat, Message } = require('../models'); // Importar los modelos Chat y Message
const { Op } = require('sequelize'); 
// Crear un nuevo chat
const createChat = async (ctx) => {
    const { username1, username2 } = ctx.request.body;
    try {
        const newChat = await Chat.create({ username1, username2 });
        ctx.body = newChat;
        ctx.status = 201; // Created
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 400; // Bad Request
    }
};

// Obtener todos los mensajes de un chat
const getChatMessages = async (ctx) => {
    const { id } = ctx.params;
    try {
        const messages = await Message.findAll({ where: { chatId: id } });
        ctx.body = messages;
        ctx.status = 200; // OK
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Eliminar un chat
const deleteChat = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Chat.destroy({ where: { id } });
        await Message.destroy({ where: { chatId: id } }); // Eliminar mensajes asociados
        ctx.status = 204; // No Content
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Obtener un chat por ID
const getChatById = async (ctx) => {
    const { id } = ctx.params;
    try {
        const chat = await Chat.findByPk(id);
        if (!chat) {
            ctx.body = { error: 'Chat not found' };
            ctx.status = 404; // Not Found
        } else {
            ctx.body = chat;
            ctx.status = 200; // OK
        }
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Obtener chat entre dos usuarios
const getChatBetweenUsers = async (ctx) => {
    const { username1, username2 } = ctx.params;
    try {
        const chat = await Chat.findOne({
            where: {
                [Op.or]: [
                    { username1, username2 },
                    { username1: username2, username2: username1 }
                ]
            }
        });
        if (!chat) {
            ctx.body = { error: 'Chat not found' };
            ctx.status = 404; // Not Found
        } else {
            ctx.body = chat;
            ctx.status = 200; // OK
        }
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

module.exports = {
    createChat,
    getChatMessages,
    deleteChat,
    getChatById,
    getChatBetweenUsers
};
