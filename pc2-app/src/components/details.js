import React, { Component } from "react";
import axios from "axios";
/// import { estimatedDocumentCount } from "../../../backend/model";

// formulario para ingreso de datos :
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this.state = {codI: 0, nombreI : "_",
    //   edadI : 0, correoI : "_",
    //       carreraI : "_"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  
  handleChange(evt) {
    console.log(evt.target.value)
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleSubmit(event) {
    // let databody ={
    //   cod: this.state.codigo,
    //   // last_modified: new Date(),
    //   nombre: this.state.nombre,
    //   edad: this.state.edad,
    //   correo: this.state.correo,
    //   carrera: this.state.carrera,
    // }



    var formData = new FormData();
    formData.append('cod', this.state.cod)
    formData.append('nombre', this.state.nombre)
    formData.append('edad', this.state.edad)
    formData.append('correo', this.state.correo)
    formData.append('carrera', this.state.carrera)
    console.log("codigo: " + this.state.cod)
    // try {
    //   // make axios post request
    //   axios({
    //     method: "post",
    //     url: "http://localhost:4000/putData",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch(error) {
    //   console.log(error)
    // }

    axios.post('http://localhost:4000/putData', this.state)
    alert('A name was submitted: ' + this.state.nombre);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Codigo:
          <input type="text" name="cod" value={this.state.cod} onChange={this.handleChange} />
           Nombre:
          <input type="text" name="nombre" value={this.state.nombre } onChange={this.handleChange} />
          Edad:
          <input type="text" name="edad" value={this.state.edad } onChange={this.handleChange} />
          Correo:
          <input type="text" name="correo" value={this.state.correo } onChange={this.handleChange} />
          Carrera:
          <input type="text" name="carrera" value={this.state.carrera } onChange={this.handleChange} />
        </label> 
        <input type="submit" value="Insertar" />
      </form>
    );
  }
}

export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      buttonClicked: false
    };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:4000/getData").then(res => {
      if (res.data.carrera === undefined) {
        res.data['carrera'] = 'sin especificar'
      }
      this.setState({
        data: res.data
      });
    });
  }

  getDetails() {
    if (!this.state.buttonClicked) {
      this.setState({
        Show: true
      });
    }
    this.componentDidMount()
  }

  putDetails(req) {
    if (!this.state.buttonClicked) {
      this.setState({
        Push: true
      });
    }
    const  estudianteDocument = {
      cod: 111,//this.state.codigo,
      // last_modified: new Date(),
      nombre: 'aaa',//this.state.nombre,
      edad: 222, //this.state.edad,
      correo: 'asdsad@f-tec',//this.state.correo,
      carrera: 'FOE'//this.state.carrera,
    };
    axios.post("http://localhost:4000/putData", estudianteDocument).then(res => {
    console.log(res)
  });
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: "30px" }}>
        <NameForm />
            <button
              className="btn btn-primary"
              style={{ position: "absolute", marginLeft: "50%" }}
              onClick={this.getDetails}
            >
              Mostrar todo
            </button>
            <div
              className="container-fluid"
              style={{
                position: "absolute",
                textAlign: "center",
                marginTop: "50px"
              }}
            >
              {this.state.Show
                ? this.state.data.map(data => {
                    return (
                      <React.Fragment>
                        <p>
                          {" "}
                          <b>codigo</b> : {data.cod}
                        </p>
                        <p>
                          <b>nombre</b> : {data.nombre}
                        </p>
                        <p>
                          <b>edad</b> : {data.edad}
                        </p>
                        <p>
                          <b>correo</b> : {data.correo}
                        </p>
                        <p>
                          <b>carrera</b> : {data.carrera}
                        </p>
                        <hr />
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
          </div>
    );
  }
}