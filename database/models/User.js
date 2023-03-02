module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users'
    let columns = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
    }
    let config = {
        tableName: 'User',
        timestamps: false  
    }
    const User = sequelize.define(alias, columns, config)

    
    return User
}