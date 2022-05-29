const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
global.bodyParser = require('body-parser');

app.use(cors());


app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))


const router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/estudiantes", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

let estudiantes = require("./model");

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

router.route("/getData").get(function(req, res) {
    estudiantes.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

router.route("/putData").post(function(req, res) {
    console.log("enntrando al put")
    console.log(req.body)
    
    estudiantes.insertMany(req.body, (err, result) => {
      if (err) {
        res.status(400).send("Error insertando");
      } else {
        console.log(`Estudiante añadido con id: ${result.insertedId}`);
        res.status(204).send();
      }
    });
  });

app.use("/", router);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});