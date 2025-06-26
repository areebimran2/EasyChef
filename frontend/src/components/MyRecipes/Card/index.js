import React from "react";
import notfound from "./local-file-not-found.png";
import { useNavigate } from "react-router-dom";

function getCuisine(cuisine) {
    switch (cuisine) {
        case "NONE":
            return "None";
        case "CN":
            return "Chinese";
        case "CR":
            return "Creole";
        case "FR":
            return "French";
        case "IN":
            return "Indian";
        case "IT":
            return "Italian";
        case "JP":
            return "Japanese";
        case "KO":
            return "Korean";
        case "ME":
            return "Middle Eastern";
        case "WE":
            return "Western";
        default:
            return "";
    }
}

function getDiet(diets) {
    return diets.map((item) => {
        switch (item) {
            case "NONE":
                return "None";
            case "VEGAN":
                return "Vegan";
            case "VEG":
                return "Vegeterian";
            case "GLUTENF":
                return "Gluten free";
            case "LCARB":
                return "Low carb";
            case "KT":
                return "Keto";
            case "LF":
                return "Low fat";
            default:
                return "";
        }
    });
}

const Card = ({ id, recipe, deleted, setDeleted }) => {
    const token = localStorage.getItem("token");
    let navigate = useNavigate();

    return (
        <div class="card homecard bg-white text-black" key={recipe.id}>
            <img
                class="card-img"
                src={recipe.picture !== null ? recipe.picture : notfound}
                alt=""
            />
            <div class="card-body hidedetails">
                <div class="card-title mt-3">{recipe.name}</div>
                <div class="d-flex">
                    {[...Array(6).keys()]
                        .filter((item) => item > 0)
                        .map((index, item) =>
                            item < recipe.ave_rating ? (
                                <i key={index} class="mt-auto mb-auto fa-solid fa-star"></i>
                            ) : (
                                <i key={index} class="mt-auto mb-auto fa-regular fa-star"></i>
                            )
                        )}
                    <p class="mx-1 mb-auto">{recipe.ave_rating}</p>
                </div>
                <div className="mt-2 mb-2">Number of Favourites: {recipe.num_fav}</div>
                <div class="d-flex justify-content-around">
                    <button
                        type="button"
                        class="btn-sm btn-outline-brown px-3 mb-0"
                        onClick={() => {
                            navigate(`/recipe/${recipe.id}`);
                        }}
                    >
                        View
                    </button>
                    {id === "mycreated" ? (
                        <div>
                            <button type="button" class="btn-sm btn-outline-brown px-3 mb-0"
                            onClick={() => {
                                navigate(`/recipe/${recipe.id}/edit`);
                            }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    fetch(
                                        `http://localhost:8000/recipes/recipe/${recipe.id}/delete`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    ).then(() => {
                                        setDeleted(!deleted);
                                    });
                                }}
                                type="button"
                                class="btn-sm btn-outline-brown px-3 mb-0 ms-1"
                            >
                                Delete
                            </button>
                        </div>
                    ) : id === "shoppinglist" ? (
                        <button
                                onClick={() => {
                                    fetch(
                                        `http://localhost:8000/recipes/recipe/${recipe.id}/shopping-list/remove/`,
                                        {
                                            method: "PATCH",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    ).then(() => {
                                        setDeleted(!deleted);
                                    });
                                }}
                                type="button"
                                class="btn-sm btn-outline-brown px-3 mb-0"
                            >
                                Remove
                        </button>
                    ) : undefined}
                </div>
                <div class="card recipecard mt-2 p-3 bg-light-brown">
                    <ul class="list-unstyled mb-0 lh-lg">
                        <li>
                            <span class="fw-bold">Diet:</span> {getDiet(recipe.diet).length > 2 ? <span>{getDiet(recipe.diet).slice(0, 2).map((item, index) => (
                                index > 0 ? <span>, {item}</span> : <span>{ item}</span>
                            ))}, ...</span> : getDiet(recipe.diet).slice(0, 2).map((item, index) => (
                                index > 0 ? <span>, {item}</span> : <span>{ item}</span>
                            ))}
                        </li>
                        <li>
                            <span class="fw-bold">Cuisine:</span> {getCuisine(recipe.cuisine)}
                        </li>
                        <li>
                            <span class="fw-bold">Cooking time:</span> {recipe.cooking_time}{" "}
                            minutes
                        </li>
                        <li>
                            <span class="fw-bold">Prep time:</span> {recipe.prep_time} minutes
                        </li>
                        <li>
                            <span class="fw-bold">Servings: </span>
                            {recipe.serving_size}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export { getCuisine, getDiet };
export default Card;