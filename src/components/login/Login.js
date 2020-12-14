import React, { useState } from 'react';
import image from '../../img/default.png';
import Register from '../register/Register';
import $ from "jquery";
import { auth, db } from '../../config/Firebase'



export default function Login() {
    //HOKS paara iniciar sesion
    const [user, iniciarSesion] = useState({
        email: "",
        password: ""

    });

    //Capturamos cambios del formulario

    const handleChange = e => {

        iniciarSesion({

            ...user,
            [e.target.name]: e.target.value

        })

    }
    const handleSubmit = async e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                setTimeout(() => { window.location.href = "/"; }, 500)
            })
            .catch((error) => {
                var error = error.code;
                console.log(error);
                if(error=="auth/wrong-password"){
                    $("button[type='submit']").before(`<div class="alert alert-danger">Contraseña incorrecta</div>`);
                }
                if(error=="auth/user-not-found"){
                    $("button[type='submit']").before(`<div class="alert alert-danger">El usuario no existe</div>`);
              
                }
                setTimeout(() => { window.location.href = "/"; }, 1000)
                
                
            });
    }






    return (

        <div className="modal" id="loginUser" style={
            { minHeight: "512.391px" }} >

            <div className="modal-dialog" >
                <div className="modal-content" >
                <div className="modal-header">
                        <h4 className="modal-title text-dark">Iniciar sesión</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <div className="card-body login-card-body mb-4" >


                        <form className="mb-3" onChange={handleChange} onSubmit={handleSubmit}>
                        <label className="small text-secondary" htmlFor="Nombre">Correo electronico</label>
                           
                            <div className="input-group mb-3  " >
                                 <input type="email"
                                    className="form-control"
                                    placeholder="Correo electronico"
                                    name="email" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-user" > </span>
                                    </div>
                                </div>

                            </div>
                            <label className="small text-secondary" htmlFor="Nombre">Contraseña</label>
                          
                            <div className="input-group mb-3" >
                                  <input type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-lock" > </span>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Ingresar </button>

                        </form>

                        
                    </div>

                </div>
            </div>
          
        </div>

    )
}


