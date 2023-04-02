import {React, createContext, useContext, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { Link, useNavigate } from "react-router-dom";

const RecipeForm = () => {
  
  const {data, resetData, onChange, setValue} = useContext(RecipeAPIContext)
  const navigate = useNavigate()

  const createRecipeSubmit = (event) =>{
    let id
    event.preventDefault()
    console.log("form data---", data)
    
    
    fetch('http://localhost:8000/recipes/add/',
      {
          method: 'POST', 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => id = data.id)
      .then(setValue('id', id))
      .then(navigate('/recipe/add-direction')) // add id
      
  }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return(
    <>
    <form className="card bg-light-brown mt-3 p-5">
      <FormDiv
        id='recipe-name'
        label='Recipe name'
        type='text'
        name='name'
        onChange={onChange}
      />
      <FormDiv
        id='recipe-pic'
        label='Add picture of dish'
        type='file'
        name='pictures'
        onChange={onChange}
      />
      <div className="d-flex mb-4">
            <label className="form-label me-2">Type of Diet:</label>
            <select className="form-select-sm" id='diet' name='diet' onChange={onChange}>
                <option value="NONE">None</option>
                <option value="VEGAN">Vegan</option>
                <option value="VEG">Vegetarian</option>
                <option value="GLUTENF">Gluten-free</option>
                <option value="LCARB">Low carb</option>
                <option value="KT">Keto</option>
                <option value="LF">Low Fat</option>
            </select>
        </div>

        <div className="d-flex mb-4">
            <label className="me-2 form-label">Type of Cuisine: </label>
            <select className="form-select-sm" id='cuisine' name='cuisine' onChange={onChange}>
                <option value="NONE">None</option>
                <option value="CN">Chinese</option>
                <option value="CR">Creole</option>
                <option value="FR">French</option>
                <option value="IN">Indian</option>
                <option value="JP">Japanese</option>
                <option value="KO">Korean</option>
                <option value="ME">Middle-East</option>
                <option value="WE">Western</option>
            </select>
        </div>
      <FormDiv
        id='prep-time'
        label='Prep time'
        type='number'
        name='prep_time'
        onChange={onChange}
      />
      <FormDiv
        id='cooking-time'
        label='Cooking time'
        type='number'
        name='cooking_time'
        onChange={onChange}
      />
      <FormDiv
        id='servings'
        label='Servings'
        type='number'
        name='serving_size'
        onChange={onChange}
      />
      <label className="form-label">Ingredients:</label>
        <textarea rows="8" className="form-control w-50" id="ingredients-list" name='ingredients_list' onChange={onChange}></textarea>
      
        <div className='d-flex justify-content-end mt-5'>
            <Link to='/addRecipe/add-direction/'>
            <button className="btn btn-brown ps-5 pe-5" onClick={createRecipeSubmit}>Next</button>
            </Link>
            
        </div>
      

        
    </form>    
    </>
  )
    
}


export default RecipeForm;

// need some validation in case serving size is empty then setServingSize should be set to 0, need frontend required validation