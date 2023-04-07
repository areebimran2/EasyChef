import {React, useContext, useState, useEffect} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate } from "react-router-dom";
import $ from 'jquery'

const RecipeForm = () => {
  let {data, setData} = useContext(RecipeAPIContext)
  const bid = localStorage.getItem('base_id')
  
  let useBase = false
  if (bid) {useBase=true}

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${bid}/`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setData(json)})
  },[useBase]
  )

  console.log("in recipe form: baseid, usebase", data,useBase, bid)
  const navigate = useNavigate()

  const createRecipeSubmit = (event) =>{
    console.log($('#recipe-pic')[0].files)
    event.preventDefault()
    const formData = {
      name: $('#recipe-name').val(),
      diet: $('#diet').val(),
      cuisine: $('#cuisine').val(),
      serving_size: parseInt($('#servings').val()) || 1,
      cooking_time: parseInt($('#cooking-time').val()) || 0,
      prep_time: parseInt($('#prep-time').val()) || 0,
      ingredients_list: $('#ingredients-list').val(),
      picture: $('#recipe-pic')[0].files[0]
    }
    console.log("data.picture: ",formData.picture)
    if (formData.picture){
      const reader = new FileReader();
      reader.readAsDataURL($('#recipe-pic')[0].files[0]);
      reader.onload = () => {
        const base64data = reader.result.split(',')[1];
        // const base64data = reader.result;
        formData.picture = base64data;
        console.log("pic url", formData.picture)
      };
    }   

    let hasError = false
    Object.entries(formData).forEach(([key, value]) => {
      if ((!value || value === '') && key !== 'picture'){
        console.log("missing",value, key)
        hasError = true
      }
    })

    if (hasError){
      $("#form-error").html("Please fill out all required fields!")
    }
    else{
      $("#form-error").html("")
      console.log("form data---", formData)
      const token = localStorage.getItem('token')

      if (!useBase){
        fetch('http://localhost:8000/recipes/add/',
        {
            method: 'POST', 
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok){
            if (response.status === 401){
              // navigate('/profile')
            }
            throw new Error(`HTTP error status: ${response.status}`)
          }
          console.log("successful submission")
          return response.json()})
        .then(dat =>{ 
          navigate(`/recipe/${dat.id}/add-direction`)
        })
        .catch(error => {
          console.error(error)
          $("#form-error").html(error)
        })
      }else{
        fetch(`http://localhost:8000/recipes/recipe/${bid}/use-base-recipe/`,
        {
            method: 'POST', 
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok){
            if (response.status === 401){
              // navigate('/profile')
            }
            throw new Error(`HTTP error status: ${response.status}`)
          }
          console.log("successful submission")
          localStorage.setItem('base_id', null)
          return response.json()})
        .then(dat =>{ 
          setData({id: dat.id}) // not working
          console.log("data id set",data.id)
          navigate(`/recipe/${dat.id}/add-direction`)
        })
        .catch(error => {
          console.error(error)
          $("#form-error").html(error)
        })
      }
      }
  }
  
  return(
    <>
    <form className="card bg-light-brown mt-3 p-5">
      <FormDiv
        id='recipe-name'
        label='Recipe name'
        type='text'
        name='name'
        defaultValue={useBase? data.name: ''}
      />
      <FormDiv
        id='recipe-pic'
        label='Add picture of dish'
        type='file'
        name='pictures'
      />
      <div className="d-flex mb-4">
            <label className="form-label me-2">Type of Diet:</label>
            <select className="form-select-sm" id='diet' name='diet' multiple required defaultValue={useBase ? data.diet : []}>
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
            <select className="form-select-sm" id='cuisine' name='cuisine' required defaultValue={useBase ? data.cuisine : ''}>
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
        defaultValue={useBase? data.prep_time : null}
      />
      <FormDiv
        id='cooking-time'
        label='Cooking time'
        type='number'
        name='cooking_time'
        defaultValue={useBase? data.cooking_time : null}
      />
      <FormDiv
        id='servings'
        label='Servings'
        type='number'
        name='serving_size'
        defaultValue={useBase? data.serving_size : null}
      />
      <label className="form-label">Ingredients:</label>
        <textarea rows="8" className="form-control w-50" id="ingredients-list" name='ingredients_list' required defaultValue={useBase? data.ingredients_list : ''}></textarea>
      
        <div className='d-flex justify-content-end mt-5'>
            <button className="btn btn-brown ps-5 pe-5" onClick={createRecipeSubmit}>Next</button>
            
        </div>
        <div className='d-flex flex-row-reverse mt-2'><p id="form-error"></p></div>        
    </form>  
    </>
  )
    
}


export default RecipeForm;
