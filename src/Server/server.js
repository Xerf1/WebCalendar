
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());

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


var userID = mongoose.Types.ObjectId();
var categoryID = mongoose.Types.ObjectId();



app.post('/', function (req,res){
    Entry.find({StartDay:req.body.startDay}, function (err, entries){
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
        CategoryID:categoryID,
        UserID:userID
    });
    entry.save(function (err) {
        if(err){
            console.log(err);
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
app.listen(3000);