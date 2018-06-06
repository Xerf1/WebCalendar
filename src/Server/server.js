
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jetbrains');


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
app.listen(3000);