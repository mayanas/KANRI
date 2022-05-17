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
    Token: '',
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
    FollowersList:[],
    FollowingsList:[],
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
  users.find({}, { projection: { _id: 1, NickName: 1, Email: 1, InterestedIn: 1 } }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      console.log("no Data")
      res.send(JSON.stringify("null"));
    }
    else {
      // console.log(result)
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
    RemainingBudget: req.body.RemainingBudget,
    DeadLine: req.body.DeadLine,
    MeetingLink: "",
    MeetingDate: "",
    CreationTime: req.body.CreationTime,
    Messages:[],
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    // console.log(result.ops._id);
    var myquery = { Email: req.body.Email };
    var newvalues = { $set: { Projects: req.body.Projects } };
    database.collection('ProfileInfo').updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      // res.send(JSON.stringify("Phone Number updated"))
    });
    res.send(JSON.stringify(result));
  });
});
app.post("/getProjectsInfo", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.find({ Email: req.body.Email }).toArray(function (err, result) {
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
    MemberEmail: req.body.MemberEmail,
    // ProjectName: req.body.ProjectName,
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
    const query1 = {
      ProjectID: req.body.ProjectID,
      MemberEmail: req.body.MemberEmail
    };
    // console.log(req.body.MemberEmail)
    database.collection('ProjectTasks').deleteOne(query1, function (err, obj) {
      if (err) throw err;
      const query2 = {
        Type: req.body.Type,
        SenderNickName: req.body.SenderNickName,
        SenderEmail: req.body.SenderEmail,
        ProjectID: req.body.ProjectID,
        ProjectName: req.body.ProjectName,
        ProjectMission: req.body.ProjectMission,
        RecieverEmail: req.body.RecieverEmail,
      };
      // console.log(req.body.id)
      database.collection('Invitations').deleteOne(query2, function (err, obj) {
        if (err) throw err;
        // console.log("project tasks document deleted");
        // res.send(JSON.stringify("Inviteedeleted"));
      });
    })
    console.log("1 document deleted");
    res.send(JSON.stringify("1 document deleted"));
  });

});

app.post("/getTeamMembers", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  users.find({ ProjectID: req.body.ProjectID, Accepted: true }, {
    projection: {
      _id: 1, ProjectID: 1,
      MemberID: 1, Accepted: 1, MemberEmail: 1, ProjectName: 1
    }
  }).toArray(function (err, result) {
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
app.post("/getTeamMembersChat", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  users.find({ ProjectID: req.body.ProjectID, Accepted: true }, { projection: { _id: 0, MemberEmail: 1 } }).toArray(function (err, result) {
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

app.post("/loadMembers", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  users.find({ _id: ObjectId(req.body.MemberID) }, {
    projection: {
      _id: 1, NickName: 1, QualificationDegree: 1,
      Email: 1
    }
  }).toArray(function (err, result) {
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

app.post("/getPhoneNumber", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('users');
  users.findOne({ Email: req.body.Email }, { projection: { _id: 0, PhoneNumber: 1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log(result.Password);
      res.send(JSON.stringify(result.PhoneNumber));
    }

  });
});
app.post("/getNickName", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  users.findOne({ Email: req.body.Email }, { projection: { _id: 0, NickName: 1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log(result.Password);
      res.send(JSON.stringify(result.NickName));
    }

  });
});
app.post("/AddTask", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  const query = {
    ProjectID: req.body.ProjectID,
    MemberEmail: req.body.MemberEmail,
    Title: req.body.Title,
    StartDate: req.body.StartDate,
    DeadLine: req.body.DeadLine,
    Content: req.body.Content,
    Priority: req.body.Priority,
    Approved: false,
    Status: "Not started yet",
    Budget: "0",
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    // console.log(result.ops._id);
    res.send(JSON.stringify(result));
  });
});
app.post("/loadTasks", (req, res) => {
  console.log(req.body);
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  console.log(req.body.ProjectID)
  users.find({ ProjectID: req.body.ProjectID }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      // console.log("gg")
      res.send(JSON.stringify("null"));
    }
    else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});
app.post("/updateApproved", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  // console.log(req.body.Mission)
  var myquery = { _id: ObjectId(req.body.id) };
  var newvalues = { $set: { Approved: req.body.Approved } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Approved updated"))
  });
});
app.post("/updateTask", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  // console.log(req.body.Mission)
  var myquery = { _id: ObjectId(req.body.TaskId) };
  var newvalues = {
    $set: {
      MemberEmail: req.body.MemberEmail,
      Title: req.body.Title,
      StartDate: req.body.StartDate,
      DeadLine: req.body.DeadLine,
      Content: req.body.Content,
      Priority: req.body.Priority,

      Approved: false
    }
  };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Approved updated"))
  });
});
app.post("/DeleteTask", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  const query = {
    _id: ObjectId(req.body.id),

  };
  console.log(req.body.id)
  const user = users.deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log("task document deleted");
    res.send(JSON.stringify(obj));
  });

});
app.post("/getProjectsJoined", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');

  users.find({ MemberEmail: req.body.Email }).toArray(function (err, result) {
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

app.post("/getProjectInfoJoined", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.findOne({ _id: ObjectId(req.body.ProjectID) }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      res.send(JSON.stringify(result));
    }

  });

})

