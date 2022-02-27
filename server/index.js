const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://maya:Xoxc2KXtm1FjIW71@kanri1.adawo.mongodb.net/KANRI?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    
      await client.connect();

  }
  run().catch(console.dir);
app.get("/get", (req, res) => {
    const database = client.db('KANRI');
    const employees = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
    //   const query = { title: req.body.name };
      employees.find({ title: "Back to the Future" },{ projection: { _id: 1, title: 1}}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
      });
      
      
      
      
  res.send(JSON.stringify(`Here is what you sent me: ${req.body.name}`));
    
    
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
      const user = users.insertOne(query);
    //   console.log(movie);
  res.send(JSON.stringify(`Here is what you sent me: ${req.body.FirstName}`));
});


app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));



