import React from 'react';
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className=" dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
        				</a>
                        <div className=" bg-dark dropdown-menu" aria-labelledby="navbarDropdown">
                            <ul className="bg-dark nav-sidebar "
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false">

                                <li>
                                    <a href="/Usuarios" className="nav-link">
                                        <i className="nav-icon fas fa-user-lock"></i>
                                        <p>Usuarios</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/Productos" className="nav-link">
                                        <i className="nav-icon far fa-file"></i>
                                        <p>Recetas</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>

            </div>

        </nav>

    );
}