app.post("/deleteFromProjects", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  const query = {
    _id: ObjectId(req.body.ProjectID),

  };

  const user = users.deleteOne(query, function (err, obj) {
    if (err) throw err;
    var query1 = {
      Email: req.body.Email,
    }
    console.log(req.body.Email);
    var newvalues = { $set: { Projects: req.body.Projects - 1 } }
    database.collection('ProfileInfo').updateOne(query1, newvalues, function (err, result) {
      if (err) throw err;
    })
    console.log("project document deleted");
    res.send(JSON.stringify(obj));
  });

});

app.post("/deleteFromProjectsTasks", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  const query = {
    ProjectID: req.body.ProjectID,

  };
  console.log(req.body.id)
  const user = users.deleteMany(query, function (err, obj) {
    if (err) throw err;
    console.log("project tasks document deleted");
    res.send(JSON.stringify(obj));
  });

});

app.post("/deleteFromProjectsTeamMembers", (req, res) => {
  // console.log(req.body.Email)
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  const query = {
    ProjectID: req.body.ProjectID,

  };
  console.log(req.body.id)
  const user = users.deleteMany(query, function (err, obj) {
    if (err) throw err;
    console.log("project team document deleted");
    res.send(JSON.stringify(obj));
  });

});
app.post("/saveTaskBudget", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  var myquery = { _id: ObjectId(req.body.TaskID) };
  var newvalues = { $set: { Budget: req.body.Budget } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    var myquery = { _id: ObjectId(req.body.ProjectID) };
    var newvalues = { $set: { RemainingBudget: req.body.RemainingBudget } };
    database.collection('Projects').updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
    })
    res.send(JSON.stringify("Task Budget updated"))
  });
});
app.post("/UpdateMeetingLink", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  // console.log(req.body.Mission)
  var myquery = { _id: ObjectId(req.body.ProjectID) };
  var newvalues = {
    $set: {
      MeetingLink: req.body.ZoomLink,
      MeetingDate: req.body.MeetingDate,
    }
  };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Meeting updated"))
  });
});
app.post("/getMeetingLink", (req, res) => {


  const database = client.db('KANRI');
  const users = database.collection('Projects');
  users.findOne({ _id: ObjectId(req.body.ID) }, { projection: { _id: 0, MeetingLink: 1, MeetingDate: 1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      console.log(result);
      res.send(JSON.stringify(result));

    }

  });
});

app.post("/Follow", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  var myquery = { Email: req.body.Email };
  var newvalues = {
    $set: {
      Followers: req.body.Followers,
      Followed: req.body.Followed,
      FollowersList: req.body.FollowersList
    }
  }
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    var following = 1
    console.log(req.body)
    var myquery = { Email: req.body.GuestEmail };
    var newvalues
    if (req.body.Followed) {
      following = 1
      newvalues = {
        $inc: { Following: following },
        $addToSet: { "FollowingsList": req.body.Email }
      }
    } else {
      following = -1
      newvalues = {
        $inc: { Following: following },
        $pull: { FollowingsList: req.body.Email }
      }
    }


    users.updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      // res.send(JSON.stringify("Follow updated"))
    });
    res.send(JSON.stringify("Follow updated"))
  });
})

