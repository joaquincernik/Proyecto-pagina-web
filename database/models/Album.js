module.exports = (sequelize, dataTypes) =>{
    let alias = 'Albums'
    let columns = {
        album_id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        cover:{
            type:dataTypes.STRING,
            allowNull: false
        }
        
    }
    let config = {
        tableName: 'Album',
        timestamps: false  
    }
    const Album = sequelize.define(alias, columns, config)

    Album.associate= function(models){
        Album.hasMany(models.Photos, {
            as:"photos",
            foreignKey: "album_id",
        })
    }
    return Album
}