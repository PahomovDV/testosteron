// eslint-disable-next-line import/no-commonjs
module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id        : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            email     : { type: Sequelize.STRING, allowNull: false, unique: true },
            userName  : { type: Sequelize.STRING, require: true, unique: true },
            token     : { type: Sequelize.STRING, require: true },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Users');
    }
};
