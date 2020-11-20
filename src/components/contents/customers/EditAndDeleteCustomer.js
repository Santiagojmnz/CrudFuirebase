import React, { useState } from 'react';
import $, { data } from 'jquery';
import Swal from 'sweetalert2';
import { db } from '../../../config/Firebase';

export default function EditAndDeleteCustomer() {
    //Hook para capturar datos
    const [id, setId] = useState();
    const [customer, editCustomer] = useState({

        name: "",
        lastname: "",
        bussines: "",
        phone: ""


    });

    //Onchange

    const handleChange = e => {
        editCustomer({


            'name': $("#editName").val(),
            'lastname': $("#editLastname").val(),
            'email': $("#editEmail").val(),
            'bussines': $("#editBussines").val(),
            'phone': $("#editPhone").val(),         
        })

    }

    //Onsubmit 
    const handleSubmit = async e => {
        $('.alert').remove();

        e.preventDefault();

        const { name, lastname, email, bussines, phone} = customer;


        //Validar campos 
        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (lastname === "") {

            $(".invalid-lasname").show();
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


        $(".modal-footer").before(`<div class="alert alert-success">Customero Actualizado</div>`)
        console.log(id +"ID de anddelete");
        db.collection('Customers').doc(id).set(customer);
        $('button[type="submit"]').remove();

        setTimeout(() => { window.location.href = "/clientes"; }, 1000)



    }



    $(document).on("click", ".editInputs", function (e) {
        e.preventDefault();
        const data = $(this).attr("data").split(',');
        setId(data[0]);



        $("#idCustomer").val(data[0]);
        $("#editName").val(data[1]);
        $("#editLastname").val(data[2]);
        $("#editEmail").val(data[3]);
        $("#editBussines").val(data[4]);
        $("#editPhone").val(data[5]);




    })

    //DAtos para eliminar producto
    $(document).on("click", ".delete", function (e) {

        e.preventDefault();
        const data = $(this).attr("data").split(',');

        //Confirmar accion

        Swal.fire({
            title: 'Eliminar producto',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                //servicio Delete
                const ProductDelete = async () => {

                    db.collection('Customers').doc(data[0]).delete();

                    if (data) {

                        Swal.fire({
                            type: "success",
                            title: "Producto eliminado correctamente",
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/clientes";

                            }

                        })

                    }
                    if (!data) {
                        Swal.fire({
                            type: "error",
                            title: "Producto No encontrado",
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/clientes";

                            }

                        })

                    }



                }
                ProductDelete();

            }

        })


    })








    //Vista de formulario
    return (

        <div className="modal  " id="editCustomer" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Editar Cliente</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={handleChange} onSubmit={handleSubmit} encType="multipart/form-data"   >
                        <div className="modal-body row">

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="name">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editName"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="lastname">Apellidos</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="editLastname"
                                        name="lastname"
                                        type="text"
                                        className="form-control"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-lastname"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="email">Correo electronico</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editEmail"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-email"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="bussines">Empresa</label>

                                <div className=" input mb-3">


                                    <input
                                        id="editBussines"
                                        name="bussines"
                                        type="text"
                                        className="form-control"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-bussines"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0 ">

                                <label className="small text-secondary" htmlFor="phone">Telefono</label>

                                <div className="input mb-3">

                                    <input
                                        id="editPhone"
                                        name="phone"
                                        type="phone"
                                        className="form-control"
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
