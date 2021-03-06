import React from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { db } from '../../../config/Firebase';
import CreateProduct from './CreateRecipe';
import EditAndDeleteProduct from './EditAndDeleteRecipe';

export default function Recipes() {
	const recipesData = async () => {
		//creamos el dataset
		const getRecipes = await db.collection('Recipes').get();


		const Data = [];
		getRecipes.forEach((recipe) => {
			Data.push({ ...recipe.data(), id: recipe.id });

		})
		const dataSet = []
		Data.forEach((recipe, index) => {
			dataSet[index] = [(index + 1), recipe.image, recipe.name, recipe.category, recipe.ingredients, recipe.preparation,
			[recipe.id, recipe.name, recipe.category, recipe.ingredients, recipe.preparation, recipe.image]]


		})

		console.log(dataSet);
		//SE ejecuta dataTable
		$(document).ready(function () {
			$('.table').DataTable({
				retrieve: true,
				data: dataSet,
				columns: [
					{ title: "#" },
					{
						title: "Receta",
						render: function (data) {

							return `<img src="${data}" style="width:120px">`

						}
					},
					{ title: "Nombre" },
					{ title: "Categoria" },
					{ title: "Ingredientes" },
					{ title: "Preparacion" },

					{
						title: "Editar/Eliminar",
						render: function (data) {


							return `
					  
							<a href="" class="editInputs" data-toggle="modal" data-target="#editRecipe" data='${data}'>

							<button type="button" class="btn btn-primary btn-sm">Editar</button>
	  
							</a>
	  
							<a href="" class="delete" data='${data}'>
								
							<button type="button" class="btn btn-danger btn-sm">Eliminar</button>
							</a>`

						}
					}
				],



				"language": {

					"sProcessing": "Procesando...",
					"sLengthMenu": "Mostrar _MENU_ registros",
					"sZeroRecords": "No se encontraron resultados",
					"sEmptyTable": "Ningún dato disponible en esta tabla",
					"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
					"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
					"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
					"sInfoPostFix": "",
					"sSearch": "Buscar:",
					"sUrl": "",
					"sInfoThousands": ",",
					"sLoadingRecords": "Cargando...",
					"oPaginate": {
						"sFirst": "Primero",
						"sLast": "Último",
						"sNext": "Siguiente",
						"sPrevious": "Anterior"
					},
					"oAria": {
						"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
						"sSortDescending": ": Activar para ordenar la columna de manera descendente"
					}

				}
			});
		})


	}
	recipesData();

	//SE RETORNA VISTA DEL COMPONENTE
	return (

		<div className="content" style={{ minHeight: "494px" }}>

			<div className="content-header">

				<div className="container-fluid">

					<div className="row mb-2">

						<div className="col-sm-6">

							<h1 className="m-0 text-dark">Recetas</h1>

						</div>

					</div>

				</div>

			</div>

			<div className="content">

				<div className="container-fluid">

					<div className="row">

						<div className="col-lg-12">

							<div className="card card-primary card-outline">

								<div className="card-header">

									<h5 className="m-0">

										<button className="btn btn-primary" data-toggle="modal" data-target="#createRecipe">Nueva Receta</button>

									</h5>

								</div>

								<div className="card-body">

									<table className="table table-striped text-truncate dt-responsive" style={{ "width": "100%" }}>




									</table>

								</div>

							</div>

						</div>

					</div>

				</div>

			</div>


			<CreateProduct />
			<EditAndDeleteProduct />

		</div>

	)

}

// getProducts
