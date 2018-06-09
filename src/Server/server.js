
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var config= require('../config/database');
var users = require('../Routes/users');
var Picker = require('pickerjs');

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

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var entrySchema = new Schema({
    EntryID: {
        type: ObjectId,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    StartDay: {
        type: String,
        required: true
    },
    EndTime: {
        type: String,
        required: true
    },
    EndDay: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String
    }
});

var Entry = mongoose.model('Entry', entrySchema);

app.use(passport.initialize());
app.use(passport.session());

require('../config/passport')(passport);

app.use('/users', users);

//Set Static Folder
app.use(express.static(path.join(__dirname, '..', 'public')));


app.post('/', function (req,res){
    Entry.find({StartDay: req.body.startDay, UserName: req.body.userName}, function (err, entries) {
        res.send(entries);
    });
});

app.post('/all', function (req,res){
    Entry.find({UserName: req.body.userName},function (err, entries) {
        res.send(entries);
    });
});

app.post('/add', function (req, res) {
    var entry = new Entry({
        Title:req.body.title,
        Description:req.body.description,
        EntryID: mongoose.Types.ObjectId(),
        StartTime:req.body.startTime,
        StartDay:req.body.startDay,
        EndTime:req.body.endTime,
        EndDay:req.body.endDay,
        UserName:req.body.userName
    });
    entry.save(function (err) {
        if(err){
            console.log(err);
        }else {
            res.send();
        }
    });
});

app.post('/delete', function (req, res) {
    var title = req.body.title;
    var startTime = req.body.startTime;
    var userName = req.body.userName;
    var entry = Entry.find({Title:title,StartTime:startTime,UserName:userName});
    entry.remove(function (err) {
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
