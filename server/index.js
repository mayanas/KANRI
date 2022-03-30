const express = require('express');
// const multer = require('multer');
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


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const uri =
  "mongodb+srv://maya:122001@kanri1.adawo.mongodb.net/KANRI?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    
      await client.connect();

  }
  run().catch(console.dir);



//register
  app.post("/addUser", (req, res) => {
    // console.log(req.body.FirstName);
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
  app.post("/checkFirstTime", (req, res) => {
    // console.log(req.body.Email)
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    users.findOne({ Email: req.body.Email },function(err, result) {
      if (err) throw err;
      if(result==null)res.send(JSON.stringify("null"));
      else{
        // console.log(result.Password);
        res.send(JSON.stringify("found"));
      }
      
    });
  });

  app.post("/saveProfileInfo", (req, res) => {
    // console.log(req.body.Email)
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    const query = { 
      Email: req.body.Email,
      NickName: req.body.NickName,
      QualificationDegree : req.body.QualificationDegree,
      Bio: req.body.Bio,
      ProfileImage: req.body.ProfileImage,
      InterestedIn: req.body.InterestedIn,
      Followers: req.body.Followers,
      Following: req.body.Following,
      Projects: req.body.Projects,
      Views: req.body.Views,
    };
    const user = users.insertOne(query, function(err, result) {
      if (err) throw err;
      console.log("saved");
      res.send(JSON.stringify("saved"));
    });
  });

  //login
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

  ////profile
  app.post("/getInfo",(req,res)=>{
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');

    users.findOne({ Email: req.body.Email },function(err, result) {
      if (err) throw err;
      if(result==null)res.send(JSON.stringify("null"));
      else{
        // console.log('getinfo')
        res.send(JSON.stringify(result));
        
      }
      
    });
  })
  app.post("/getUserInfo",(req,res)=>{
    const database = client.db('KANRI');
    const users = database.collection('users');

    users.findOne({ Email: req.body.Email },function(err, result) {
      if (err) throw err;
      if(result==null)res.send(JSON.stringify("null"));
      else{
        // console.log('getUserinfo')
        res.send(JSON.stringify(result));
        
      }
      
    });
  })
  
  app.post("/updateImage",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {ProfileImage: req.body.ProfileImage} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Image updated"))
    });
  });
  app.post("/updateNickName",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {NickName: req.body.NickName} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Nick Name updated"))
    });
  });
  app.post("/updateQualificationDegree",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {QualificationDegree: req.body.QualificationDegree} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Qualification Degree updated"))
    });
  });
  app.post("/updateBio",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {Bio: req.body.Bio} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Bio updated"))
    });
  });
  app.post("/updateCountry",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('users');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {Country: req.body.Country} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Country updated"))
    });
  });
  app.post("/updateInterestedIn",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('ProfileInfo');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {InterestedIn: req.body.InterestedIn} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Interested In updated"))
    });
  });
  app.post("/updatePhoneNumber",(req,res) => {
    const database = client.db('KANRI');
    const users = database.collection('users');
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: {PhoneNumber: req.body.PhoneNumber} };
    users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Phone Number updated"))
    });
  });




app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));
