const tokenService = require("../services/token.service");
const databaseService = require("../services/database.service");

const create = async (request,response)=>{
  const token = tokenService.verifyToken(request);
  if(token.isVerified){
    try{
      const dataRes = await databaseService.createRecord(token.data,"user");
      response.status(200);
      response.json({
        isUserCreated: true,
        message: "User created !"
      });
    }
    catch(error){
      response.status(500),
      response.json({
        isUserCreated: false,
        message: "Internal server error"
      });
    }
  }
  else{
    response.status(409);
    response.json({
      message: "Permission denied"
    });
  }
}

module.exports = {
  createUser: create
}
