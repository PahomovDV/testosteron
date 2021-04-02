// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('TCases', {
            id             : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            suiteId        : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'TSuites', key: 'id' } },
            userId         : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, references: { model: 'Users', key: 'id' } },
            area           : { type: Sequelize.STRING, default: '' },
            description    : { type: Sequelize.INTEGER, default: '' },
            expectedResult : { type: Sequelize.STRING, default: '' },
            notes          : { type: Sequelize.STRING, allowNull: true },
            status         : { type: Sequelize.ENUM('PASSED', 'FILED', 'NOT_TESTED'), defaultValue: 'NOT_TESTED' },
            createdAt      : { type: Sequelize.DATE, allowNull: false },
            updatedAt      : { type: Sequelize.DATE, allowNull: false },
            deletedAt      : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('TCases');
    }
};
