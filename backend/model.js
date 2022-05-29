const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// cod: '20171088', nombre: 'Roberto', edad: '18', correo: 'robertoas@utec.edu.pe', carrera: 'electronica'
let estudiante = new Schema({
  cod: {
    type: String
  },

  nombre: {
    type: String
  },

  edad: {
    type: Number
  },

  correo: {
    type: String
  },
  
  carrera:{
    type: String
  }
});

module.exports = mongoose.model("estudiante", estudiante);