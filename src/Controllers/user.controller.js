const userSchema = require("../Model/User.model");
let { userStorage } = require("../InMemoryDB/userDB");
const HttpError = require("../Utils/HttpError");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    console.log("User can login");
    const doesUserExists = await userSchema.find({ email });
    if (doesUserExists.length > 0) {
      if (password === doesUserExists[0].password) {
        return res.json({ msg: "Login Success. ", user: doesUserExists });
      } else {
        return next(
          new HttpError(
            "Sorry No such user with these credentials in the System. please try again later."
          ),
          201
        );
      }
    } else {
      return next(
        new HttpError(
          "Sorry No such user with these credentials in the System. please try again later."
        ),
        201
      );
    }
  } else {
    return next(
      new HttpError(
        "Sorry all fields are required to login. please try again later."
      ),
     201
    );
  }
};
const signup = async (req, res, next) => {
  const { email, password, name, confirmPassword } = req.body;
  console.log(req);
	let profileImage = 'avatar'	
  if (email && password && name && confirmPassword) {
    console.log("User can Signup");
    const curUser = await userSchema.find({ email }); //userStorage.find((e) => e.email === email);
    //console.log(curUser);
    if (curUser.length == 0) {
      if (confirmPassword !== password) {
        return next(
          new HttpError(
            "Sorry There exists with these credentials. please password and confirm password has to be the seame..",
            201
          )
        );
      }
	    if(req.files){
              const docs = req.files.image;
              docs.mv(`./public/usersPhoto/${email}/${docs.name}`);
              profileImage = `${email}/${docs.name}`;
	    }
      const newUser = new userSchema();
      newUser.password = password;
      newUser.email = email;
      newUser.name = name;
	    newUser.image = profileImage;
	    console.log(newUser);
      await newUser.save();
      return res.json({ msg: "Signup Success. ", user: newUser });
    } else {
      return next(
        new HttpError(
          "Sorry There exists a user in the System with these credentials. please try again later with a different one.",
          201
        )
      );
    }
  } else {
    return next(
      new HttpError(
        "Sorry all fields are required to login. please try again later."
      ),
      201
    );
  }
};
const users = async (req, res, next) => {
  const users = await userSchema.find();
  if (users.length > 0) {
    return res.json({ users: users });
  } else {
    return next(
      new HttpError("Sorry There is no user in this system yet."),
      404
    );
  }
};

module.exports = {
  login,
  signup,
  users,
};
