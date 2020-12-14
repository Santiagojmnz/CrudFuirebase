import React from 'react';
import { auth } from '../../config/Firebase';
import image from '../../img/default.png';
import  EditAnDeleteUser from '../contents/users/EditAndDeleteUser';
export default function NavbarAdmi() {
    const usuario ="Iniciar sesión ";  
    const cerrarSesion = () => {
        localStorage.removeItem("NAME");
        localStorage.removeItem("AUTH");
        localStorage.removeItem("UID");
        localStorage.removeItem("ROL");
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

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto ">

                    <li className=" dropdown pr-3">
                        <a className="nav-link dropdown-toggle " href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     {usuario}
                        </a>
                        <div className=" bg-dark dropdown-menu m" aria-labelledby="navbarDropdown">
                            <ul className="bg-dark nav-sidebar "
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false">

                                <li>
                                    <a href="" data-toggle="modal"  className="nav-link">
                                        <i className="nav-icon fas fa-user-lock"></i>
                                        <p> Perfil</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/Recetas" className="nav-link">
                                        <i className="nav-icon far fa-file"></i>
                                        <p> Recetas</p>
                                    </a>
                                </li>
                                <li className="nav-item">

                                    <a href="/"
                                        onClick={() => { cerrarSesion() }}
                                        className="nav-link">

                                        <i className="fas fa-sign-out-alt"></i>
                                        <p> Salir</p>

                                    </a>

                                </li>

                            </ul>
                          
                        </div>
                    </li>

                </ul>
        
            </div>
          
        </nav>

    );
}