// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('TCases', {
            id             : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            area           : { type: Sequelize.STRING, default: '' },
            description    : { type: Sequelize.INTEGER, default: '' },
            expectedResult : { type: Sequelize.STRING, default: '' },
            notes          : { type: Sequelize.STRING, allowNull: true },
            status         : { type: Sequelize.ENUM('PASSED', 'FILED', 'NOT_TESTED'), defaultValue: 'NOT_TESTED' },
            isDeleted      : { type: Sequelize.INTEGER, length: 1, allowNull: false, default: 0 },
            createdBy      : { type: Sequelize.STRING },
            updatedBy      : { type: Sequelize.STRING },
            createdAt      : { type: Sequelize.DATE, allowNull: false },
            updatedAt      : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('TCases');
    }
};
