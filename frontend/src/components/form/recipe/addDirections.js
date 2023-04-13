import {React, useContext, useEffect, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate, useParams } from "react-router-dom";
import $, { error } from 'jquery'
import axios from 'axios';

const AddDirectionForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [elements, setElements] = useState([]);
  
  // handle use base recipe
  const handleCreate = (e) => {
    e.preventDefault()
    if (elements !== []){
      navigate(`/recipe/${id}`)
    }
    else{
      alert('Please add directions!')
    }
  }

  // add direction post request
  const addDrection = (e) => {
    e.preventDefault()
    const formData = new FormData();
    let desc = $('#description').val()
    // some validation; description cannot be null
    if (desc === ''){
      $('#desc-error').html('Description cannot be blank!')
      return
    }
    else{
      $('#desc-error').html('')
    }
    formData.append('description', desc)
    formData.append('file', $('#direction-file')[0].files[0] || '');
    
    const token = localStorage.getItem('token')

    // POST request
    axios.post(`http://localhost:8000/recipes/recipe/${id}/add-directions/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log("response status=== ", response.status)
        if (response.status !== 201 && response.status !== 200){
          alert(`An error occurred: ${response.status}`)
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.data;
      })
      .then(dat => {
        console.log("response json:==== ", dat)
      
        let elem = showDirection(dat.description, dat.file)
        setElements([...elements, elem])
        $('#description').val('')
        $('#direction-file').val('')
      })
      .catch(error => {
        console.error(error)
        $("#desc-error").html(error)
      })  
  }

  // display direction after successful post request
  const showDirection = (desc, pic) => {
    return(
      <>
      {desc} <br/>{pic !== null && <img src={pic} alt='direction pic' className='direction-img'/>}
      </>
    )
  }


  return(
    <>
      <form className="card bg-light-brown mt-3 p-5">
        {<ul>
            {elements.map((element, index) => (
                <li key={index}>{element}</li>
            ))}
        </ul>}
        
        <label className="form-label mt-4">Directions:</label>
        <textarea id='description' rows="3" className="form-control mb-2 w-full" name='description'></textarea>
        <FormDiv
          id='direction-file'
          label='Add pictures'
          type='file'
          name='file'
        />
        <div>
        <button className='btn btn-brown' onClick={addDrection}> Add</button>
        </div>
        <div id='desc-error'></div>
  
        <div className='d-flex justify-content-end'>
        {/* <button className='btn btn-outline-brown me-3'>Cancel</button> */}
        <button className='btn btn-brown' onClick={handleCreate}>Create Recipe</button>
        </div>
      </form>
    </>
  )
}
export default AddDirectionForm
