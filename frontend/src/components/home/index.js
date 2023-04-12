import React, { useEffect, useState } from 'react';
import '../../custom.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import notfound from '../MyRecipes/Card/local-file-not-found.png';
import { getCuisine, getDiet } from "../MyRecipes/Card"
import { useNavigate } from 'react-router-dom';

//class Home extends React.Component{
//    render(){
//    }
//}

const HomeComp = ({ url }) => {
    let navigate = useNavigate()
    const perPage = 6;

    var [recipes, setRecipes] = useState();
    const dietCode = {"NONE": "N/A", "VEGAN": "Vegan", "VEG": "Vegetarian", 
    "GLUTENF": "Gluten-free", "LCARB": "Low-carb", "KT": "Keto", "LF": "Low-fat"}
    const cuisineCode = {"NONE": "N/A", "CN": "Chinese", "CR": "Creole", 
    "FR": "French", "IN": "Indian", "JP": "Japanese", "KO": "Korean", "ME": "Middle-Eastern", "WE": "Western"}

    useEffect(() => {
        fetch(url + `?page_size=${perPage}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [url])

    //console.log(recipes)

    if (recipes === undefined) {
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


    return (
        <>
            <div className="container-1000 mt-5 ms-auto me-auto">
                <h1>Popular Recipes</h1>
                <div className="d-flex flex-row flex-wrap gap-3">
                    {recipes.results.sort((a, b) => a.num_fav < b.num_fav ? 1 : -1).slice(0, 6).map((recipe, i) => (
                        <div className="card homecard bg-white text-black" key={recipe.id}>
                            <img className="card-img" src={recipe.picture !== null ? recipe.picture : notfound} alt=""/>
                            <div className="card-body hidedetails">
                                <div className="card-title mt-3">{recipe.name}</div>
                                <div className="d-flex">
                                    {[...Array(6).keys()]
                                        .filter((item) => (item > 0))
                                        .map((index, item) => (
                                            item < recipe.ave_rating ? <i key={index} className="mb-auto fa-solid fa-star"></i> : <i key={index} className="mb-auto fa-regular fa-star"></i>
                                        ))}
                                    <p className="mx-1 mb-auto">{recipe.ave_rating}</p>
                                </div>
                                <div className="mt-2 mb-2">Number of Favourites: {recipe.num_fav}</div>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <button type="button" className="btn-sm btn-outline-brown px-3 mb-1" onClick={() => {navigate(`/recipe/${recipe.id}`)}}>View</button>
                                    </div>
                                </div>
                                <div className="card recipecard mt-2 p-3 bg-light-brown">
                                    <ul className="list-unstyled mb-0 lh-lg">
                                        <li><span className="fw-bold">Diet:</span> {dietCode[recipe.diet]}</li>
                                        <li><span className="fw-bold">Cuisine:</span> {cuisineCode[recipe.cuisine]}</li>
                                        <li><span className="fw-bold">Cooking time:</span> {recipe.cooking_time} minutes</li>
                                        <li><span className="fw-bold">Prep time:</span> {recipe.prep_time} minutes</li>
                                        <li><span className="fw-bold">Servings: </span>{recipe.serving_size}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
};

export default HomeComp;
