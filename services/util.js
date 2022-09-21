const bcrypt = require("bcrypt");

function accessoryViewModel(accessory) {
  return {
    id: accessory._id,
    name: accessory.name,
    description: accessory.description,
    imageUrl: accessory.imageUrl,
    price: accessory.price,
    owner: accessory.owner,
  };
}

function carViewModel(car) {
  const model = {
    id: car._id,
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
    accessories: car.accessories,
    owner: car.owner,
  };

  if (model.accessories.length > 0 && model.accessories[0].name) {
    model.accessories = model.accessories.map(accessoryViewModel);
  }

  return model;
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

function isLoggedIn() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  };
}

function mapError(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "MongoServerError") {
    if (err.code == 11000) {
      return [
        {
          msg: "Username already exists",
        },
      ];
    } else {
      return [{ msg: "Request failed" }];
    }
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: "Request failed" }];
  }
}

module.exports = {
  accessoryViewModel,
  carViewModel,
  hashPassword,
  comparePassword,
  isLoggedIn,
  mapError,
};
