const mongo = require("mongoose");

const { Schema } = mongo;

const companySchema = new Schema({
  company_name: {
    type: String,
    unique: true
  },
  company_email: {
    type: String,
    unique: true
  },
  mobile: Number,
  emailVerified: {
    type: Boolean,
    default: false
  },
  mobileVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// company name unique validation
companySchema.pre("save",async function(next){
  const query = {
    company_name: this.company_name
  }
  const length = await mongo.model("Company").countDocuments(query);
  if(length > 0){
    throw next("Comapny name is already exist");
  }
  else{
    next();
  }
});

// comapny email id unique validation
companySchema.pre("save",async function(next){
  const query = {
    company_email: this.comapny_email
  }
  const length = await mongo.model("Company").countDocuments(query);
  if(length > 0){
    throw next("Comapny email is already exist");
  }
  else{
    next();
  }
});

module.exports = mongo.model("Company",companySchema);
