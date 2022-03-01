const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

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
        // Query for a movie that has the title 'Back to the Future'
        const query = {"Email": req.body.Email,};
        users.find({ Email: req.body.Email },{ projection: { _id: 1, Password: 1}}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result[0].Password);
          res.send(JSON.stringify(result[0].Password));
        });
  });
  app.post("/getEmail", (req, res) => {
    const database = client.db('KANRI');
      const users = database.collection('users');
        // Query for a movie that has the title 'Back to the Future'
        // const query = {"Email": req.body.Email,};
        users.find({ Email: req.body.Email },{ projection: { _id: 1}}).toArray(function(err, result) {
          if (err) throw err;
          // console.log(result[0].Password);
          // if(result.length==0)
          res.send(JSON.stringify(result.length));
          // else res.send(JSON.stringify("1"));
        });
  });
app.post("/addUser", (req, res) => {
  const database = client.db('KANRI');
    const users = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
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
        // console.log(result[0].Password);
        if(result.length==0)
        {
          const user = users.insertOne(query);
          res.send(JSON.stringify(`Here is what you sent me: ${req.body.FirstName}`));
        }
        else{
          res.send(JSON.stringify('existed'));
        }
        // res.send(JSON.stringify(result.length));
        // else res.send(JSON.stringify("1"));
      });
      
});


app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));



