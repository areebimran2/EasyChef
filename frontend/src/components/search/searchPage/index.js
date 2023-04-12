import React, { useState, useEffect } from "react";
import "../../../custom.css";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import notfound from "../../MyRecipes/Card/local-file-not-found.png";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { getCuisine, getDiet } from "../../MyRecipes/Card";
import Pagination from "../../pagination";
//import RecipeAPIContext from '../../../contexts/recipeAPIcontext';

const SearchPage = ({ url, token }) => {
    const perPage = 9;

    let navigate = useNavigate();

    var [recipes, setRecipes] = useState([]);
    var [searchResult, setSearchResult] = useState("");
    var [cuisineSearch, setCuisineSearch] = useState("");
    var [dietSearch, setDietSearch] = useState("");
    var [timeGTE, setTimeGTE] = useState(0);
    var [timeLTE, setTimeLTE] = useState(10000000);

    const dietCode = {"NONE": "N/A", "VEGAN": "Vegan", "VEG": "Vegetarian", 
    "GLUTENF": "Gluten-Free", "LCARB": "Low Carb", "KT": "Keto", "LF": "Low Fat"}
    const cuisineCode = {"NONE": "N/A", "CN": "Chinese", "CR": "Creole", 
    "FR": "French", "IN": "Indian", "JP": "Japanese", "KO": "Korean", "ME": "Middle-Eastern", "WE": "Western"}

    const [hasEnded, setHasEnded] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    /*
        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch('http://localhost:8000/recipes/search/');
                const data = await response.json();
    
                setRecipes(data);
                
            }
    
            fetchData();
        }, []);
        */

    useEffect(() => {
        fetch(
            url +
            `?p=${page}&page_size=${perPage}&` +
            new URLSearchParams({
                search: searchResult,
                cuisine: cuisineSearch,
                diet__contains: dietSearch,
                cooking_time__gte: timeGTE,
                cooking_time__lte: timeLTE,
            }),
            {
                method: "GET",
                headers:
                    token === undefined
                        ? {}
                        : {
                            Authorization: `Bearer ${token}`,
                        },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate("/login");
                    }
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data.results);
                setHasEnded(data.next === null);
                setCount(data.count);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchResult, cuisineSearch, dietSearch, timeGTE, timeLTE]);

    const onChange = (event) => {
        setSearchResult(event.target.value);
    };

    const onSearch = (e) => {
        /*
                if (recipes !== undefined){
                    const results = recipes.results.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                    || recipe.creator.toLowerCase().includes(searchTerm.toLowerCase()))
                    
                    //console.log(results);
                    setSearchRecipes(results);
                }
                */

        setPage(1);
        e.preventDefault();
        setSearchResult($("#searchBar").val());
        setDietSearch($("#diet").val());
        setCuisineSearch($("#cuisine").val());
        setTimeGTE($("#cookingtime").val().split(",")[0]);
        setTimeLTE($("#cookingtime").val().split(",")[1]);
    };

    /*
        useEffect(() => {
            //console.log(timeGTE);
            //console.log(timeLTE)
        }, [timeGTE, timeLTE])
        */

    //console.log(searchResult);

    if (recipes.length === 0) {
        return (
            <>
                <div className="sidebar card justify-content-center shadow-sm">
                    <form className="form-horizontal">
                        <div className="mt-5 ms-4">
                            <h2>
                                <b>Diet Options</b>
                            </h2>
                            <select
                                className="form-select-sm" id="diet">
                                <option value="">Select a Diet</option>
                                <option value="NONE">None</option>
                                <option value="VEGAN">Vegan</option>
                                <option value="VEG">Vegetarian</option>
                                <option value="GLUTENF">Gluten-free</option>
                                <option value="LCARB">Low carb</option>
                                <option value="KT">Keto</option>
                                <option value="LF">Low Fat</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2>
                                <b>Cuisine Options</b>
                            </h2>
                            <select
                                className="form-select-sm" id="cuisine">
                                <option value="">Select a Cuisine</option>
                                <option value="NONE">None</option>
                                <option value="CN">Chinese</option>
                                <option value="CR">Creole</option>
                                <option value="FR">French</option>
                                <option value="IN">Indian</option>
                                <option value="JP">Japanese</option>
                                <option value="KO">Korean</option>
                                <option value="ME">Middle-Eastern</option>
                                <option value="WE">Western</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2>
                                <b>Cooking Time</b>
                            </h2>
                            <select className="form-select-sm" id="cookingtime">
                                <option value="0,10000000">Select a Cooking Time</option>
                                <option value="0,14">Less than 15 minutes</option>
                                <option value="15,30">15-30 minutes</option>
                                <option value="31,60">31-60 minutes</option>
                                <option value="61,10000000">Over 60 minutes</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2>
                                <b>Search Recipe</b>
                            </h2>
                            <input
                                type="text"
                                className="form-control"
                                name="searchBar"
                                id="searchBar"
                                placeholder="Search..."
                                onChange={onChange}
                            />
                        </div>

                        <div className="text-center mt-5">
                            <button className="btn btn-blue" onClick={(e) => onSearch(e)}>
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    No Recipes have been created!
                </div>
            </>
        );
    }

    return (
        <>
            <div className="sidebar card justify-content-center shadow-sm">
                <form className="form-horizontal">
                    <div className="mt-5 ms-4">
                        <h2>
                            <b>Diet Options</b>
                        </h2>
                        <select className="form-select-sm" id="diet">
                            <option value="">Select a Diet</option>
                            <option value="NONE">None</option>
                            <option value="VEGAN">Vegan</option>
                            <option value="VEG">Vegetarian</option>
                            <option value="GLUTENF">Gluten-free</option>
                            <option value="LCARB">Low carb</option>
                            <option value="KT">Keto</option>
                            <option value="LF">Low Fat</option>
                        </select>
                    </div>

                    <div className="mt-3 ms-4">
                        <h2>
                            <b>Cuisine Options</b>
                        </h2>
                        <select className="form-select-sm" id="cuisine">
                            <option value="">Select a Cuisine</option>
                            <option value="NONE">None</option>
                            <option value="CN">Chinese</option>
                            <option value="CR">Creole</option>
                            <option value="FR">French</option>
                            <option value="IN">Indian</option>
                            <option value="JP">Japanese</option>
                            <option value="KO">Korean</option>
                            <option value="ME">Middle-Eastern</option>
                            <option value="WE">Western</option>
                        </select>
                    </div>

                    <div className="mt-3 ms-4">
                        <h2>
                            <b>Cooking Time</b>
                        </h2>
                        <select className="form-select-sm" id="cookingtime">
                            <option value="0,10000000">Select a Cooking Time</option>
                            <option value="0,14">Less than 15 minutes</option>
                            <option value="15,30">15-30 minutes</option>
                            <option value="31,60">31-60 minutes</option>
                            <option value="61,10000000">Over 60 minutes</option>
                        </select>
                    </div>

                    <div className="mt-3 ms-4">
                        <h2>
                            <b>Search Recipe</b>
                        </h2>
                        <input
                            type="text"
                            className="form-control"
                            id="searchBar"
                            defaultValue={searchResult}
                            placeholder="Search..."
                        />
                    </div>

                    <div className="text-center mt-5">
                        <button className="btn btn-blue" onClick={(e) => onSearch(e)}>
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div>
                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    {recipes.map((recipe, i) => (
                        <div className="card homecard bg-white text-black" key={recipe.id}>
                            <img
                                className="card-img"
                                src={recipe.picture !== null ? recipe.picture : notfound}
                                alt=""
                            />
                            <div className="card-body hidedetails">
                                <div className="card-title mt-3">{recipe.name}</div>
                                <div className="d-flex">
                                    {[...Array(6).keys()]
                                        .filter((item) => item > 0)
                                        .map((index, item) =>
                                            item < recipe.ave_rating ? (
                                                <i key={index} className="mb-auto fa-solid fa-star"></i>
                                            ) : (
                                                <i key={index} className="mb-auto fa-regular fa-star"></i>
                                            )
                                        )}
                                    <p className="mx-1 mb-auto">{recipe.ave_rating}</p>
                                </div>
                                <div className="mt-2 mb-2">Created By: {recipe.creator}</div>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <button
                                            type="button"
                                            className="btn-sm btn-outline-brown px-3 mb-1"
                                            onClick={() => {
                                                navigate(`/recipe/${recipe.id}`);
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                                <div className="card recipecard mt-2 p-3 bg-light-brown">
                                    <ul className="list-unstyled mb-0 lh-lg">
                                        <li>
                                            <span class="fw-bold">Diet:</span>{" "}
                                            {getDiet(recipe.diet).length > 2 ? (
                                                <span>
                                                    {getDiet(recipe.diet)
                                                        .slice(0, 2)
                                                        .map((item, index) =>
                                                            index > 0 ? (
                                                                <span>, {item}</span>
                                                            ) : (
                                                                <span>{item}</span>
                                                            )
                                                        )}
                                                    , ...
                                                </span>
                                            ) : (
                                                getDiet(recipe.diet)
                                                    .slice(0, 2)
                                                    .map((item, index) =>
                                                        index > 0 ? (
                                                            <span>, {item}</span>
                                                        ) : (
                                                            <span>{item}</span>
                                                        )
                                                    )
                                            )}
                                        </li>
                                        <li>
                                            <span class="fw-bold">Cuisine:</span>{" "}
                                            {getCuisine(recipe.cuisine)}
                                        </li>
                                        <li>
                                            <span className="fw-bold">Cooking time:</span>{" "}
                                            {recipe.cooking_time} minutes
                                        </li>
                                        <li>
                                            <span className="fw-bold">Prep time:</span> {recipe.prep_time}{" "}
                                            minutes
                                        </li>
                                        <li>
                                            <span className="fw-bold">Servings: </span>
                                            {recipe.serving_size}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="d-flex justify-content-center mt-3 gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        class="btn btn btn-outline-brown mx-3"
                        type="button"
                    >
                        <span>PREV</span>
                    </button>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(1)}
                        class="btn rounded-pill btn-outline-brown"
                        type="button"
                    >
                        <span>1</span>
                    </button>
                    <Pagination
                        count={count}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                    />
                    {Math.ceil(count / perPage) <= 5 ? (
                        Math.ceil(count / perPage) !== 1 ? (
                            <button
                                disabled={page === Math.ceil(count / perPage)}
                                onClick={() => setPage(Math.ceil(count / perPage))}
                                class="btn rounded-pill btn-outline-brown"
                                type="button"
                            >
                                <span>{Math.ceil(count / perPage)}</span>
                            </button>
                        ) : undefined
                    ) : (
                        (Math.ceil(count / perPage) + 1) % 3 === 0
                            ? page >= Math.ceil(count / perPage) - 3
                            : (Math.ceil(count / perPage) - 1) % 3 === 0
                                ? page >= Math.ceil(count / perPage) - 2
                                : page >= Math.ceil(count / perPage) - 1
                    ) ? (
                        <>
                            <button
                                disabled={page === Math.ceil(count / perPage)}
                                onClick={() => setPage(Math.ceil(count / perPage))}
                                class="btn rounded-pill btn-outline-brown"
                                type="button"
                            >
                                <span>{Math.ceil(count / perPage)}</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <span>. . .</span>
                            <button
                                disabled={page === Math.ceil(count / perPage)}
                                onClick={() => setPage(Math.ceil(count / perPage))}
                                class="btn rounded-pill btn-outline-brown"
                                type="button"
                            >
                                <span>{Math.ceil(count / perPage)}</span>
                            </button>
                        </>
                    )}
                    <button
                        disabled={hasEnded}
                        onClick={() => setPage(page + 1)}
                        class="btn btn-outline-brown mx-3"
                        type="button"
                    >
                        <span>NEXT</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