app.post("/getProjectsHome", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.find().sort({ CreationTime: -1 }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.send(JSON.stringify("null"));
    }
    else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
})
app.post("/getMessages", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.findOne({ _id: ObjectId(req.body.ProjectID) }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log('getUserinfo')
      console.log(result.Messages);
      res.send(JSON.stringify(result.Messages));

    }

  });
})
app.post("/saveMessages", (req, res) => {
  console.log(req.body.ProjectID);
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  var myquery = { _id: ObjectId(req.body.ProjectID) };
  var newvalues = { $push: { Messages: req.body.messages } };
  const update = { $push: { "Messages": req.body.messages } };
  return users.updateOne(myquery, update);
});
app.post("/updateStatus", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTasks');
  // console.log(req.body.Mission)
  var myquery = { _id: ObjectId(req.body.id) };
  var newvalues = { $set: { Status: req.body.Status } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Status updated"))
  });
});
app.post("/Invitations", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Invitations');
  const query = {
    Type: req.body.Type,
    SenderNickName: req.body.SenderNickName,
    SenderEmail: req.body.SenderEmail,
    ProjectID: req.body.ProjectID,
    ProjectName: req.body.ProjectName,
    RecieverEmail: req.body.RecieverEmail,
    CreationTime: req.body.CreationTime,
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });

});
app.post("/InvitationsCustomer", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Invitations');
  const query = {
    Type: req.body.Type,
    SenderNickName: req.body.SenderNickName,
    SenderEmail: req.body.SenderEmail,
    ProjectName: req.body.ProjectName,
    ProjectMission: req.body.ProjectMission,
    ProjectDescription: req.body.ProjectDescription,
    ProjectBudget: req.body.ProjectBudget,
    ProjectDeadLine: req.body.ProjectDeadLine,

    RecieverEmail: req.body.RecieverEmail,
    CreationTime: req.body.CreationTime,
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });

});
app.post("/InvitationsAsktojoin", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Invitations');
  const query = {
    Type: req.body.Type,
    SenderNickName: req.body.SenderNickName,
    SenderEmail: req.body.SenderEmail,
    ProjectID: req.body.ProjectID,
    ProjectName: req.body.ProjectName,
    ProjectMission: req.body.ProjectMission,
    RecieverEmail: req.body.RecieverEmail,
    CreationTime: req.body.CreationTime,
  };
  const user = users.insertOne(query, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });

});

app.post("/getJoin", (req, res) => {
  const database = client.db('KANRI');

  database.collection('ProjectTeamMembers').findOne({
    MemberEmail: req.body.SenderEmail,
    ProjectID: req.body.ProjectID,
  }, { projection: { _id: 1, Accepted: 1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) {
      database.collection('Invitations').findOne({
        Type: req.body.Type,
        SenderNickName: req.body.SenderNickName,
        SenderEmail: req.body.SenderEmail,
        ProjectID: req.body.ProjectID,
        ProjectName: req.body.ProjectName,
        RecieverEmail: req.body.RecieverEmail,
        // CreationTime: req.body.CreationTime,
      }, { projection: { _id: 1, } }, function (err, result) {
        if (err) throw err;
        if (result == null) {
          res.send(JSON.stringify("null"));
        }
        else {
          console.log(result);
          res.send(JSON.stringify("You have already requested to join " + req.body.ProjectName));
        }
      });
    }
    else {
      console.log(result);
      if (result.Accepted)
        res.send(JSON.stringify("You are already a member in " + req.body.ProjectName));
      else {
        res.send(JSON.stringify("You have been already invited to join " + req.body.ProjectName+", please check the invitations tab"));
      }
    }
  });

})

app.post("/getInviteToProject", (req, res) => {
  const database = client.db('KANRI');
  database.collection('Invitations').findOne({
    Type: "RequestToJoin",
    SenderNickName: req.body.SenderNickName,
    SenderEmail: req.body.SenderEmail,
    ProjectID: req.body.ProjectID,
    ProjectName: req.body.ProjectName,
    RecieverEmail: req.body.RecieverEmail,
  }, { projection: { _id: 1, } }, function (err, result) {
    if (err) throw err;
    if (result == null) {
      database.collection('Invitations').findOne({
        Type: req.body.Type,
        SenderNickName: req.body.SenderNickName,
        SenderEmail: req.body.SenderEmail,
        ProjectID: req.body.ProjectID,
        ProjectName: req.body.ProjectName,
        ProjectMission: req.body.ProjectMission,
        RecieverEmail: req.body.RecieverEmail,
      }, { projection: { _id: 1, } }, function (err, result) {
        if (err) throw err;
        if (result == null) {
          res.send(JSON.stringify("null"));
        }
        else {
        //   // console.log(result);
          res.send(JSON.stringify("invited"));
        }
      });
    }
    else {
      console.log(result);
      res.send(JSON.stringify("This person has already requested to join this project, please check the invitations tab"));
    }
  });

  
})
app.post("/getProjectsCustomer", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');

  users.find({ CustomerEmail: req.body.Email }, { projection: { _id: 1, Messages: 0, CustomerEmail: 0 } }).sort({ CreationTime: -1 }).toArray(function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.send(JSON.stringify("null"));
    }
    else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
})

