import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
//Componente login
//Componenentes Fisicos

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

//Componentes dinamicos
import Login from './components/login/Login';
import Products from './components/contents/products/Products'
import Customers from './components/contents/customers/Customers'

function App() {


  return (
   

      <div className="wrapper">


        <Header />
        

        <BrowserRouter>
          <Switch>
            <Route exact path="/clientes" component={Customers} />
            <Route exact path="/" component={Products} />
            <Route exact path="/Login" component={Login} />
          </Switch>
        </BrowserRouter>

        <Footer />


      </div>

    
  );
}


export default App;
