
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
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jetbrains');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var entrySchema = new Schema({
    EntryID: {
        type: ObjectId,
        required: true
    },
    UserID: {
        type: ObjectId,
        required: true
    },
    CategoryID: {
        type: ObjectId,
        required: true
    },
    StartDateTime: {
        type: String,
        required: true
    },
    EndDateTime: {
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
var userID = mongoose.Types.ObjectId();
var categoryID = mongoose.Types.ObjectId();

app.use('/users', users);

//Set Static Folder
app.use(express.static(path.join(__dirname, '..', 'public')));





var Entry = mongoose.model('Entry', {name:String});


app.get('/', function (req,res){
    Entry.find(function (err, entries){
        res.send(entries);
    });
});


app.post('/add', function (req, res) {
    var entry = new Entry({
        Title:req.body.title,
        Description:req.body.description,
        EntryID: mongoose.Types.ObjectId(),
        StartDateTime:req.body.startDateTime,
        EndDateTime:req.body.endDateTime,
        CategoryID:categoryID,
        UserID:userID
    });
    emtry.save(function (err) {
        if(err){
            console.log(req.body);
        }else {
            res.send();
        }
    });
});

app.post('/delete', function (req, res) {
    var title = req.body.title;
    var entry = Entry.find({name:name});
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
