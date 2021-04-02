// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('TSuites', {
            id          : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            projectId   : { type: Sequelize.INTEGER, allowNull: false },
            userId      : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, references: { model: 'Users', key: 'id' } },
            name        : { type: Sequelize.STRING, default: '' },
            description : { type: Sequelize.STRING, default: '' },
            createdAt   : { type: Sequelize.DATE, allowNull: false },
            updatedAt   : { type: Sequelize.DATE, allowNull: false },
            deletedAt   : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('TSuites');
    }
};
