const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  getLoginPage: (req, res, next) => {
    res.render("login");
  },

  getRegisterPage: (req, res, next) => {
    res.render("register");
  },

  register: (req, res, next) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //Check require fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    //Check password match
    if (password !== password2) {
      errors.push({ msg: "Password do not match" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            errors.push({ msg: "User is already register" });
            res.render("register", {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            const newUser = new User({
              name,
              email,
              password
            });

            //Hash password
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    req.flash("success_msg", "You are now registed!");
                    res.redirect("/users/login");
                  })
                  .catch(err => console.error(err));
              })
            );
          }
        })
        .catch(err => console.error(err));
    }
  }
};
