const express = require('express');
// const multer = require('multer');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require("mongodb");
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

// const editJsonFile = require("edit-json-file");
// let file = editJsonFile('./ProfileImages.json');

var transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'kanriprogram@gmail.com',
    pass: 'kanri@2022'
  },
  tls: {
    rejectUnauthorized: false
  },
});
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions))



const app = express();
const port = 3001;


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var FCM = require('fcm-node');
var serverKey = 'AAAAAM1_SiQ:APA91bFcaNAG4MYJlBhMAehb2sVKPmwslmYX5EVmr05OqwCInXnyhhTQVWeu1HwaWeIAqEaXVPFqTAmLFFXzOxFoY90H4ifnGNMoF3pVgK55XVYVXq3zv6YldN2B3NS9PMw5RQhjyBlj';
var fcm = new FCM(serverKey);
var DeviceToken = '';


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
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    BirthDate: new Date(req.body.BirthDate),
    Country: req.body.Country,
    PhoneNumber: req.body.PhoneNumber,
    Email: req.body.Email,
    Password: req.body.Password,
    Token:'',
  };
  users.find({ Email: req.body.Email }, { projection: { _id: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      const user = users.insertOne(query);
      res.send(JSON.stringify(`Here is what you sent me: ${req.body.FirstName}`));
    }
    else {
      res.send(JSON.stringify('existed'));
    }
  });

});
app.post("/checkFirstTime", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  users.findOne({ Email: req.body.Email }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
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
    QualificationDegree: req.body.QualificationDegree,
    Bio: req.body.Bio,
    ProfileImage: req.body.ProfileImage,
    InterestedIn: req.body.InterestedIn,
    Followers: req.body.Followers,
    Following: req.body.Following,
    Projects: req.body.Projects,
    Views: req.body.Views,
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    console.log("saved");
    res.send(JSON.stringify("saved"));
  });
});

//login
app.post("/getUser", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  users.findOne({ Email: req.body.Email }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log(result.Password);
      res.send(JSON.stringify(result.Password));
    }

  });
});

app.post("/sendCode", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  users.find({ Email: req.body.Email }, { projection: { _id: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.send(JSON.stringify("Email does not exist"));
    }
    else {
      console.log(result.FirstName)
      const code = Math.random().toString(36).substring(2, 7);
      var mailOptions = {
        from: 'KANRI',
        to: req.body.Email,

        subject: 'Code verifying for change password',
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
          code: code // replace {{company}} with My Company
        }
        // html: '<h1>{{code}}</h1>'      
      };
      transporter.sendMail(mailOptions, function (error, info) {
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

app.post("/changePassword", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { Password: req.body.Password } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    // console.log(req.body.Password);
    res.send(JSON.stringify(req.body.Password))
    // db.close();
  });
});

////profile
app.post("/getInfo", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');

  users.findOne({ Email: req.body.Email }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log('getinfo')
      res.send(JSON.stringify(result));

    }

  });
})
app.post("/getUserInfo", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');

  users.findOne({ Email: req.body.Email }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log('getUserinfo')
      res.send(JSON.stringify(result));

    }

  });
})

app.post("/updateImage", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { ProfileImage: req.body.ProfileImage } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Image updated"))
  });
});
app.post("/updateNickName", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { NickName: req.body.NickName } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Nick Name updated"))
  });
});
app.post("/updateQualificationDegree", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { QualificationDegree: req.body.QualificationDegree } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Qualification Degree updated"))
  });
});
app.post("/updateBio", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { Bio: req.body.Bio } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Bio updated"))
  });
});
app.post("/updateCountry", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { Country: req.body.Country } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Country updated"))
  });
});
app.post("/updateInterestedIn", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { InterestedIn: req.body.InterestedIn } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Interested In updated"))
  });
});
app.post("/updatePhoneNumber", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { PhoneNumber: req.body.PhoneNumber } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Phone Number updated"))
  });
});


