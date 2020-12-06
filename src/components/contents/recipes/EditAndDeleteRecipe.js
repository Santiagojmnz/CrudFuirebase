import React, { useState } from 'react';
import $, { data } from 'jquery';
import Swal from 'sweetalert2';
import { db, storage } from '../../../config/Firebase';

export default function EditAndDeleteRecipe() {
    //Hook para capturar datos
    const [id, setId] = useState('');
    const [recipe, editRecipe] = useState({

        name: "",
        category: "",
        ingredients: "",
        preparation: "",
        image: "",
        id:""

    });

    //Onchange

    const handleChange = e => {


        var file = $("#editImage").get(0).files[0];
        if (!$("#editImage").val()) {

            editRecipe({
                'name': $("#editName").val(),
                'category': $("#editcategory").val(),
                'ingredients': $("#editingredients").val(),
                'preparation': $("#editpreparation").val(),
                'image': $("#recipeImage").val()


            })

        } else {
            uploadImage(file);
        }


    }

    function uploadImage(file) {

        //dynamically set reference to the file name
        var ImageRef = storage.ref('ImageRecipes').child(file.name);
       //put request upload file to firebase storage
        ImageRef.put(file).then(function (snapshot) {
                imageUrl(ImageRef)
            });


    }
    function imageUrl(ImageRef) {
        ImageRef.getDownloadURL().then(function (url) {

            editRecipe({
                'name': $("#editName").val(),
                'category': $("#editcategory").val(),
                'ingredients': $("#editingredients").val(),
                'preparation': $("#editpreparation").val(),
                'image': url,


            })


        }).catch(function (error) {
        });
    }


    //Onsubmit 
    const handleSubmit = async e => {
        $('.alert').remove();

        e.preventDefault();



        const { name, category, ingredients, preparation} = recipe;

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
        
        $(".modal-footer").before(`<div class="alert alert-success">Receta Actualizada</div>`)
        db.collection('Recipes').doc(id).set(recipe);
        $('button[type="submit"]').remove();

        setTimeout(() => { window.location.href = "/"; }, 1000)



    }



    $(document).on("click", ".editInputs", function (e) {
        e.preventDefault();
        const data = $(this).attr("data").split(',');
        setId(data[0]);
               
        $("#recipeImage").val(data[5]);
        $("#editName").val(data[1]);
        $("#editcategory").val(data[2]);
        $("#editingredients").val(data[3]);
        $("#editpreparation").val(data[4]);
       




    })

    //DAtos para eliminar producto
    $(document).on("click", ".delete", function (e) {

        e.preventDefault();
        const data = $(this).attr("data").split(',');

        //Confirmar accion

        Swal.fire({
            title: 'Eliminar receta',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                //servicio Delete
                const RecipeDelete = async () => {
                    console.log(data);
                    db.collection('Recipes').doc(data[0]).delete();

                    if (data) {

                        Swal.fire({
                            type: "success",
                            title: "Receta eliminada correctamente",
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
                            title: "Receta no encontrada",
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/";

                            }

                        })

                    }



                }
                RecipeDelete();

            }

        })


    })








    //Vista de formulario
    return (

        <div className="modal  " id="editRecipe" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Editar Receta</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={handleChange} onSubmit={handleSubmit} encType="multipart/form-data"  >

                        <div className="modal-body row">
                            <input type="hidden" id="recipeImage" />

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

                                <label className="small text-secondary" htmlFor="editcategory">Categoria</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="editcategory"
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        placeholder="Precio*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-category"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="editingredients">Ingredientes</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editingredients"
                                        name="ingredients"
                                        type="text"
                                        className="form-control"
                                        placeholder="ingredients*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-ingredients"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="editpreparation">Descripcion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="editpreparation"
                                        name="preparation"
                                        type="text"
                                        className="form-control"
                                        placeholder="Descripcion*"
                                        rows="3"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-preparation"></div>

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
