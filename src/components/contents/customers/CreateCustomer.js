
import React, { useState } from 'react';
import $ from 'jquery';
import { db } from '../../../config/Firebase';


export default function CreateCustomer() {

    //Hoks para capturar datos

    const [customer, createCustomer] = useState({

        name: "",
        lastname: "",
        bussines: "",
        phone: "",
        id: "",


    });

    //ONchange

    const cambiaFormPut = e => {

        createCustomer({


            'name': $("#name").val(),
            'lastname': $("#lastname").val(),
            'email': $("#email").val(),
            'bussines': $("#bussines").val(),
            'phone': $("#phone").val(),
            'id': "",



        })
    }
    const submitPut = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { name, lastname, email, bussines, phone, id } = customer;


        //Validar campos 
        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (lastname === "") {

            $(".invalid-lastname").show();
            $(".invalid-lastname").html("Completa este campo");
            return;
        }
        if (email === "") {

            $(".invalid-email").show();
            $(".invalid-email").html("Completa este campo");
            return;
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {

            $(".invalid-email").show();
            $(".invalid-email").html("Ingresa un correo electronico valido");

            return;

        }



        if (bussines === "") {

            $(".invalid-bussines").show();
            $(".invalid-bussines").html("Completa este campo");
            return;
        }
        if (phone === "") {

            $(".invalid-phone").show();
            $(".invalid-phone").html("Completa este campo");
            return;
        }

        db.collection('Customers').doc().set(customer);
        $(".modal-footer").before(`<div class="alert alert-success">Cliente Agregado</div>`)

        $('button[type="submit"]').remove();

        setTimeout(() => { window.location.href = "/clientes"; }, 1000)
    }






    //Retornar vista

    return (

        <div className="modal  " id="createCustomer" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Nuevo Cliente</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={cambiaFormPut} onSubmit={submitPut}  >

                        <div className="modal-body row">

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Apellidos">Apellidos</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="lastname"
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        placeholder="Apellidos*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-lastname"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Correo electronico</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo electronico*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-email"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Empresa</label>

                                <div className=" mb-3">


                                    <input
                                        id="bussines"
                                        name="bussines"
                                        type="text"
                                        className="form-control"
                                        placeholder="Empresa*"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-bussines"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0 ">

                                <label className="small text-secondary" htmlFor="Cantidad">Telefono</label>

                                <div className="input mb-3">

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        className="form-control"
                                        placeholder="Telefono*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-phone"></div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer d-flex justify-content-between">

                            <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>

                            <div><button type="submit" className="btn btn-primary">Enviar</button></div>

                        </div>

                    </form>

                </div>
            </div>
        </div>

    )

}
