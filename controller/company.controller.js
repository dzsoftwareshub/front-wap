const tokenService = require("../services/token.service");
const dbService = require("../services/database.service");

const createCompany = async (request,response)=>{
  const token = tokenService.verifyToken(request);
  if(token.isVerified){
    const data = token.data;
    // now you can store data
    try{
      const dataRes = await dbService.createRecord(data,"company");
      response.status(200);
      response.json({
        isCompanyCreated: true,
        message: "Comapny created !",
        data: dataRes
      });
    }
    catch(error){
      response.status(409);
      response.json({
        isCompanyCreated: false,
        message: error
      });
    }
  }
  else{
    response.status(401);
    response.json({
      message: "Permision denied"
    });
  }
}

module.exports = {
  createCompany: createCompany
}
