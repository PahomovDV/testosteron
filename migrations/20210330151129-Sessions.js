// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Sessions', {
            id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            token     : { type: Sequelize.STRING },
            status    : { type: Sequelize.ENUM('ACTIVE', 'NONE', 'DISABLED'), defaultValue: 'NONE' },
            suiteId   : { type: Sequelize.INTEGER, allowNull: false },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Sessions');
    }
};
