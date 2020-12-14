import React, { useState, useEffect, Profiler } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
//Componente login
//Componenentes Fisicos

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import NavbarUser from './components/navbar/NavbarUser';

//Componentes dinamicos
import Login from './components/login/Login';
import Recipes from './components/contents/recipes/Recipes'
import Recipe from './components/contents/recipe/Recipe'
import Users from './components/contents/users/Users'
import Error404 from './components/contents/error404/Error404';
import Home from './components/contents/home/Home';
import { auth, db } from './config/Firebase';
import { renderIntoDocument } from 'react-dom/test-utils';
import Register from './components/register/Register'


function App() {
 
const [user,setUser]=useState({data:[]}
 
);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const id = user.uid;
        db.collection('Users').doc(id).get()

          .then(function (doc) {
            if (doc.exists) {
              const data = doc.data(); 
              localStorage.setItem("NAME", data.name);
              localStorage.setItem("AUTH", true);
              localStorage.setItem("ID", id);
              localStorage.setItem("ROL", data.rol);
            } else {

              console.log("No such document!");
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);
          });

        console.log("Tenemos");


      } else {
        console.log(user+ "No tenemos");
      }
    });


  }, [])


  if (!localStorage.getItem("AUTH")) {
    return (
      <>
        <Navbar />
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Receta/:id" component= {Recipe} />

            <Route component={Login} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );


  }if(localStorage.getItem("ROL")=="user"){
    return (
      <>
        <NavbarUser data={user}/>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Recetas" component={Recipes} />
            <Route exact path="/Receta/:id" component= {Recipe} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }if(localStorage.getItem("ROL")=="admin"){
    return (
      <>
        <NavbarUser/>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Usuarios" component={Users} />
            <Route exact path="/Recetas" component={Recipes} />
            <Route exact path="/Receta/:id" component= {Recipe} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
  
}


export default App;
