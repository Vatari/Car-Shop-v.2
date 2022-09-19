const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { mapError } = require("../services/util");

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post(
  "/register",
  body("username").trim(),
  body("password").trim(),
  body("repeatPassword").trim(),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 5 characters")
    .isAlphanumeric()
    .withMessage("Username may contain only alphanumeric characters"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Passwords must be at least 6 characters")
    .isAlphanumeric()
    .withMessage("Password may contain only alphanumeric characters"),
  body("repeatPassword")
    .custom((value, { req, location, path }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords do not match"),

  async (req, res) => {
    const { errors } = validationResult(req);

    /* if (req.body.username == "" || req.body.password == "") {
    return res.redirect("/register");
  }
  if (req.body.password != req.body.repeatPassword) {
    return res.redirect("/register");
  } */

    try {
      if (errors.length > 0) {
        throw errors;
      }
      await req.auth.register(req.body.username, req.body.password);
      res.redirect("/");
    } catch (err) {
      res.locals.err = mapError(err);
      res.render("register", {
        title: "Register",
        data: { username: req.body.username },
      });

      // return res.redirect("/register");
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  try {
    await req.auth.login(req.body.username, req.body.password);
    res.redirect("/");
  } catch (err) {
    res.locals.err = [{ msg: err.message }];
    res.render("login", { title: "Login" });
  }
});

router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});
module.exports = router;
