const { Message, Chat } = require('../models'); // Importa los modelos

// Crear un nuevo mensaje
const createMessage = async (ctx) => {
  const { chatId,username, content } = ctx.request.body;
  try {
    const newMessage = await Message.create({ chatId, username,content });
    ctx.body = newMessage;
    
    ctx.status = 201; // Created
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // Bad Request
  }
};

// Obtener un mensaje específico
const getMessage = async (ctx) => {
  const { id } = ctx.params;
  try {
    const message = await Message.findByPk(id);
    if (message) {
      ctx.body = message;
      ctx.status = 200; // OK
    } else {
      ctx.body = { message: 'Mensaje no encontrado' };
      ctx.status = 404; // Not Found
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // Bad Request
  }
};

// Actualizar un mensaje
const updateMessage = async (ctx) => {
  const { id } = ctx.params;
  const { content } = ctx.request.body;
  try {
    const message = await Message.findByPk(id);
    if (message) {
      await message.update({ content });
      ctx.body = message;
      ctx.status = 200; // OK
    } else {
      ctx.body = { message: 'Mensaje no encontrado' };
      ctx.status = 404; // Not Found
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // Bad Request
  }
};

// Eliminar un mensaje
const deleteMessage = async (ctx) => {
  const { id } = ctx.params;
  try {
    const message = await Message.findByPk(id);
    if (message) {
      await message.destroy();
      ctx.status = 204; // No Content
    } else {
      ctx.body = { message: 'Mensaje no encontrado' };
      ctx.status = 404; // Not Found
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 400; // Bad Request
  }
};

module.exports = {
  createMessage,
  getMessage,
  updateMessage,
  deleteMessage,
};