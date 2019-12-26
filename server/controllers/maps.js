const Map = require("../models").Map;

module.exports = {
  create(req, res) {
    return Map.create({
      name: req.body.name,
      features: req.body.features,
      initial_viewport: req.body.initial_viewport,
    })
      .then(map => res.status(201).send(map))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Map.all()
      .then(maps => res.status(200).send(maps))
      .catch(error => res.status(400).send(error));
  },
};
