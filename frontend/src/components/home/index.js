import React, {useEffect, useState} from 'react';
import '../../custom.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//class Home extends React.Component{
//    render(){
//    }
//}

const HomeComp = (props) => {
    var [recipes, setRecipes] = useState()

    useEffect(() => {
        fetch('http://localhost:8000/recipes/all/',
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])

    console.log(recipes)

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
                    {recipes.results.map((recipe, i) => (
                        <div className="card card-custom infocard bg-white text-black" key={i}>
                            <a href="recipe2.html">
                            <img className="card-img" src={recipe.picture} alt={recipe.name}/>
                            <div className="card-body">
                              <div className="card-title">{recipe.name}</div>
                            </div></a>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default HomeComp;