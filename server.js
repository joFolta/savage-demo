// IN HOUSES
// add THUMBS DOWN (add one more PUT)
// and add to client-side JS (main.js)

// and PERSONAL ONE. CRUD

//Load Module
const express = require('express')
const app = express()
//body parser pulls data from forms
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
//MongoClient = Mongo library

var db, collection;

//MongoDB Atlas URL, DATABASE
const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

//callback function
app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// all files in PUBLIC FOLDER are routed/ served up
app.use(express.static('public'))

//.get .post .delete .put are EXPESS METHODS


// WEB API BELOW -----------------------------------------------------------------------------------------------------------------------------------------------------------------

//CRUD
//READ (GET)
//put endpoint = /
app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    //result is now ARRAY
    //index.html not being used
    if (err) return console.log(err)
    //.render() renders out HTML from .EJS
    res.render('index.ejs', {messages: result})
    //messages can be "zebra" as long as it is changed in index.ejs file
      // ??????????????? HOW IS IT CONNECTED

  })
})

//CREATE (POST)
//ties to FORM in .ejs (rendered as HTML), <form action = messages
  // <form action="/messages" method="POST">
  //bodyParser gets info from form: (req.body.NAME   and req.body.MSG)
      // <input type="text" placeholder="name" name="NAME">
      // <input type="text" placeholder="message" name="MSG">

//why can't i navigate to localhost:3000/messages????
app.post('/messages', (req, res) => {
  // console.log(req)
  //PRINTS req object to terminal
  db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    // GET REQUEST TO GO BACK TO ROOT/HOME "/"
    res.redirect('/')
  })
})

//UPDATE (PUT)
//put endpoint = /messages
app.put('/thumbUp', (req, res) => {
  db.collection('messages')
  //mongoDB method .findOneAndUpdate (finds first instance where matches Name, MSG)
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      //adds one to thumb count
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    //sorts, top to bottom or bottom to top
    sort: {_id: -1},
    // upsert, if you can't find document with that message, then create that document
    //ok to change to FALSE
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



app.put('/messagesDown', (req, res) => {
  db.collection('messages')
  //mongoDB method .findOneAndUpdate (finds first instance where matches Name, MSG)
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      //adds one to thumb count
      thumbUp:req.body.thumbUp - 1
    }
  }, {
    //sorts, top to bottom or bottom to top
    sort: {_id: -1},
    // upsert, if you can't find document with that message, then create that document
    //ok to change to FALSE
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


//DELETE (DELETE)
//put endpoint = /messages
app.delete('/messages', (req, res) => {
  //mongoDB method .findOneAndDelete
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
