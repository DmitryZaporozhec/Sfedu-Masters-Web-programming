var express = require('express');
var app = express();
var userDao = require('./application/UserDao');
var session = require('express-session')
var applicationResponse = require('./application/ApplicationResponse')
var crypto = require('crypto');
var bodyParser = require("body-parser");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'MyApplication_', cookie: {maxAge: 300000}, resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);

function checkPermissions(req, res, next) {
    if (req.session.userId) {
        console.log("Check permissions:" + req.session.userId);
        userDao.getByUserId(req.session.userId, function (user) {
            if ("SUCCESS" === user.status && user.data && user.data.length === 1) {
                //update cookie
                req.session.userId = user.data[0].USER_ID;
                console.log("update id:" + req.session.userId);
                next(user.data);
            } else {
                res.redirect('/sessions/new');
            }
        });
    } else {
        res.redirect('/sessions/new');
    }
}

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

app.get('/getAllUsers', function (req, res) {
    checkPermissions(req, res, function () {
        userDao.getAllUsers(function (response) {
            res.send(response);
        });
    });
});

app.get('/info', function (req, res) {
    checkPermissions(req, res, function (userData) {
        res.send(applicationResponse.newInstance(userData));
    });
});


app.get('/searchUser/:searchQuery', function (req, res) {
    userDao.search(req.params.searchQuery, function (response) {
        res.send(response);
    });
});

app.get('/sessions/new', function (req, res) {
    var resp = applicationResponse.newInstance("/login.html");
    resp.status = "REDIRECT";
    res.send(resp);
});

app.post('/sessions', function (req, res) {
    userDao.login(req.body.login, encryptPassword(req.body.password, req.body.login), function (response) {
        if ("SUCCESS" === response.status) {
            if (response.data && response.data.length === 1) {
                var resp = applicationResponse.newInstance("/index.html");
                resp.status = "REDIRECT";
                req.session.userId = response.data[0].USER_ID;
                console.log("My User Id:" + req.session.userId);
                res.send(resp);
            } else {
                var resp = applicationResponse.newInstance("wrong credentials");
                resp.status = "FAILURE";
                res.send(resp);
            }
        } else {
            res.send(response);
        }
    });
});

app.delete('/sessions', function (req, res) {
    // Удалить сессию
    if (req.session) {
        req.session.destroy(function () {
           // req.session.userId=null;
        });
    }
    res.redirect('/sessions/new');
});

var encryptPassword = function (password, salt) {
    return crypto.createHmac('sha1', "changeIt").update(password).digest('hex');
}

process.on('uncaughtException', function (ex) {
    console.log("Error:" + ex);
});


