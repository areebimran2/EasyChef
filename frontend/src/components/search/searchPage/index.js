import React, {useState, useEffect} from 'react'
import '../../../custom.css'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

const SearchPage = () => {
    var [recipes, setRecipes] = useState();
    var [searchResult, setSearchResult] = useState("");
    var [searchRecipes, setSearchRecipes] = useState([]);

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
        fetch('http://localhost:8000/recipes/search/',
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])
    
    
    const onChange = (event) => {
        setSearchResult(event.target.value);
    }

    //console.log(recipes);

    const onSearch = (e, searchTerm) => {
        
        if (recipes !== undefined){
            const results = recipes.results.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            || recipe.creator.toLowerCase().includes(searchTerm.toLowerCase()))
            
            console.log(results);
            setSearchRecipes(results);
        }
        
       e.preventDefault();
       //console.log('search ', searchTerm);
        
    }

    useEffect(() => {
        console.log(searchRecipes)
    }, [searchRecipes])
    

    //console.log(searchResult);

    if (recipes === undefined){
        return (
            <>
                <div className="sidebar card justify-content-center shadow-sm">
                    <form className="form-horizontal">
                        <div className="mt-5 ms-4">
                            <h2><b>Diet Options</b></h2>
                            <input className="form-control" type="text" list="dietOptions" id="diet" placeholder="Find a diet"/>
                            <datalist id="dietOptions">
                                <option>Vegan</option>
                                <option>Vegetarian</option>
                                <option>Gluten-Free</option>
                                <option>Low-Carb</option>
                                <option>Keto</option>
                                <option>Low-Fat</option>
                                <option>Reduced Sugar</option>
                                <option>Lactose-Free</option>
                            </datalist>
                        </div>
    
                        <div className="mt-3 ms-4">
                            <h2><b>Cuisine Options</b></h2>
                            <input className="form-control" type="text" list="cuisineOptions" id="cuisine"
                                placeholder="Pick a cuisine"/>
                            <datalist id="cuisineOptions">
                                <option>Chinese</option>
                                <option>Creole</option>
                                <option>Filipino</option>
                                <option>French</option>
                                <option>Indian</option>
                                <option>Japanese</option>
                                <option>Korean</option>
                                <option>Thai</option>
                                <option>Viet</option>
                                <option>Western</option>
                            </datalist>
                        </div>
    
                        <div className="mt-3 ms-4">
                            <h2><b>Cooking Time</b></h2>
                            <select className="form-select-sm" defaultValue="default">
                                <option value="default">Select a cooking time</option>
                                <option value="less than 15">Less than 15 minutes</option>
                                <option value="15-30">15-30 minutes</option>
                                <option value="30-60">30-60 minutes</option>
                                <option value="over 60">Over 60 minutes</option>
                            </select>
                        </div>
    
                            <div className="mt-3 ms-4">
                                <h2><b>Search Recipe</b></h2>
                                <input type="text" className="form-control" name="searchBar" id="searchBar" placeholder="Search..."/>
                            </div>
    
                            <div className="text-center mt-5">
                                <button className="btn btn-blue">Search</button>
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
                            <input className="form-control" type="text" list="dietOptions" id="diet" placeholder="Find a diet"/>
                            <datalist id="dietOptions">
                                <option>Vegan</option>
                                <option>Vegetarian</option>
                                <option>Gluten-Free</option>
                                <option>Low-Carb</option>
                                <option>Keto</option>
                                <option>Low-Fat</option>
                                <option>Reduced Sugar</option>
                                <option>Lactose-Free</option>
                            </datalist>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Cuisine Options</b></h2>
                            <input className="form-control" type="text" list="cuisineOptions" id="cuisine"
                                placeholder="Pick a cuisine"/>
                            <datalist id="cuisineOptions">
                                <option>Chinese</option>
                                <option>Creole</option>
                                <option>Filipino</option>
                                <option>French</option>
                                <option>Indian</option>
                                <option>Japanese</option>
                                <option>Korean</option>
                                <option>Thai</option>
                                <option>Viet</option>
                                <option>Western</option>
                            </datalist>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Cooking Time</b></h2>
                            <select className="form-select-sm" defaultValue="default">
                                <option value="default">Select a cooking time</option>
                                <option value="less than 15">Less than 15 minutes</option>
                                <option value="15-30">15-30 minutes</option>
                                <option value="30-60">30-60 minutes</option>
                                <option value="over 60">Over 60 minutes</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Search Recipe</b></h2>
                            <input type="text" className="form-control" id="searchBar" defaultValue={searchResult} placeholder="Search..." onChange={onChange}/>
                        </div>

                        <div className="text-center mt-5">
                            <button className="btn btn-blue" onClick={(e) => onSearch(e, searchResult)}>Search</button>
                        </div>


                    </form>
                </div>

                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    {
                        searchRecipes
                        .map((recipe, i) => {
                            return (
                                <div className="card card-custom infocard bg-white text-black" key={i}>
                                    <Link to={{
                                        pathname: `/recipes/recipe/${recipe.id}`
                                    }}>
                                    <img className="card-img" src={recipe.picture} alt={recipe.name}/>
                                    <div className="card-body">
                                        <div className="card-title">{recipe.name}</div>
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