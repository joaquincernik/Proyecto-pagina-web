module.exports = (sequelize, dataTypes) =>{
    let alias = 'Orders'
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
        address: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        photos: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
    }
    let config = {
        tableName: 'Order',
        timestamps: false  
    }
    const Order = sequelize.define(alias, columns, config)

    
    return Order
}