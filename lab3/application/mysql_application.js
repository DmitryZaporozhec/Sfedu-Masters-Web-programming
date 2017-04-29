var mysql= require('mysql');
var applicationResponse =require('./ApplicationResponse')
var config = require('./config.json');
var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
});

var getData=function(sql, callback){
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            var response = applicationResponse.newInstance(err);
            response.status = "FAILURE";
            callback(response);
        }
        callback(new applicationResponse.newInstance(rows));
    });
}


module.exports = {
    getData:function (sql,callback) {
        return getData(sql,callback);
    }
};

