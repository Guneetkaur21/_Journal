var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Guneet:Newgen186#@ds213832.mlab.com:13832/sign_in', ['tasks']);
var db2 = mongojs('mongodb://Guneet:Newgen186#@ds213832.mlab.com:13832/sign_in', ['EditorContent']);
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
//var jwt = require('jsonwebtoken');

router.post('/content', function (req, res, next) {
    var body = req.body;
    //  console.log("the body of request:",body);

    db2.EditorContent.findOne({ title:body.title }, function (err, result) {
        if (err)
            res.send(err);
        console.log("In the server, the value of result is:", result);
        if (result == null) {
            console.log("Result is null");
            db2.EditorContent.save(body, function (err, rep) {
                if (err) {
                    res.send(err);
                }
                    res.json(rep);
            });
        }
        else {
            console.log("In else");
            var updated = {
                title:body.title,
                content: body.content,
                date: body.date,
                username:body.username
            };
            console.log("username in body:",body.username);
            console.log("content to be updated:",updated);
            console.log(result._id);
            db2.EditorContent.update({
                _id:result._id,
            }, updated, {}, function (err, task) {
                console.log(task);
                if (err) {
                    res.send(err);
                }
                res.json(task);
            });
        }
    });

    
})

router.post('/display_content', function (req, res, next) {
    var body = req.body;
    // console.log("this is from the method to get all the journals of :",body.username);
    db2.EditorContent.find({ username: body.username }, function (err, result) {
        //    console.log("result:",result);
        res.send(result);
    });
});

router.post('/readMore', function (req, res, next) {
    var body = req.body;
    console.log("The object which came in the server file is:", body);
    console.log("The id from db:", mongojs.ObjectId(body.id));
    db2.EditorContent.find({ id: mongojs.ObjectId(body.id) }, function (err, result) {
        console.log("id:", _id);
        console.log("result:", result);
        res.send(result);
    });
});

//Get all tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

router.post('/task/username', function (req, res, next) {
    var body = req.body;
    console.log("this is from the method to check unique username:", body.username);
    db.tasks.findOne({ name: body.username }, function (err, result) {
        if (err)
            res.send(err);
        console.log("In the server, the value of result is:", result);
        if (result == null) {
            res.send("false");
        } else {
            res.send("true");
        }
    });
});

//Get single tasks
router.post('/task/name', function (req, res, next) {
    var task = req.body;
    var flag = 0;
    console.log(task.username);
    console.log(task.password);
    var x = task.password;  // x has the password in string type that has been entered on sign in time
    var h = bcrypt.hashSync(task.password, salt);

    db.tasks.findOne({ name: task.username }, function (err, task) {
        console.log("In findOne function!");
        if (err) {
            console.log("There's an error!");
            res.send(err);
        }
        if (task == null) {
            res.send("false");
        }
        else {
            console.log("In else");
            console.log(task);
            //task.password has the hashed password from the db corresponding to name.
            bcrypt.compare(x, task.password, function (err, result) {
                console.log("result:", result);
                if (result) {
                    console.log("Verified");

                } else {
                    console.log("Wrong Email or password!");
                }
                res.send(result);
            });
        }
    });

});




//});

//Save Task - POST
router.post('/task', function (req, res, next) {
    var task = req.body;
    var hash = bcrypt.hashSync(task.passwordText, salt);
    var newData = {
        name: task.userName,
        password: hash,
        email: task.email,
        fname: task.firstname,
        lname: task.lastname,
        cnfmpass: task.confirmpasswordText,
    };
    //console.log("values :", newData)
    db.tasks.save(newData, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Delete Task
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Update task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updated = {
        name: task.name,
        password: task.password,
        email: task.email,
        fname: task.fname,
        lname: task.lname,
        cnfmpass: task.confirmpasswordText,
    };


    db.tasks.update({
        _id: mongojs.ObjectId(req.params.id),
    }, updated, {}, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router;

router.post('/task/findUser', function (req, res, next) {
    console.log("Request body:", req.body);
    var task = req.body;
    console.log(task.password);
    var hash = bcrypt.hashSync(task.Password, salt);
    //db.tasks.getUser(task.userName);
    return db.tasks.auth({ username: task.userName, password: task.password });
});



// router.put('/task/:id', function(req, res, next){
//     var task = req.body;
//     var updTask = {};

//     if(task.isDone){
//         updTask.isDone = task.isDone;
//     }

//     if(task.title){
//         updTask.title = task.title;
//     }

//     if(!updTask){
//         res.status(400);
//         res.json({
//             "error":"Bad Data"
//         });
//     } else {
//         db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
//         if(err){
//             res.send(err);
//         }
//         res.json(task);
//     });
//     }
// });


// db.tasks.findOne({ _id: mongojs.ObjectId(req.id) }, function (err, task) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.json(task);
    // });


    // db.tasks.findOne({email:userName} , function (err,task){
    //     if (err) { return done(err); }
    //     if (!user) {
    //         return done(null, false, {
    //           message: 'User not found'
    //         });
    //       }
    //     if (!user.validPassword(password)) {
    //         return done(null, false, {
    //         message: 'Password is wrong'
    //         });
    //     }
    //     return done(null, user);
    // });

    // db.tasks.find({_name : mongojs.ObjectId(req.params.name) } , function(err,task){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(task);
    // }); 

    //db.tasks.find ({ _id:})