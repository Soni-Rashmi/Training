const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.listen(process.env.PORT || 3000);
app.use(bodyParser.json({limit: '5mb'}));
app.get('/', function(req, res) {
    res.send('Hello world');
});

var conn = new sequelize('my_db', 'root', '', {
    dialect: 'mysql',
    "host": 'localhost',
    "port": '3307',
    define: {timestamps: false}
    }
)
var modal = conn.define('employees', {
    id: {type: sequelize.INTEGER, primaryKey: true},
    name: sequelize.STRING,
    city: sequelize.STRING,
    state: sequelize.STRING
});
app.get('/getEmployee', function(req, res) {
    modal.findAll().then(data => {
        res.send(data);
        return data;
    })
});

app.post('/addEmployee', function(req, res) {
    console.log(req.body);
    res.send(req.body);
    if(!req.body) {
        res.send(400);
    } else {
        modal.create(req.body).then(success => {
            console.log('Success');
        });
    }
})
