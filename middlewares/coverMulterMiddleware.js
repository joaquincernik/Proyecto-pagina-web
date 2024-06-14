const multer = require('multer')
const path=require("path")
//multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        //console.log(file);
        callBack(null, req.params.id+"-"+file.originalname  )
    }
})


/*multer sftp
var sftpStorage = require('multer-sftp')
 
var storage = sftpStorage({
  sftp: {
    host: 'webserver.rossogustavo.com.ar',
    port: 2222,
    username: 'jcernik',
    password: 'jciua$2023'
  },
  destination: function (req, file, cb) {
    cb(null, '/home/jcernik/')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id+"-"+file.originalname)
  }
})
/*multer ftp
const FTP =require('ftp');
const ftpClient = new FTP();
const FTPStorage = require('multer-ftp');
const connection = {
    host: 'webserver.rossogustavo.com.ar',
    port: 2222,
    username: 'jcernik',
    password: 'jciua$2023'
};

ftpClient.connect(connection);

var storage = new FTPStorage({
  basepath: '/home/jcernik/', // base path for file uploads on the server
  connection: ftpClient,
  /*destination: function (req, file, cb) {
    cb(null, '/home/jcernik/')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id+"-"+file.originalname)
  }*/
  /*destination: function (req, file, options, callback) {
    const name = Date.now() + '-ss.jpeg';
    callback(null, '/home/jcernik/' + name); // custom file destination, file extension is added to the end of the path
  },
});
*/
// onReady FTP
/*ftpClient.on('ready', function (e) {
  var upload = multer({ storage: storage });

  // Then you upload only when ready => connected
  upload(req, res, function (err) {
    // Do your stuff
    //  On the doc of FTP you can use destroy() too, but i didnt try it.
    ftpClient.end();
    if (err) {
      // Err
    } else {
      // Good
    }
  });
});*/
/*var upload = multer({
    storage: storage
});
*/
var upload = multer({ storage: storage });

module.exports=upload