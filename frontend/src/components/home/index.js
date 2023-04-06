import React, {useEffect, useState} from 'react';
import '../../custom.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//class Home extends React.Component{
//    render(){
//    }
//}

const HomeComp = () => {
    var [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/recipes/all/',
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])

    console.log(recipes)

    return(
        <>
            <div className="container-1000 mt-5 ms-auto me-auto">
                <h1><a href="extendRecipeHistory.html" className="header-link mb-2">Popular Recipes</a></h1>
                <div className="d-flex flex-row flex-wrap gap-3">
                    
                </div>
            </div>
        </>
        
    )
}

export default HomeComp;