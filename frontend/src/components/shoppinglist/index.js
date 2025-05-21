import React, { useEffect, useState } from 'react';
import "../../custom.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import RecipeCarousel from "../MyRecipes/RecipeCarousel";
import { useSpring, animated } from "react-spring";
import { useNavigate } from 'react-router-dom';

const ShoppingList = ({ url }) => {
    const navigate = useNavigate();
    const perPage = 3;
    const [deleted, setDeleted] = useState(false)
    const token = localStorage.getItem('token')

    const [hasEnded, setHasEnded] = useState(true)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    var [ingredients, setIngredients] = useState([]);
    var [recipes, setRecipes] = useState([]);
    
    const dietCode = {"NONE": "N/A", "VEGAN": "Vegan", "VEG": "Vegetarian", 
    "GLUTENF": "Gluten-free", "LCARB": "Low-carb", "KT": "Keto", "LF": "Low-fat"}
    const cuisineCode = {"NONE": "N/A", "CN": "Chinese", "CR": "Creole", 
    "FR": "French", "IN": "Indian", "JP": "Japanese", "KO": "Korean", "ME": "Middle-Eastern", "WE": "Western"}

    const props = useSpring({
        config: { duration: 500 },
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
        delay: 0,
    })

    useEffect(() => {
        fetch(url,
            {
                method: "GET",
                headers: token === undefined ? {} : {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/profile')
                    }
                } else {
                    return response.json()
                }
            })
            .then((data) => {if (data.list_ingredients !== undefined) {
                setIngredients(data.list_ingredients)
            }})
    }, [url, token])

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/shopping-list?p=${page}&page_size=${perPage}`,
            {
                method: "GET",
                headers: token === undefined ? {} : {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/profile')
                    }
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                setRecipes(data.results)
                setCount(data.count)
                setHasEnded(data.next === null)
            })
    }, [token, page, deleted])

    console.log(ingredients);
    console.log(recipes);

    if (recipes.length === 0) {
        return (
            <>
                    <div className="d-flex flex-row flex-wrap gap-3">
                        <h2>No recipes have been added to your shopping list!</h2>
                    </div>
            </>
        )
    }
    return (
        /*
        <>
                <div className="d-flex flex-row flex-wrap gap-3">
                    {recipes.results.map((recipe, i) => (
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
                <div className="mt-5">
                    <h1>To Buy:</h1>
                    <div className = "mt-3 d-flex d-row">
                        {ingredients.list_ingredients.map((ingredient, i) => (
                            <div className="me-5 fw-bold" key={i}>
                               - {ingredient.quantity} {ingredient.units} {ingredient.name}
                            </div>
                        ))}
                    </div>
                    
                </div>
            
        </>
        */
        <>
            <animated.div style={props}>
                <RecipeCarousel recipes={recipes} hasEnded={hasEnded} setPage={setPage} page={page} count={count} id={"shoppinglist"} deleted={deleted} setDeleted={setDeleted}/>
            </animated.div>
            <div className="mt-5">
                    <h1>To Buy:</h1>
                    <div className = "mt-3 d-flex d-row">
                        <ul>
                        {ingredients.map((ingredient, i) => (
                            <li className="me-5 fw-bold" key={i}>
                                {ingredient.quantity} {ingredient.units} {ingredient.name}
                            </li>
                        ))}
                        </ul>
                        
                    </div>
                    
                </div>
        </>
    );
}

export default ShoppingList;