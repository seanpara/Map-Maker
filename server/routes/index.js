const mapsController = require("../controllers").maps;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    }),
  );

  app.post("/api/maps", mapsController.create);
  app.get("/api/maps", mapsController.list);
};
