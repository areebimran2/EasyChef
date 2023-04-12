import React from "react";
import notfound from './local-file-not-found.png'
import { useNavigate } from "react-router-dom";

const Card = ({ id, recipe, deleted, setDeleted }) => {
    const token = localStorage.getItem('token')
    let navigate = useNavigate()

    return (
        <div class="card infocard bg-white text-black" key={recipe.id}>
            <img class="card-img" src={recipe.picture !== null ? recipe.picture : notfound} alt=""/>
            <div class="card-body hidedetails">
                <div class="card-title mt-3">{recipe.name}</div>
                <div class="d-flex mb-2">
                    {[...Array(6).keys()]
                        .filter((item) => (item > 0))
                        .map((index, item) => (
                            item < recipe.ave_rating ? <i key={index} class="mt-auto mb-auto fa-solid fa-star"></i> : <i key={index} class="mt-auto mb-auto fa-regular fa-star"></i>
                        ))}
                    <p class="mx-1 mt-auto mb-auto">{recipe.ave_rating}</p>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <button type="button" class="btn-sm btn-outline-brown px-3 mb-0" onClick={() => {navigate(`/recipe/${recipe.id}`)}}>View</button>
                    </div>
                    {id === "mycreated" ? 
                    <div>
                        <button type="button" class="btn-sm btn-outline-brown px-3 mx-2">Edit</button>
                        <button onClick={() => {
                            fetch(`http://localhost:8000/recipes/recipe/${recipe.id}/delete`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            }).then(() => {setDeleted(!deleted)});
                        }} type="button" class="btn-sm btn-outline-brown">Delete</button>
                    </div> 
                    : undefined
                    }
                </div>
                <div class="card recipecard mt-2 p-3 bg-light-brown">
                    <ul class="list-unstyled mb-0 lh-lg">
                        <li><span class="fw-bold">Diet:</span> Vegan</li>
                        <li><span class="fw-bold">Cuisine:</span> Western</li>
                        <li><span class="fw-bold">Cooking time:</span> {recipe.cooking_time} minutes</li>
                        <li><span class="fw-bold">Prep time:</span> {recipe.prep_time} minutes</li>
                        <li><span class="fw-bold">Servings: </span>{recipe.serving_size}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;