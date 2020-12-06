
import React, { useState } from 'react';
import $ from 'jquery';
import { db, storage } from '../../../config/Firebase';

export default function CreateRecipe() {

    //Hoks para capturar datos
    const [url, setUrl] = useState();

    const [recipe, createRecipe] = useState({

        name: "",
        category: "",
        ingredients: "",
        preparation: "",
        image: "",
        id: ""

    });

    //ONchange

    const cambiaFormPut = e => {
        if ($("#image").val()) {
            uploadImage();
        }


    }
    
    
    function uploadImage() {
        var file = $("#image").get(0).files[0];
        
        //dynamically set reference to the file name
        var ImageRef = storage.ref('ImageRecipes').child(file.name);
        //put request upload file to firebase storage
        ImageRef.put(file).then(function (snapshot) {
            imageUrl(ImageRef)
        });


    }

    function imageUrl(ImageRef) {
        ImageRef.getDownloadURL().then(function (url) {
            createRecipe({
                'name': $("#name").val(),
                'category': $("#category").val(),
                'ingredients': $("#ingredients").val(),
                'preparation': $("#preparation").val(),
                'image':url


            })
            
        }).catch(function (error) {
        });
    }



    const submitPut = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { name, category, ingredients, preparation, image} = recipe;


        //Validar campos 
        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (category === "") {

            $(".invalid-category").show();
            $(".invalid-category").html("Completa este campo");
            return;
        }
        if (ingredients === "") {

            $(".invalid-ingredients").show();
            $(".invalid-ingredients").html("Completa este campo");
            return;
        }



        if (preparation === "") {

            $(".invalid-preparation").show();
            $(".invalid-preparation").html("Completa este campo");
            return;
        }

        if (image === "") {

            $(".invalid-image").show();
            $(".invalid-image").html("Completa este campo");
            return;
        }
        db.collection('Recipes').doc().set(recipe);
        $(".modal-footer").before(`<div class="alert alert-success">Receta guardada</div>`)

        $('button[type="submit"]').remove();

        setTimeout(() => { window.location.href = "/"; }, 1000)
    }






    //Retornar vista

    return (

        <div className="modal  " id="createRecipe" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Nueva Receta</h4>
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

                                <label className="small text-secondary" htmlFor="Apellidos">Categoria</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="category"
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        placeholder="Categoria*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-category"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Ingredientes</label>

                                <div className="input-group mb-3">

                                    <textarea
                                        id="ingredients"
                                        name="ingredients"
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingredientes*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Preparacion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="preparation"
                                        name="preparation"
                                        type="text"
                                        className="form-control"
                                        placeholder="Preparacion*"
                                        rows="3"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-preparation"></div>

                                </div>

                            </div>

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="image">Imagen</label>

                                <div className="input mb-3">

                                    <input
                                        type="file"
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
