import React from 'react';

export default function Card({props}){

    return(
        <div className="col-md-4 my-3">
            <div className="card" >
            <img src={props.image} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <ul>
                    <li>Status:{props.status}</li>
                    <li>Specie:{props.species}</li>
                    <li>Gender:{props.gender}</li>
                    <li>Origin:{props.origin.name}</li>
                </ul>
            </div>
            </div>
        </div>

    )

}


