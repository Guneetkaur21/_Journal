var port = 4000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();
// // ---------------------------------------------------
// var formData  = require('./app/sign-up');

// app.post('/api/formData', function (req, res) {
//     let formDataObj = new formData(req, res)
//     formDataObj.getGrocery()
//   })
  
//   app.get('/api/formData', function (req, res) {
//     let formDataObj = new formData(req, res)
//     formDataObj.addGrocery() q
//   })

// ------------------------------------------------------

//View Engine
//app.set(path.join(__dirname));
app.set('src',path.join(__dirname,'src'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname,'client')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port, function(){
    console.log('Server started on port' + port)
});