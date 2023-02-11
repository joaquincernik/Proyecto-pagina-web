module.exports = (sequelize, dataTypes) =>{
    let alias = 'Photo'
    let columns = {
        photo_pk: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.VARCHAR(45),
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        link: {
            type: dataTypes.VARCHAR(45),
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