import React, { useState } from 'react';
import $ from 'jquery';
import { db, auth } from '../../config/Firebase';
import { ResponsiveEmbed } from 'react-bootstrap';


export default function CreateUser() {

    //Captura de datos

    const [user, createUser] = useState({

        name: "",
        surname: "",
        email: "",
        password: "",
        rol: "user",
        image: "",
    })

    //onChange
    const handleChange = e => {

        createUser({

            ...user,
            [e.target.name]: e.target.value

        })

    }

    //Onsubmit

    const handleSubmit = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { name, surname,rol, email, password } = user;


        //Validacion de campos vacios

        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (surname === "") {

            $(".invalid-surname").show();
            $(".invalid-surname").html("Completa este campo");

            return;

        }
        if (email === "") {

            $(".invalid-email").show();
            $(".invalid-email").html("Completa este campo");

            return;

        }
        //Se valdia que cumpla con el formato Expresion Regular
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {

            $(".invalid-email").show();
            $(".invalid-email").html("Ingresa un correo electronico valido");

            return;

        }

        //validacion de campo
        if (password === "") {

            $(".invalid-password").show();
            $(".invalid-password").html("Completa este campo");

            return;

        }


        //Validacion de expresion regular

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) {

            $(".invalid-password").show();
            $(".invalid-password").html("El formato no coincide");

            return;

        }


        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                delete user.password;
                db.collection('Users').doc(response.user.uid).set(user);
                $(".modal-footer").before(`<div class="alert alert-success">Usuario registrado</div>`);
                setTimeout(() => { window.location.href = "/Usuarios"; }, 1000)

            })
            .catch(function (error) {
                var error = error.code;
                console.log(error)
                if (error === 'auth/email-already-in-use') {
                    $(".modal-footer").before(`<div class="alert alert-danger">Correo electrónico en uso</div>`);
                } else {
                    $(".modal-footer").before(`<div class="alert alert-danger">Error al procesar la peticion</div>`);

                }



            });


    }

    //Retornar vista

    return (

        <div className="modal" id="registerUser">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title text-dark">Crear cuenta</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={handleChange} onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="Nombre">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="Nombre"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="Apellidos">Apellidos</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="Apellidos"
                                        type="text"
                                        name="surname"
                                        className="form-control"
                                        placeholder="Apellidos*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-surname"></div>

                                </div>

                            </div>
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="email">Correo Electronico</label>

                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fa fa-envelope "></i>
                                    </div>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="form-control text-tolowercase"
                                        placeholder="Correo electronico*"
                                        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-email"></div>

                                </div>

                            </div>



                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="password">* Mínimo 8 caracteres, letras en mayúscula, en minúscula y números</label>

                                <div className="input-group mb-3">

                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Contraseña*"
                                        minLength="8"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-password"></div>

                                </div>

                            </div>

                        </div>


                        <div className="modal-footer d-flex justify-content-between">

                            <div><button type="button" className="btn btn-danger " data-dismiss="modal">Cerrar</button></div>

                            <div><button type="submit" className="btn btn-success">Registrarme</button></div>

                        </div>

                    </form>

                </div>
            </div>
        </div>

    )

}



