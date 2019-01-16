// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: String,
    firm: String,
    agentno: String,
    polno: String,
    surname: String,
    firstname: String,
    dob: String,
    prodtyp: String,
    policytyp: String,
    nbdate: String

  },
  { collection: 'nbdashboard' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("nbdashboard", DataSchema);