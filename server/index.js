const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://maya:t7uVCgICtMSMsNX1@kanri1.adawo.mongodb.net/KANRI?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    
      await client.connect();

  }
  run().catch(console.dir);
app.get("/get", (req, res) => {
    const database = client.db('testproject');
    const employees = database.collection('employee');
      // Query for a movie that has the title 'Back to the Future'
    //   const query = { title: req.body.name };
      employees.find({ title: "Back to the Future" },{ projection: { _id: 1, title: 1}}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
      });
      
      
      
      
  res.send(JSON.stringify(`Here is what you sent me: ${req.body.name}`));
    
    
});
app.post("/wow/post", (req, res) => {
  console.log(req.body.name);
  const database = client.db('testproject');
    const movies = database.collection('employee');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: req.body.name };
      const movie = movies.insertOne(query);
    //   console.log(movie);
  res.send(JSON.stringify(`Here is what you sent me: ${req.body.name}`));
});


app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));



