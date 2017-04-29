var baseDao = require('./mysql_application')


var getAllUsers = function (callback) {
    baseDao.getData('SELECT *  FROM USERS', callback);
}

var search = function (searchQuery, callback) {
    baseDao.getData('SELECT *  FROM USERS WHERE FIRST_NAME LIKE (\'%' + searchQuery + '%\') ' +
        'OR LAST_NAME LIKE (\'%' + searchQuery + '%\')', callback);
}

var getByUserId = function (id, callback) {
    baseDao.getData('SELECT USER_ID,FIRST_NAME,LAST_NAME,STATUS FROM USERS WHERE USER_ID=\'' + id + '\'', callback);
}

var doLogin = function (login, password, callback) {
    baseDao.getData('SELECT USER_ID FROM USERS WHERE LOGIN=\'' + login + '\' AND ENC_PASSWORD=\'' + password + '\'', callback);
}

module.exports = {
    getAllUsers: function (callback) {
        return getAllUsers(callback);
    },
    search: function (searchQuery, callback) {
        return search(searchQuery, callback);
    },
    getByUserId: function (searchQuery, callback) {
        return getByUserId(searchQuery, callback);
    },
    login: function (login, password, callback) {
        return doLogin(login, password, callback);
    }
};

