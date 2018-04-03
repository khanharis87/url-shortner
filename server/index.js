var express = require('express')
var app = express()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
      }
      else {
      //move on
        next();
      }
});

var users = []

//sign up send a user object, with username, id , password
app.post('/signup', function(req, res) {
    var user = req.body
    console.log(user)
    users.push(user)
    res.json({'sucess': true})
})

app.post('/login', function(req, res) {
    var loginUser = req.body
    var foundUser = users.find((user) => {
        return user.username === loginUser.username && user.password === loginUser.password
    })
    console.log('found', foundUser)
    console.log(users)
    res.json(foundUser)
})

//  app.get('/user', function(req, res) {
//      console.log(req.body)
//      const user = getUser(req.body)
//      console.log(user)
//      res.json(user)
//  })

 function getUser(username) {
    console.log('USERNAME', username, users)
    return users.find((user) => {
         console.log(user, user.username, username)
         return user.username === username
     })
 }

app.post('/shortenLink', function(req, res) {
    var username =  req.body.username
    var user = getUser(username)
    user.links.push(req.body.links)
    console.log(user)
    res.sendStatus(200)
})

app.put('/shortenLink', function(req, res) {
    var username =  req.body.username
    console.log('username', username)
    var user = getUser(username)
    console.log(user, req.body.links)
    user.links = req.body.links
    res.end()
})

var server = app.listen(3000, function() {
    console.log('Server running at http://localhost:' + server.address().port)
})