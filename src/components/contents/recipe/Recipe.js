import React, { useState, useEffect } from 'react';
import { db } from '../../../config/Firebase';
import { Link } from 'react-router-dom';
import img from '../../../img/default.png';


const Recipe = (props) => {
    const { id } = props.match.params;
    const [Id, setId] = useState();
    const [listar,setListar]=useState();

    const [receta, setReceta] = useState([]);

    const getReceta = async () => {
        const receRef = await db.collection('Recipes').get();

        receRef.forEach(element => {
            if (element.data().name.toUpperCase() === id.toUpperCase()) {
                setReceta(element.data());
                console.log(element.data());
                setId(element.id);
            }

        });
    }
    
    var cadena =String(receta.preparation),
    separador = ".-", // un espacio en blanco
    list= cadena.split(separador);

console.log(cadena);
    

    
    useEffect(() => {
        getReceta();
        window.scrollTo(0, 0);
        
    }, []);

    const renderNo = () => (
        <div className="card text-center" style={{ borderColor: "white" }}>
            <h2 className="headline text-warning" style={{ fontFamily: "Lucida Calligraphy" }}>Sin información</h2>
            <h3 style={{ fontFamily: "Lucida Calligraphy" }}>Aún no se ha añadido esa Receta</h3>
            <img src={{ img }} alt="no data" className="mx-auto" />
            <Link style={{ fontFamily: "Lucida Calligraphy" }} to="#">Añadir una nueva
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-emoji-laughing p-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path fillRule="evenodd" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z" />
                    <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
            </Link>
        </div>

    )
    const renderCard = () => (
        <div className="card" style={{ marginTop: "20px" }}>


            <div className="card-body" >
                <div className="row mb-3">
                    
                    <div className="col-12 text-left">
                        <h1 style={{ fontWeight: "bold", fontSize: "5rem" }}>{receta.name}</h1>
                        
                    </div>
                    <img src={receta.image} className="col-8 " />
                    <p>Creada por: {receta.user}</p>
                    <div className="col-12 text-center">
                        <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Ingredientes</h1>
                        <p >{receta.ingredients}</p>
                    </div>
                    <div className="col-12 text-center">
                        <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Preparacion</h1>
                        <p >{receta.preparation}</p>
                    </div>
                </div>

            </div>

        </div>
    )

    const find = () => {
        if (receta.Nombre !== "") {
            return renderCard();
        } else {
            return renderNo();
        }
    }

    return (
        <div className="container">
            {find()}
        </div>
    );
}

export default Recipe;