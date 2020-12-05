import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
//Componente login
//Componenentes Fisicos

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

//Componentes dinamicos
import Login from './components/login/Login';
import Products from './components/contents/recipes/Recipes'
import Users from './components/contents/users/Users'
import Error404 from './components/contents/error404/Error404';

function App() {


  return (
   

      <>
        
        <Navbar/>
        <Header />
       
        

        <BrowserRouter>
          <Switch>
            <Route exact path="/Usuarios" component={Users} />
            <Route exact path="/Productos" component={Products} />
            <Route exact path="/Login" component={Login} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>

        <Footer />


      </>

    
  );
}


export default App;
