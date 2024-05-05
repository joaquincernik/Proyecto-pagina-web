module.exports={
  "development": {
    "username": "user",
    "password": "0101",
    "database": "Proyecto-pagina-web",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "user",
    "password": "0101",
    "database": "database_test",
    "host": "webserver.rossogustavo.com.ar",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "0101",
    "database": "Proyecto-pagina-web",
    "host": "webserver.rossogustavo.com.ar",
    "dialect": "mysql"
  }
}


ALTER TABLE `Proyecto-pagina-web`.`Order` 
ADD INDEX `album_id_idx` (`album_id` ASC) VISIBLE;
;
ALTER TABLE `Proyecto-pagina-web`.`Order` 
ADD CONSTRAINT `album_id`
  FOREIGN KEY (`album_id`)
  REFERENCES `Proyecto-pagina-web`.`Album` (`album_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

