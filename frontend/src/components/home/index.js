import React, {useEffect, useState} from 'react';
import '../../custom.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

//class Home extends React.Component{
//    render(){
//    }
//}

const HomeComp = () => {
    var [recipes, setRecipes] = useState();
    const dietCode = {"NONE": "N/A", "VEGAN": "Vegan", "VEG": "Vegetarian", 
    "GLUTENF": "Gluten-free", "LCARB": "Low-carb", "KT": "Keto", "LF": "Low-fat"}
    const cuisineCode = {"NONE": "N/A", "CN": "Chinese", "CR": "Creole", 
    "FR": "French", "IN": "Indian", "JP": "Japanese", "KO": "Korean", "ME": "Middle-Eastern", "WE": "Western"}

    useEffect(() => {
        fetch('http://localhost:8000/recipes/all/',
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])

    //console.log(recipes)

    if (recipes === undefined){
        return (
            <>
            <div className="container-1000 mt-5 ms-auto me-auto">
                <h1><a href="extendRecipeHistory.html" className="header-link mb-2">Popular Recipes</a></h1>
                <div className="d-flex flex-row flex-wrap gap-3">
                    <h2>No recipes created yet!</h2>
                </div>
            </div>
        </>
        )
    }
    

    return(
        <>
            <div className="container-1000 mt-5 ms-auto me-auto">
                <h1><a href="extendRecipeHistory.html" className="header-link mb-2">Popular Recipes</a></h1>
                <div className="d-flex flex-row flex-wrap gap-3">
                    {recipes.results.sort((a, b) => a.num_fav < b.num_fav ? 1: -1).slice(0, 6).map((recipe, i) => (
                        /*
                        <div className="card card-custom infocard bg-white text-black" key={i}>
                            <Link to={{
                                pathname: `/recipe/${recipe.id}`
                            }}>
                            <img className="card-img" src={recipe.picture} alt={recipe.name}/>
                            <div className="card-body">
                              <div className="card-title">{recipe.name}</div>
                              <div className="card-favs">Number of favourites: {recipe.num_fav}</div>
                            </div></Link>
                        </div>
                        */
                        <div className="card infocard bg-white text-black" key={i}>
                        <img className="card-img" src={recipe.picture} alt={recipe.name}/>
                        <div className="card-body hidedetails">
                            <div className="card-title">{recipe.name}</div>
                            <div className="card-creator">Number of Favourites: {recipe.num_fav}</div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Link to= {{
                                        pathname: `/recipe/${recipe.id}`
                                    }}>
                                    <button className="btn-sm btn-outline-brown px-3">View</button></Link>
                                </div>
                            </div>
                            <div className="card recipecard mt-2 p-3 bg-light-brown">
                                <ul className="list-unstyled mb-0 lh-lg">
                                    <li><span className="fw-bold">Diet:</span> {dietCode[recipe.diet]}</li>
                                    <li><span className="fw-bold">Cuisine:</span> {cuisineCode[recipe.cuisine]}</li>
                                    <li><span className="fw-bold">Cooking time:</span> {recipe.cooking_time} minutes</li>
                                    <li><span className="fw-bold">Servings: </span> {recipe.serving_size}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default HomeComp;