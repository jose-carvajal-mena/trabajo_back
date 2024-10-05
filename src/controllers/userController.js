const { User } = require('../models'); // Asegúrate de tener el modelo User importado

// Crear un nuevo usuario
const createUser = async (ctx) => {
    const { username } = ctx.request.body;
    try {
        const newUser = await User.create({ username });
        ctx.body = newUser;
        ctx.status = 201; // Created
    } catch (error) {
        // Si el error es que el usuario ya existe, manejarlo de manera adecuada
        if (error.name === 'SequelizeUniqueConstraintError') {
            ctx.body = { message: 'El nombre de usuario ya está en uso.' };
            ctx.status = 409; // Conflict
        } else {
            ctx.body = { error: error.message };
            ctx.status = 400; // Bad Request
        }
    }
};

// Manejar el inicio de sesión
const loginUser = async (ctx) => {
    const { username } = ctx.request.body;
    try {
        // Verifica si el usuario existe
        const user = await User.findByPk({username});
        if (!user) {
            ctx.body = { error: 'Usuario no encontrado.' };
            ctx.status = 404; // Not Found
            return;
        }

        // Si el usuario existe, retornar su información
        ctx.body = user;
        ctx.status = 200; // OK
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Obtener todos los usuarios
const getAllUsers = async (ctx) => {
    try {
        const users = await User.findAll();
        ctx.body = users;
        ctx.status = 200; // OK
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Obtener detalles de un usuario por su username
const getUserDetails = async (ctx) => {
    const { username } = ctx.params;
    try {
        const user = await User.findByPk(username);
        if (user) {
            ctx.body = user;
            ctx.status = 200; // OK
        } else {
            ctx.body = { error: 'User not found' };
            ctx.status = 404; // Not Found
        }
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

// Obtener todos los chats de un usuario
const getUserChats = async (ctx) => {
    const { username } = ctx.params;
    try {
        // Aquí debes implementar la lógica para obtener los chats de un usuario
        // Puede involucrar una consulta a la base de datos usando el modelo Chat
        const chats = await Chat.findAll({ where: { username1: username } }); // Cambia según tu lógica
        ctx.body = chats;
        ctx.status = 200; // OK
    } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500; // Internal Server Error
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserDetails,
    getUserChats
};
