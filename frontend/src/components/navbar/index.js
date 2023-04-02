import React from 'react'
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import './logo-easy-chef.jpg';
import Search from '../search';
import { Link } from "react-router-dom";
import logo from './logo-easy-chef.jpg'; 

class Navbar extends React.Component {
  render (){
    return (
      <nav className="navbar navbar-expand-sm justify-content-between shadow-sm fixed-top bg-white">
        <div className="container">
          <Link to="/"><img className="img-fluid logo-img" src={logo} alt="logo"/></Link>
        
            <div className="d-flex">
                <ul className="nav">
                    <li className="nav-item">
                    <Link to="/" className='nav-link'>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/my-recipes" className='nav-link'>My Recipes</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/recipes/add" className='nav-link'>Add Recipe</Link>
                    </li>
                    <li>
                        <Search/>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link dropdown-toggle position-relative" href="#" role="button" data-bs-toggle="dropdown"><i className="fa-solid fa-circle-user"></i></a>
                        <ul className="dropdown-menu position-absolute ">
                          <li><Link to="/profile" className='dropdown-item'>Profile</Link></li>
                          <li><Link to="/shoppinglist" className='dropdown-item'>Shopping List</Link></li>
                          <li><Link to="/logout" className='dropdown-item'>Log out</Link></li>
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