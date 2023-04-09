import React, {useContext, useState, useEffect} from 'react'
import '../../../custom.css'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery'
import { Link } from "react-router-dom";
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';

const SearchPage = () => {
    var [recipes, setRecipes] = useState();
    var [searchResult, setSearchResult] = useState("");
    var [cuisineSearch, setCuisineSearch] = useState("");
    var [dietSearch, setDietSearch] = useState("");
    var [timeGTE, setTimeGTE] = useState("0");
    var [timeLTE, setTimeLTE] = useState("10000000");

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
        fetch('http://localhost:8000/recipes/search?' + new URLSearchParams({
            search: searchResult,
            cuisine: cuisineSearch,
            diet__contains: dietSearch,
            cooking_time__gte: timeGTE,
            cooking_time__lte: timeLTE,
        }),
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [searchResult, cuisineSearch, dietSearch, timeGTE, timeLTE])
    
    
    const onChange = (event) => {
        setSearchResult(event.target.value);
    }

    const onSearch = (e) => {

        /*
        if (recipes !== undefined){
            const results = recipes.results.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            || recipe.creator.toLowerCase().includes(searchTerm.toLowerCase()))
            
            //console.log(results);
            setSearchRecipes(results);
        }
        */
        
        e.preventDefault();
        setSearchResult($("#searchBar").val());
        setDietSearch($("#diet").val());
        setCuisineSearch($("#cuisine").val());
        setTimeGTE($("#cookingtime").val().split(",")[0]);
        setTimeLTE($("#cookingtime").val().split(",")[1]);
        
    }

    /*
    useEffect(() => {
        //console.log(timeGTE);
        //console.log(timeLTE)
    }, [timeGTE, timeLTE])
    */
    

    //console.log(searchResult);

    if (recipes === undefined){
        return (
            <>
                <div className="sidebar card justify-content-center shadow-sm">
                    <form className="form-horizontal">
                        <div className="mt-5 ms-4">
                            <h2><b>Diet Options</b></h2>
                            <select className="form-select-sm" id="diet" onChange={(e) => setDietSearch(e.target.value)}>
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
                            <h2><b>Cuisine Options</b></h2>
                            <select className="form-select-sm" id="cuisine" onChange={(e) => setCuisineSearch(e.target.value)}>
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
                            <h2><b>Cooking Time</b></h2>
                            <select className="form-select-sm" id="cookingtime">
                                <option value="0,10000000">Select a Cooking Time</option>
                                <option value="0,14">Less than 15 minutes</option>
                                <option value="15,30">15-30 minutes</option>
                                <option value="31,60">31-60 minutes</option>
                                <option value="61,10000000">Over 60 minutes</option>
                            </select>
                        </div>
    
                            <div className="mt-3 ms-4">
                                <h2><b>Search Recipe</b></h2>
                                <input type="text" className="form-control" name="searchBar" id="searchBar" placeholder="Search..." onChange={onChange}/>
                            </div>
    
                            <div className="text-center mt-5">
                                <button className="btn btn-blue" onClick={(e) => onSearch(e)}>Search</button>
                            </div>
    
    
                    </form>
                </div>
    
                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    No Recipes have been created!
                        
                </div>
            </>
        )
    }

    return (
        <>
                <div className="sidebar card justify-content-center shadow-sm">
                    <form className="form-horizontal">
                        <div className="mt-5 ms-4">
                            <h2><b>Diet Options</b></h2>
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
                            <h2><b>Cuisine Options</b></h2>
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
                            <h2><b>Cooking Time</b></h2>
                            <select className="form-select-sm" id="cookingtime">
                                <option value="0,10000000">Select a Cooking Time</option>
                                <option value="0,14">Less than 15 minutes</option>
                                <option value="15,30">15-30 minutes</option>
                                <option value="31,60">31-60 minutes</option>
                                <option value="61,10000000">Over 60 minutes</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Search Recipe</b></h2>
                            <input type="text" className="form-control" id="searchBar" defaultValue={searchResult} placeholder="Search..."/>
                        </div>

                        <div className="text-center mt-5">
                            <button className="btn btn-blue" onClick={(e) => onSearch(e)}>Search</button>
                        </div>


                    </form>
                </div>

                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    {
                        recipes.results
                        .map((recipe, i) => {
                            return (
                                <div className="card card-custom infocard bg-white text-black" key={i}>
                                    <Link to={{
                                        pathname: `/recipes/recipe/${recipe.id}`
                                    }}>
                                    <img className="card-img" src={recipe.picture} alt={recipe.name}/>
                                    <div className="card-body">
                                        <div className="card-title">{recipe.name}</div>
                                        <div className="card-creator">Created By: {recipe.creator}</div>
                                    </div></Link>
                                </div>
                            )
                        })
                    }
                </div>
        </>
    )
}

export default SearchPage;