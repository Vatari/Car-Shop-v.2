module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.Storage.getById(id);

    if (car.owner != req.session.user.id) {
      return res.redirect("/login");
    }

    if (car) {
      res.render("edit", { title: `Edit - ${car.name}`, car });
    } else {
      res.redirect("/404");
    }
  },
  async post(req, res) {
    const id = req.params.id;
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
    };

    try {
      if (await req.Storage.update(id, car, req.session.user.id)) {
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      res.redirect("/404");
    }
  },
};
