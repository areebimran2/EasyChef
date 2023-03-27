import React from 'react'
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import './logo-easy-chef.jpg';
import Search from '../search';
import { BrowserRouter, Link, Route } from 'react-router-dom';

class Navbar extends React.Component {
  render (){
    return (
      <nav className="navbar navbar-expand-sm justify-content-between shadow-sm fixed-top bg-white">
        <div className="container">
            <a href="index.html"><img className="img-fluid logo-img" src='./logo-easy-chef.jpg' alt="logo"/></a>
        
            <div className="d-flex">
                <ul className="nav">
                    <li className="nav-item">
                    <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="myRecipe.html">My recipes</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/addRecipe">Add recipe</a>
                    {/* <Link to="/addRecipe">Add Recipe</Link> */}
                    </li>
                    <li>
                        <Search/>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link dropdown-toggle position-relative" href="#" role="button" data-bs-toggle="dropdown"><i className="fa-solid fa-circle-user"></i></a>
                        <ul className="dropdown-menu position-absolute ">
                        <li><a className="dropdown-item" href="editProfile.html">Edit Profile</a></li>
                        <li><a className="dropdown-item" href="shoppingList.html">Shopping List</a></li>
                        <li><a className="dropdown-item" href="#">Log out</a></li>
                        </ul>
                    </li>
                </ul>                
            </div>
        </div>
    </nav>
    )
      
  }
}

export default Navbar;