const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const cors = require('cors');

const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

const loginDetails = [{
    login : "prasad",
    agentno: "A010001",
    password: "prasad"
},
{
  login : "guru",
  agentno: "A010003",
  password: "guru"
},
{
  login : "nirmal",
  agentno: "A010004",
  password: "nirmal"
},
{
  login : "Kumaran",
  agentno: "A010005",
  password: "kumaran"
},
{
  login : "sreejith",
  agentno: "A010006",
  password: "sreejith"
}

];

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/testdb";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.post("/getData", (req, res) => {
  Data.find()
  .then(function(doc){
    res.send(JSON.stringify(doc));
  });
});

// this is our get method
// this method fetches all available data in our database
router.post("/fetchIFADetails", (req, res) => {
  console.log(req.body);
  Data.find(req.body)
  .then(function(doc){
    res.send(doc);
  });
});


router.post("/validateLogin", (req, res) => {
  console.log(req.body["login"]);

  // console.log(loginDetails);
  // Data.find(req.body)
  // .then(function(doc){
  //   res.send(doc);
  // });
  let details = loginDetails.filter( person => person.login == req.body["login"] );

  if(details.length != 0){

      if (req.body["password"] == details[0]["password"])
      {
        res.send({"agentno":details[0]["agentno"]});  
      }
      else res.send({"agentno":null});
      }
  else
  {
    res.send({"agentno":null});  
  }
});

// this is our get method
// this method fetches all the matching data in db
router.post("/search", (req, res) => {
  Data.find(req.body)
  .then(function(doc){
    res.send(JSON.stringify(doc));
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
