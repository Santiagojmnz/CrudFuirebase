import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {db} from '../../../config/Firebase';

const Home= () => {
  const [recetas, setRecetas] = useState([]);

  const getRecetas = async () => {
    const receRef = await db.collection('Recipes').get();
    
    const Rece = [];
    receRef.forEach(element =>{
      Rece.push(element.data());
    });
    setRecetas(Rece);
  }

    useEffect(()=> {
    //leer datos
    getRecetas();
    }, []);
    
    return (
      <div className="container">
        <div className="row">
          {recetas.map((receta) => (
            <div key={receta.name} className="card mb-3" style={{width: "19rem",marginLeft: '5%', marginTop: '2%'}}>
              <img src={receta.image} className="card-img-top" style={{height: '230px'}} alt={receta.name} />
              <div className="card-body">
                <h5 className="card-text font-weight-bold text-truncate" >{receta.name}</h5>
                <p className="card-text text-monospace">{}</p>
                <p className="card-text text-truncate font-italic" >{receta.preparation}</p>
                <Link to={`/Receta/${receta.name}`} className="card-link">Leer completa</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Home;