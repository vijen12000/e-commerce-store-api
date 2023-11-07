const {DataTypes} = require("sequelize");

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}
module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define('user', UserModel);
    },
    createUser: (user) => {
        return this
            .model
            .create(user);
    },
    findAllUsers: (query) => {
        return this
            .model
            .findAll({where: query})
    }
}