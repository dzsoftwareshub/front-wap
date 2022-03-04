require("dotenv").config();
const jwt = require("jsonwebtoken");
const issService = require("../services/iss.service");

const secretkey = process.env.SECRET_KEY;

const create = async (request,response,expiresIn)=>{
  const formdata = request.body;
  const endpoint = request.get("origin");
  const api = request.originalUrl;
  const iss = endpoint+api;
  const token = await jwt.sign({
    iss: iss,
    data: formdata,
  },secretkey,{expiresIn: expiresIn});
  return token;
}

const verify = (request)=>{
  const token = request.body.token;
  if(token){
    try{
      const tmp = jwt.verify(token,secretkey);
      const requestCommingFrom = tmp.iss;
      if(issService.indexOf(requestCommingFrom) != -1){
        return {
          isVerified: true,
          data: tmp.data
        }
      }
      else{
        return {
          isVerified: false
        };
      }
    }
    catch(error){
      return {
        isVerified: false
      };
    }
  }
  else{
    return {
      isVerified: false
    };
  }
}

const createCustom = async (data,expiresIn)=>{
  const formdata = data.body;
  const endpoint = data.endpoint;
  const api = data.api;
  const iss = data.iss;
  const token = await jwt.sign({
    iss: iss,
    data: formdata,
  },secretkey,{expiresIn: expiresIn});
  return token;
}

module.exports = {
  createToken : create,
  verifyToken : verify,
  createCustomToken: createCustom
}
