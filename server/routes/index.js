const mapsController = require("../controllers").maps;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    }),
  );

  app.post("/api/maps", mapsController.create);
  app.get("/api/maps", mapsController.list);
  app.get("/api/maps/:mapId", mapsController.retrieve);
  app.put("/api/maps/:mapId", mapsController.update);
  app.delete("/api/maps/:mapId", mapsController.destroy);
};
