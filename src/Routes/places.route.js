const express = require("express");
const Router = express.Router();
const {
  getPlaceById,
  getPlaceByUser,
  deletePlace,
  getAllPlaces,
  modifyPlace,
  addPlace,
} = require("../Controllers/places.controller");

Router.get("/:pId", getPlaceById);
Router.get("/", getAllPlaces);
Router.get("/user/:uId", getPlaceByUser);
Router.post("/", addPlace);
Router.delete("/:pid", deletePlace);
Router.put("/:pId", modifyPlace);

module.exports = Router;
