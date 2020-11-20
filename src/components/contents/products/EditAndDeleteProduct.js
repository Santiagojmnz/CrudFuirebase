import React, { useState } from 'react';
import $, { data } from 'jquery';
import Swal from 'sweetalert2';
import { db, storage } from '../../../config/Firebase';

export default function EditAndDeleteProduct() {
    //Hook para capturar datos
    const [id, setId] = useState('');
    const [product, editProduct] = useState({

        name: "",
        price: "",
        sku: "",
        description: "",
        stock: "",
        image: "",

    });

    //Onchange

    const handleChange = e => {


        var file = $("#editImage").get(0).files[0];
        if (!$("#editImage").val()) {

            editProduct({
                'name': $("#editName").val(),
                'price': $("#editPrice").val(),
                'sku': $("#editSku").val(),
                'description': $("#editDescription").val(),
                'stock': $("#editStock").val(),
                'image': $("#productImage").val()


            })

        } else {
            uploadImage(file);
        }


    }

    function uploadImage(file) {

        //dynamically set reference to the file name
        var ImageRef = storage.ref('ImageProducts').child(file.name);
       //put request upload file to firebase storage
        ImageRef.put(file).then(function (snapshot) {
                imageUrl(ImageRef)
            });


    }
    function imageUrl(ImageRef) {
        ImageRef.getDownloadURL().then(function (url) {

            editProduct({
                'name': $("#editName").val(),
                'price': $("#editPrice").val(),
                'sku': $("#editSku").val(),
                'description': $("#editDescription").val(),
                'stock': $("#editStock").val(),
                'image': url,


            })


        }).catch(function (error) {
        });
    }


    //Onsubmit 
    const handleSubmit = async e => {
        $('.alert').remove();

        e.preventDefault();



        const { name, price, sku, description, stock } = product;

        //Validar campos 
        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (price === "") {

            $(".invalid-price").show();
            $(".invalid-price").html("Completa este campo");
            return;
        }
        if (sku === "") {

            $(".invalid-sku").show();
            $(".invalid-sku").html("Completa este campo");
            return;
        }



        if (description === "") {

            $(".invalid-description").show();
            $(".invalid-description").html("Completa este campo");
            return;
        }
        if (stock === "") {

            $(".invalid-stock").show();
            $(".invalid-stock").html("Completa este campo");
            return;
        }

        $(".modal-footer").before(`<div class="alert alert-success">Producto Actualizado</div>`)
        db.collection('Products').doc(id).set(product);
        $('button[type="submit"]').remove();

        setTimeout(() => { window.location.href = "/"; }, 1000)



    }



    $(document).on("click", ".editInputs", function (e) {
        e.preventDefault();
        const data = $(this).attr("data").split(',');
        setId(data[0]);
       
        $("#productImage").val(data[6]);
        $("#editName").val(data[1]);
        $("#editPrice").val(data[2]);
        $("#editSku").val(data[3]);
        $("#editDescription").val(data[4]);
        $("#editStock").val(data[5]);




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

                    db.collection('Products').doc(data[0]).delete();

                    if (data) {

                        Swal.fire({
                            type: "success",
                            title: "Producto eliminado correctamente",
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/";

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

                                window.location.href = "/";

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

        <div className="modal  " id="editProduct" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Editar Producto</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={handleChange} onSubmit={handleSubmit} encType="multipart/form-data"  >

                        <div className="modal-body row">
                            <input type="hidden" id="productImage" />

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="editName">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editName"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="editPrice">Precio</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="editPrice"
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Precio*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-price"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="editSku">Sku</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editSku"
                                        name="sku"
                                        type="number"
                                        className="form-control"
                                        placeholder="Sku*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-sku"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="editDescription">Descripcion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="editDescription"
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        placeholder="Descripcion*"
                                        rows="3"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-description"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0 ">

                                <label className="small text-secondary" htmlFor="editStock">Cantidad</label>

                                <div className="input mb-3">

                                    <input
                                        id="editStock"
                                        name="stock"
                                        type="number"
                                        className="form-control"
                                        placeholder="Cantidad*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-stock"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" >Imagen</label>

                                <div className="input mb-3">

                                    <input
                                        type="file"
                                        name="editImage"
                                        id="editImage"
                                        className="form-control"


                                    />




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
