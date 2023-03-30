const HttpError = require("./HttpError");

const axios = require("axios");
const API_KEY = "AIzaSyDXot2DLFOoqu9G-Fl-B0XeNPxZc0DSLSc";

const getCordinate = async (address) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}
    `;
    const res = await axios.get(url);
    //console.log(res.data);
    if (res.data.status === "OK") {

		console.log("Truthy...");
        //results[0].geometry.location
      const location = res.data.results[0].geometry.location;
      return { status: "success", data: location };
    } else {
	    console.log("SORRY....");
      return {
        status: "Error",
        data: new HttpError(
          "Sorry There exists an error with the address. Please provide a valid Address.",
          201
        ),
      };
    }
  } catch (error) {
	  console.log(error);
    return {
	    status: "Error",
      data: new HttpError(
        "Sorry There exists an error with the address. Please provide a valid Address.",
        201
      ),
    };
  }
};
module.exports = {
  getCordinate,
};
