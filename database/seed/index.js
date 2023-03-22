const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const password = bcrypt.hashSync("sharma", 10);
const User = {
    username: "rohit",
    password
};

(async function(){
    const createdUser = await UserModel.create(User).catch(err => {
        console.log(err);
    });
    console.log(createdUser);
})();




