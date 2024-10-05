// models/chat.js
module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username1: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',  // Nombre de la tabla User
          key: 'username',
        },
        onDelete: 'CASCADE',  // Eliminar el chat si el usuario es eliminado
        onUpdate: 'CASCADE',
      },
      username2: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'username',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    }, {
      timestamps: true,
      tableName: 'chats',
    });
  
    // Definir relaciones
    Chat.associate = function(models) {
      // Un chat tiene muchos mensajes
      Chat.hasMany(models.Message, {
        foreignKey: 'chatId',
        onDelete: 'CASCADE', // Los mensajes serán eliminados si el chat es eliminado
      });
  
      // Relación con los usuarios
      Chat.belongsTo(models.User, { as: 'User1', foreignKey: 'username1' });
      Chat.belongsTo(models.User, { as: 'User2', foreignKey: 'username2' });
    };
  
    return Chat;
  };
  