app.post("/getInvitations", (req,res) => {
  const database = client.db('KANRI');
console.log(req.body.RecieverEmail)
  database.collection('Invitations').find(
    {
      RecieverEmail:req.body.RecieverEmail
    }).sort({ CreationTime: -1 }).toArray(function (err, result)  {
    if (err) throw err;
    if (result == null) {
      res.send(JSON.stringify("null"));
    }

    else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
})
app.post("/getNickName1", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProfileInfo');
  users.findOne({ Email: req.body.Email }, { projection: { _id: 1, NickName: 1 } }, function (err, result) {
    if (err) throw err;
    if (result == null) res.send(JSON.stringify("null"));
    else {
      // console.log(result.Password);
      res.send(JSON.stringify(result));
    }

  });
});
app.post("/RequestToJoinDone", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  console.log(req.body.item)
  var myquery = { 
    ProjectID:req.body.item.ProjectID,
    MemberID:req.body.id,
     MemberEmail:req.body.item.RecieverEmail,
    Accepted:true };

  users.insertOne(myquery, function (err, obj) {
    if (err) throw err;
    database.collection('Invitations').deleteOne({_id:ObjectId(req.body.item._id)},function(err,result){
      if (err) throw err;
      res.send(JSON.stringify('done'))
    })
  });
});
app.post("/RequestToJoinDecline", (req, res) => {
  const database = client.db('KANRI');
  console.log(req.body._id)
    database.collection('Invitations').deleteOne({_id:ObjectId(req.body._id)},function(err,result){
      if (err) throw err;
      res.send(JSON.stringify("done"))
    })

});
app.post("/InviteToJoinDone", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  console.log(req.body.item)
  var myquery = { ProjectID:req.body.item.ProjectID, MemberEmail:req.body.item.RecieverEmail };
  var newvalues = {
    $set: {
      Accepted: true,
    }
  };
  users.updateOne(myquery, newvalues, function (err, obj) {
    if (err) throw err;
    database.collection('Invitations').deleteOne({_id:ObjectId(req.body.item._id)},function(err,result){
      if (err) throw err;
      res.send(JSON.stringify('done'))
    })
  });
});
app.post("/InviteToJoinDecline", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  console.log(req.body.item)
  var myquery = { ProjectID:req.body.item.ProjectID, MemberEmail:req.body.item.RecieverEmail };

  users.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    database.collection('Invitations').deleteOne({_id:ObjectId(req.body.item._id)},function(err,result){
      if (err) throw err;
      res.send(JSON.stringify('done'))
    })
  });
});
app.post("/InviteToDoProjectDone", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('Projects');
  console.log(req.body.item)
  var myquery = { 
    Email:req.body.item.RecieverEmail, 
    CustomerEmail:req.body.item.SenderEmail,
    ProjectName:req.body.item.ProjectName,
    ProjectMission:req.body.item.ProjectMission,
    ProjectDescription:req.body.item.ProjectDescription,
    ProjectBudget:req.body.item.ProjectBudget,
    RemainingBudget:req.body.item.ProjectBudget,
    DeadLine:req.body.item.ProjectDeadLine,
    MeetingLink:'',
    CreationTime:req.body.CreationTime,
    MeetingDate:''
  };

  users.insertOne(myquery, function (err, obj) {
    if (err) throw err;
    database.collection('Invitations').deleteOne({_id:ObjectId(req.body.item._id)},function(err,result){
      if (err) throw err;
      res.send(JSON.stringify('done'))
    })
  });
});
app.post("/InviteToDoProjectDecline", (req, res) => {
  const database = client.db('KANRI');
  const users = database.collection('ProjectTeamMembers');
  database.collection('Invitations').deleteOne({_id:ObjectId(req.body._id)},function(err,result){
    if (err) throw err;
    res.send(JSON.stringify('done'))
  })
});


app.post("/sendToken", (req, res) => {

  const database = client.db('KANRI');
  const users = database.collection('users');
  var myquery = { Email: req.body.Email };
  console.log(req.body.Token)
  var newvalues = { $set: { Token: req.body.Token } };
  users.updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify("Token  updated"))
  });

});

app.post("/getToken", (req, res) => {


  const database = client.db('KANRI');
  const users = database.collection('users');
  users.findOne({ Email: req.body.Email }, { projection: { _id: 0, Token: 1 } }, function (err, result) {
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
      title: req.body.title1,
      body: req.body.body1,
    },

    data: { //you can send only notification or only data(or include both)
      title: req.body.title2,
      body: req.body.body2,
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
