module.exports = (sequelize, dataTypes) =>{
    let alias = 'Photo'
    let columns = {
        photo_id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        link: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }
    let config = {
        tableName: 'Photo',
        timestamps: false  
    }
    const Photo = sequelize.define(alias, columns, config)
    return Photo
}