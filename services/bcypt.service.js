const bcrypt = require("bcrypt");

const encrypt = (data)=>{
    bcrypt.hash(data,12);
}
