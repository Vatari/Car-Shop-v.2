module.exports = {
  async home(req, res) {
    const cars = await req.Storage.getAll(req.query);

    res.render("index", { cars, title: "Car Shop 2", query: req.query });
  },
};
