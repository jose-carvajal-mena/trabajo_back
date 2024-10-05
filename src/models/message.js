// models/message.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Chats',  // Nombre de la tabla Chat
          key: 'id',
        },
        onDelete: 'CASCADE',  // Si se elimina el chat, se eliminan los mensajes
        onUpdate: 'CASCADE',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',  // Nombre de la tabla User
          key: 'username',
        },
        onDelete: 'CASCADE',  // Si el usuario es eliminado, también los mensajes
        onUpdate: 'CASCADE',
      },
      
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,  // Validación para asegurar que no esté vacío
        },
      },
    }, {
      timestamps: true,
      tableName: 'messages',
    });
  
    // Definir relaciones
    Message.associate = function(models) {
      // El mensaje pertenece a un chat
      Message.belongsTo(models.Chat, {
        foreignKey: 'chatId',
      });
  
      // El mensaje pertenece a un usuario
      Message.belongsTo(models.User, {
        foreignKey: 'username',
      });
    };
  
    return Message;
  };
  