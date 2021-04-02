// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('HistoryEvents', {
            id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            suiteId   : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'TSuites', key: 'id' } },
            userId    : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, references: { model: 'Users', key: 'id' } },
            table     : { type: Sequelize.STRING, require: true },
            event     : { type: Sequelize.STRING, require: true },
            payload   : { type: Sequelize.STRING, default: '', allowNull: true },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('HistoryEvents');
    }
};
