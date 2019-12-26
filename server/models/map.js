"use strict";
module.exports = (sequelize, DataTypes) => {
  const Map = sequelize.define(
    "Map",
    {
      name: DataTypes.STRING,
      features: DataTypes.JSONB,
      initial_viewport: DataTypes.JSONB,
    },
    {},
  );
  Map.associate = function(models) {
    // associations can be defined here
  };
  return Map;
};
