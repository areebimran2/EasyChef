import React, {useState, useEffect} from 'react'
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';


const Search = () => {
    var [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/recipes/search/',
        {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])

    console.log(recipes)


    return (
        <>
        

        </>
    )
}


/*
class Search extends React.Component{

    
    render(){
        return (
            <form 
            className="d-flex ms-3 me-3" 
            action="https://ibs.utm.utoronto.ca/csc309/a1/submit" 
            method="get" 
            target="_self">
                <input className="form-control me-2" type="text" placeholder="Search"/>
                <button className="btn btn-brown" type="button">Search</button>
            </form>
        )
    }
    
}
*/

export default Search;