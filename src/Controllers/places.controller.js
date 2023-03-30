let { places } = require("../InMemoryDB/placesDB");
const { getCordinate } = require("../Utils/geolocation");
const { generateID } = require("../Utils/Helpers");
const HttpError = require("../Utils/HttpError");
const PlaceModel = require("../Model/Place.model");

const addPlace = async (req, res, next) => {
	console.log(req);
  const { description, address, title, creator } = req.body;
	let placeImage = 'placeImg';
  if (description && address && title && creator) {
    const getLocation = await getCordinate(address);
    if (getLocation.status === "success") {
	    if(req.files){
              const imageUniqID = generateID();
	      const docs = req.files.placeImage;
              docs.mv(`./public/placesPhoto/${imageUniqID}${docs.name}`);
              placeImage = `${imageUniqID}${docs.name}`;
	    }
      const newPlace = new PlaceModel();
      const location = getLocation.data;
      newPlace.address = address;
      newPlace.title = title;
      newPlace.location = location;
      newPlace.image = placeImage;
      newPlace.user = creator;
      newPlace.description = description;
      await newPlace.save();
      return res.status(200).json({ msg: newPlace });
    } else {
      return next(getLocation.data);
    }
  } else {
	  console.log("sdferwe sdfwerwerwlekrw erwerwr2323");
    const err = new HttpError(
      "Sorry There exists an error. All fields are required...",
      201
    );
    next(err);
  }
};

const getAllPlaces = async(req, res, next) => {
  try{
	  const places = await PlaceModel.find();
	  return res.json({"places":places});
  }catch(error){
  }
};
const modifyPlace = async (req, res, next) => {
  try {
    const pid = req.params.pId;
	  let placeImage = "tmpImg";
    const { description, title, address } = req.body;
    const searchPlace = await PlaceModel.findByIdAndUpdate({ _id: pid });
    if (searchPlace) {
      if (description) {
        searchPlace.description = description;
      }
      if (title) {
        searchPlace.title = title;
      }
      if (address) {
        searchPlace.address = address;
        const getLocation = await getCordinate(address);
        if (getLocation.status === "success") {
          const location = getLocation.data;
          searchPlace.location = location;
	 if(req.files){
                const imageUniqID = generateID();
                const docs = req.files.placeImage;
                docs.mv(`./public/placesPhoto/${imageUniqID}${docs.name}`);
                placeImage = `${imageUniqID}${docs.name}`;
		searchPlace.image = placeImage;
              }
	
        } else {
          return next(getLocation.data);
        }
      }
      await searchPlace.save();
      return res.json({ msg: searchPlace });
    } else {
      return next(
        new HttpError("Sorry No place to Modify/ update with this id"),
        201
      );
    }
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return next(new HttpError("Sorry no place with such uId", 201));
    }
    return next(
      new HttpError(
        "Sorry There exists an error in the server during the process. Please try again later.",
        500
      )
    );
  }
};
const deletePlace = async (req, res, next) => {
  try {
    const pId = req.params.pid;
    const searchPlace = await PlaceModel.findByIdAndDelete({ _id: pId });
    if (searchPlace) {
      return res.json({ msg: searchPlace });
    } else {
      return next(new HttpError("Sorry No place to delete with this id"), 201);
    }
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return next(new HttpError("Sorry no place with such uId", 201));
    }
    return next(
      new HttpError(
        "Sorry There exists an error in the server during the process. Please try again later.",
        500
      )
    );
  }
};

const getPlaceByUser = async (req, res, next) => {
  try {
    const userId = req.params.uId;
    const placeByUser = await PlaceModel.find({ user: userId });
    if (placeByUser.length > 0) {
      return res.json({ place: placeByUser });
    } else {
      return next(new HttpError("Sorry no place with such uId", 201));
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(new HttpError("Sorry no place with such uId", 201));
    }
    return next(
      new HttpError(
        "Sorry There exists an error in the server during the process. Please try again later.",
        500
      )
    );
  }
};
const getPlaceById = async (req, res, next) => {
  try {
    const placeId = req.params.pId;
    const searchPlace = await PlaceModel.find({ _id: placeId });
    if (searchPlace?.length > 0) {
      return res.json({ place: searchPlace });
    } else {
      return next(
        new HttpError("Could not find a place for the provided ID", 201)
      );
    }
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return next(new HttpError("Sorry no place with such uId", 201));
    }
    return next(
      new HttpError(
        "Sorry There exists an error in the server during the process. Please try again later.",
        500
      )
    );
  }
};
module.exports = {
  getPlaceById,
  getPlaceByUser,
  deletePlace,
  modifyPlace,
  addPlace,
  getAllPlaces,
};
