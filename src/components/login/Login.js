import React, { useState } from 'react';
import logo from '../../img/Anuncio DarkCode.jpg';

import $ from "jquery";



export default function Login() {
    //HOKS paara iniciar sesion

    const [admins, iniciarSesion] = useState({
        email: "",
        password: ""

    });

    //Capturamos cambios del formulario

    const cambiaForm = e => {

        iniciarSesion({

            ...admins,
            [e.target.name]: e.target.value

        })

    }






    return (

        <div className="login-page" style={
            { minHeight: "512.391px" }} >

            <div className="login-box" >

         

                <div className="login-card-body" >
                <div className="login-logo mt-n5 mb-5 " >

<img className="mx-auto rounded-circle position-relative mt-n5" src={logo} alt="" width="120" height="120" />

</div>
                   

                    <div className="card-body login-card-body mb-4" >
                        

                        <form>

                            <div className="input-group mb-3  " >

                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-user" > </span>
                                    </div>
                                </div>

                            </div>

                            <div className="input-group mb-3" >

                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-lock" > </span>
                                    </div>
                                </div>

                            </div>

                            <button type="submit"
                                className="btn btn-primary btn-block">Ingresar </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

// Peticion post login
