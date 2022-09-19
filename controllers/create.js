const { mapError } = require("../services/util");

module.exports = {
  get(req, res) {
    res.render("create", { title: "Add car" });
  },

  async post(req, res) {
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl || undefined,
      price: Number(req.body.price),
      owner: req.session.user.id,
    };

    try {
      await req.Storage.addCar(car);
      res.redirect("/");
    } catch (err) {
      res.locals.err = mapError(err);
      if (err.name == "ValidationError") {
        err = Object.values(err.errors).map((e) => ({
          msg: e.message,
        }));
      }
      res.render("create", { title: "Add car", car });
    }
  },
};
