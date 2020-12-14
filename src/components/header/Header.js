import React from 'react';
import headerBg from '../../img/header.jpg';

export default function Header() {




	return (

			<div className="container-fluid imageBg " >

				<div className="row ml-5">
					<div className="ml-5 mt-4">
						<div className="ml-5">
							<h2 className="text-light">Aprende algo nuevo</h2>
							<p className="text-light">¿Que vamos a cocinar hoy?</p>
							<form className="form-inline d-flex  mt-2">
								<input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
									aria-label="Search" />
								<i className="fas fa-search text-light " aria-hidden="true"></i>
							</form>
						</div>
					</div>
				</div>
			</div>
		
	);


}