module.exports = (sequelize, dataTypes) =>{
    let alias = 'Photos'
    let columns = {
        photo_id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        link: {
            type: dataTypes.STRING,
            allowNull: false
        },
        album_id: {
            type:dataTypes.INTEGER,
            allowNull:false,
        }
    }
    let config = {
        tableName: 'Photo',
        timestamps: false  
    }
    const Photo = sequelize.define(alias, columns, config)

    Photo.associate= function(models){
        Photo.belongsTo(models.Albums, {
            as:"albums",
            foreignKey: "album_id",
        })
    }
    return Photo
}