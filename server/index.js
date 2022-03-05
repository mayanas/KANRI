const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'kanriprogram@gmail.com',
    pass: 'kanri@2022'
  },
  tls: {
    rejectUnauthorized:false
  },
});

const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://maya:122001@kanri1.adawo.mongodb.net/KANRI?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    
      await client.connect();

  }
  run().catch(console.dir);

  
  app.post("/getUser", (req, res) => {
    const database = client.db('KANRI');
    const users = database.collection('users');
    users.findOne({ Email: req.body.Email },function(err, result) {
      if (err) throw err;
      if(result==null)res.send(JSON.stringify("null"));
      else{
        // console.log(result.Password);
        res.send(JSON.stringify(result.Password));
      }
      
    });
  });


app.post("/addUser", (req, res) => {
  const database = client.db('KANRI');
    const users = database.collection('users');
      const query = { 
        FirstName: req.body.FirstName,
        LastName:req.body.LastName,
                Gender: req.body.Gender,
                BirthDate: new Date(req.body.BirthDate),
                Country:req.body.Country,
                PhoneNumber: req.body.PhoneNumber,
                Email: req.body.Email,
                Password:req.body.Password,
      };
      users.find({ Email: req.body.Email },{ projection: { _id: 1}}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length==0)
        {
          const user = users.insertOne(query);
          res.send(JSON.stringify(`Here is what you sent me: ${req.body.FirstName}`));
        }
        else{
          res.send(JSON.stringify('existed'));
        }
      });
      
});

app.post("/sendCode", (req, res) => {
      const database = client.db('KANRI');
      const users = database.collection('users');  
      users.find({ Email: req.body.Email },{ projection: {_id: 1}}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length==0){
          res.send(JSON.stringify("Email does not exist"));
        }
      else{
        // console.log(result.length)
        const code=Math.random().toString(36).substring(2,7);
        var mailOptions = {
        from: 'kanriprogram@gmail.com',
        to: req.body.Email,
      
        subject: 'Sending Email using Node.js',
        text: `Hi Smartherd, thank you for your nice Node.js tutorials.
            I will donate 50$ for this course. Please send me payment options.`+code
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          // console.log('Email sent');
          // console.log(info.response);
          res.send(JSON.stringify(code));
        }
      });
    }
      });
});

app.post("/changePassword",(req,res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: {Password: req.body.Password} };
  users.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    // console.log(req.body.Password);
    res.send(JSON.stringify(req.body.Password))
    // db.close();
  });
});

app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));
