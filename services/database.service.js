const mongo = require("mongoose");
const companySchema = require("../model/company.model");
const userSchema = require("../model/user.model");

const schemaList = {
  company: companySchema,
  user: userSchema
}

const url = "mongodb://127.0.0.1:27017/frontwap"
mongo.connect(url);

const createRecord = async (data,schema)=>{
  const currentSchema = schemaList[schema];
  const collection = new currentSchema(data);
  const dataRes = await collection.save();
  return dataRes;
}

module.exports = {
  createRecord: createRecord
}
