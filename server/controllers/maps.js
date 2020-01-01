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
    return Map.findAll()
      .then(maps => res.status(200).send(maps))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Map.findByPk(req.params.mapId)
      .then(map => {
        if (!map) {
          return res.status(404).send({
            message: "Map not found!",
          });
        }
        return res.status(200).send(map);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Map.findByPk(req.params.mapId).then(map => {
      if (!map) {
        return res.status(404).send({ message: "Map not found!" });
      }
      return map
        .update({
          name: req.body.name || map.name,
          features: req.body.features || map.features,
          initial_viewport: req.body.initial_viewport || map.initial_viewport,
        })
        .then(() => res.status(200).send(map))
        .catch(error => res.status(400).send(error));
    });
  },
  destroy({ params: { mapId } }, res) {
    return Map.findByPk(mapId)
      .then(map => {
        if (!map) {
          return res.status(404).send({ message: "Map not found!" });
        }
        return map
          .destroy()
          .then(() => res.status(200).send({ message: "Map Deleted" }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
