import React from 'react'
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';



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


export default Search;