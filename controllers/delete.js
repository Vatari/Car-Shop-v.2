module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.Storage.getById(id);

    if (car.owner != req.session.user.id) {
      return res.redirect("/login");
    }

    if (!car) {
      res.redirect("/404");
    }

    res.render("delete", { title: `Delete - ${car.name}`, car });
  },
  async post(req, res) {
    const id = req.params.id;
    try {
      if (await req.Storage.deleteById(id, req.session.user.id)) {
        res.redirect("/");
      } else {
        return res.redirect("/login");
      }
    } catch (err) {
      res.redirect("/404");
    }
  },
};
