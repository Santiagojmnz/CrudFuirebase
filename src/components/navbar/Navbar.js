import React from 'react';
import { auth } from '../../config/Firebase';
import image from '../../img/default.png';
import Login from '../login/Login';
import Register from '../register/Register';
export default function Navbar() {

    const usuario = localStorage.getItem("NAME");
    const cerrarSesion = () => {
        localStorage.removeItem("NAME");
        localStorage.removeItem("AUTH");
        auth.signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">TuRecetario</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                    
                    <li class="nav-item">

                        <a class="nav-link"  data-toggle="modal" data-target="#loginUser" href="#">Iniciar sesion</a>


                    </li>
                    <li class="nav-item">

                        <a class="nav-link" data-toggle="modal" data-target="#registerUser" href="#">Registrarme</a>

                    </li>
                </ul>
<Login/>
<Register/>
            </div>

        </nav>

    );
}