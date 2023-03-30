const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
// const {abc,def} = require('./src/InMemoryDB/exp')
const placeRoutes = require("./src/Routes/places.route");
const userRoutes = require("./src/Routes/user.route");
const def = require("./src/InMemoryDB/exp");
const dbHandle = require("./config/DB.js");
const PORT = process.env.PORT || 5001;
const app = express();
dbHandle();
// app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use(fileUpload({
	createParentPath:true
}));
// define server public folder
//app.use(express.static(__dirname + "/public"));
app.use(express.static('public')); 
app.use('/images', express.static('public'));
app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  // console.log(res)
  if (res.headerSent) {
    return next(error);
  }
  // console.log(error)
  res.status(error.status || 500);
  res.json({ msg: error.message || "An unknown error occured!" });
});

app.listen(PORT,()=>{
  console.log(`Server successfully connected on port ${PORT}`)
});

/*
Mobile App features

*/
