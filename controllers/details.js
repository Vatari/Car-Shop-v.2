module.exports = {
  async details(req, res) {
    const id = req.params.id;
    const car = await req.Storage.getById(id);

    if (req.session.user && req.session.user.id == car.owner) {
      car.isOwner = true;
    }

    if (car) {
      res.render("details", { title: `Car Shop 2 - ${car.name}`, car });
    } else {
      res.redirect("/404");
    }
  },
};