app.post("/getData", (req, res) => {


  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  users.find({}, { projection: { _id: 1, NickName: 1, Email: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      console.log("no Data")
      res.send(JSON.stringify("null"));
    }
    else {
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});

app.post("/saveProjectInfo", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  const query = {
    Email: req.body.Email,
    CustomerEmail: req.body.CustomerEmail,
    ProjectName: req.body.ProjectName,
    ProjectMission: req.body.ProjectMission,
    ProjectDescription: req.body.ProjectDescription,
    ProjectBudget: req.body.ProjectBudget,
    DeadLine: req.body.DeadLine,
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    // console.log(result.ops._id);
    res.send(JSON.stringify(result));
  });
});
app.post("/getProjectsInfo", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.find({ Email: req.body.Email }, { projection: { _id: 1, ProjectName: 1, ProjectMission: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.send(JSON.stringify("null"));
    }
    else {
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  });
})
app.post("/getProjectInfo", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.findOne({ Email: req.body.Email, _id: ObjectId(req.body.ProjectID) }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      res.send(JSON.stringify(result));
    }

  });

})

app.post("/UpdateProjectMission", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  // console.log(req.body.Mission)
  var myquery = { Email: req.body.Email, _id: ObjectId(req.body.ProjectID) };
  var newvalues = { $set: { ProjectMission: req.body.Mission } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Mission updated"))
  });
});
app.post("/UpdateProjectDescription", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  // console.log(req.body.Mission)
  var myquery = { Email: req.body.Email, _id: ObjectId(req.body.ProjectID) };
  var newvalues = { $set: { ProjectDescription: req.body.Description } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Description updated"))
  });
});

app.post("/UpdateProjectBudget", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  // console.log(req.body.Mission)
  var myquery = { Email: req.body.Email, _id: ObjectId(req.body.ProjectID) };
  var newvalues = { $set: { ProjectBudget: req.body.Budget } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Budget updated"))
  });
});
app.post("/UpdateProjectDeadLine", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  // console.log(req.body.Mission)
  var myquery = { Email: req.body.Email, _id: ObjectId(req.body.ProjectID) };
  var newvalues = { $set: { DeadLine: req.body.DeadLine } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("DeadLine updated"))
  });
});
app.post("/getAddedMembers", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  users.find({ ProjectID: req.body.ProjectID }, { projection: { _id: 0, ProjectID: 1, MemberID: 1, Accepted: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      console.log("gg")
      res.send(JSON.stringify("null"));
    }
    else {
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});
app.post("/saveMember", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  const query = {
    ProjectID: req.body.ProjectID,
    MemberID: req.body.MemberID,
    Accepted: false
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    // console.log(result.ops._id);
    res.send(JSON.stringify(result));
  });
});
app.post("/deleteTeamMember", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  const query = {
    ProjectID: req.body.ProjectID,
    MemberID: req.body.MemberID,
  };
  const user = users.deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send(JSON.stringify(obj));
  });

});






app.post("/sendToken", (req, res) => {

  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  var newvalues = { $set: { Token: req.body.Token } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Token  updated"))
  });

});

app.post("/getToken", (req, res) => {


  const database = client.db('KANRI');
  const users = database.collection('users');
  users.findOne({ Email: req.body.Email }, { projection: { _id: 0, Token:1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
       console.log(result);
      res.send(JSON.stringify(result));

    }

  });
});

app.post("/sendNotification", (req, res) => {
  // console.log('dd')
  // console.log(DeviceToken)
  var message = {
    to: req.body.Token,
    notification: {
      title: 'NotifcatioTestAPP',
      body: '{"Message from node js app"}',
    },

    data: { //you can send only notification or only data(or include both)
      title: 'ok cdfsdsdfsd',
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
    }

  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }

  });
  res.send(JSON.stringify('send success'))
});



app.listen(port, () => console.log(`Yes, Your server is running on port ${port}`));
