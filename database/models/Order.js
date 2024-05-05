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
        album_id: {
            type:dataTypes.INTEGER,
            allowNull:false,
        }
    }
    let config = {
        tableName: 'Order',
        timestamps: false  
    }
    const Order = sequelize.define(alias, columns, config)

    Order.associate= function(models){
        Order.belongsTo(models.Albums, {
            as:"albums",
            foreignKey: "album_id",
        })
    }
    return Order
}