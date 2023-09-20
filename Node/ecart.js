var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/ewebdb");

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit:'50mb' ,extended: true}));
app.use(cors());

app.use(express.static('./images'))

var Shop = require('./shoping')

app.use("/",Shop);

app.listen(8000);