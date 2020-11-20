
import React, { useState } from 'react';
import $ from 'jquery';
import {db} from '../../../config/Firebase';

export default function CreateProduct() {

    //Hoks para capturar datos

    const [product, createProduct] = useState({

        name: "",
        price: "",
        sku: "",
        description: "",
        stock: "",
        image: "",
        id:""

    });

    //ONchange
    
    const cambiaFormPut = e => {
       
          createProduct({


            'name': $("#name").val(),
            'price': $("#price").val(),
            'sku': $("#sku").val(),
            'description': $("#description").val(),
            'stock': $("#stock").val(),
            'image':  $("#image").val(),
           

        })
    }
    const submitPut = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { name, price, sku, description, stock, image} = product;
        
        
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
        if (image === "") {

            $(".invalid-image").show();
            $(".invalid-image").html("Completa este campo");
            return;
        }
         db.collection('Products').doc().set(product);
            $(".modal-footer").before(`<div class="alert alert-success">Producto Agregado</div>`)     
      
         $('button[type="submit"]').remove();
          
          setTimeout(() => { window.location.href = "/"; }, 1000)
    }
    





    //Retornar vista

    return (

        <div className="modal  " id="createProduct" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Nuevo Producto</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form  onChange={cambiaFormPut} onSubmit={submitPut}  >

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

                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="Apellidos">Precio</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="price"
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

                                <label className="small text-secondary" htmlFor="Nombre">Sku</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="sku"
                                        name="sku"
                                        type="number"
                                        className="form-control"
                                        placeholder="Sku*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Descripcion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="description"
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

                                <label className="small text-secondary" htmlFor="Cantidad">Cantidad</label>

                                <div className="input mb-3">

                                    <input
                                        id="stock"
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

                                <label className="small text-secondary" htmlFor="image">Imagen</label>

                                <div className="input mb-3">

                                    <input
                                        type="text"
                                        name="image"
                                        id="image"
                                        className="form-control-file border"
                                        required
                                    />

                                    <div className="invalid-feedback invalid-image"></div>


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
