// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('TSuits', {
            id          : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            name        : { type: Sequelize.STRING, default: '' },
            description : { type: Sequelize.STRING, default: '' },
            isDeleted   : { type: Sequelize.INTEGER, length: 1, allowNull: false, default: 0 },
            createdBy   : { type: Sequelize.STRING },
            updatedBy   : { type: Sequelize.STRING },
            createdAt   : { type: Sequelize.DATE, allowNull: false },
            updatedAt   : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('TSuits');
    }
};
