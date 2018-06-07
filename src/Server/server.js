
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var config= require('../config/database');
var users = require('../Routes/users');

mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', function(){
    console.log('Connected to database '+config.database);
});

//On Error
mongoose.connection.on('error', function(err){
    console.log('Database error: '+err);
});

//Port Number
var port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('../config/passport')(passport);

app.use('/users', users);

//Set Static Folder
app.use(express.static(path.join(__dirname, '..', 'public')));





var Entry = mongoose.model('Entry', {name:String});


app.get('/', function (req,res){
    Entry.find(function (err, products){
        res.send(products);
    });
});


app.post('/add', function (req, res) {
    var name = req.body.name;
    var product = new Entry({name:name});
    product.save(function (err) {
        if(err){
            console.log(err);
        }else {
            res.send();
        }
    });
});

app.post('/delete', function (req, res) {
    var name = req.body.name;
    var product = Entry.find({name:name});
    product.remove(function (err) {
        if(err){
            console.log(err);
        }else {
            res.send();
        }
    });
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});
