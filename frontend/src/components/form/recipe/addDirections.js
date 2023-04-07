import {React, useContext, useEffect, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate, useParams } from "react-router-dom";
import $, { error } from 'jquery'
const AddDirectionForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data, useBase} = useContext(RecipeAPIContext)
  const [elements, setElements] = useState([]);
  
  // handle use base recipe

  const handleCreate = (e) => {
    e.preventDefault()
    console.log("elem",elements)
    if (elements !== []){
      navigate(`/recipe/${id}`)
    }
    else{
      alert('Please add directions!')
    }
  }

  const addDrection = (e) => {
    e.preventDefault()
    const data = {
      description: $('#description').val(),
      file: $('#direction-file')[0].files[0] || null
    }
    if (!data.description){
      $('#desc-error').html('Description cannot be blank!')
      return
    }
    else{
      $('#desc-error').html('')
    }
    if (data.file){
      const reader = new FileReader();
      reader.readAsDataURL( $('#direction-file')[0].files[0]);
      reader.onload = () => {
        const base64data = reader.result.split(',')[1];
        data.file = base64data;
      };
    }   
    console.log("data img",data.file)
    
    const token = localStorage.getItem('token')
    fetch(`http://localhost:8000/recipes/recipe/${id}/add-directions/`,
      {
          method: 'POST', 
          headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok){
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log("data:", data)
        let elem = showDirection(data.description, data.file)
        setElements([...elements, elem])
        $('#description').val('')
      })  
      .catch(error => {
        console.error(error)
        alert('An error occurred')
      })
  }
  const showDirection = (desc, pic) => {
    console.log("desc + pic", desc, pic)
    return(
      <>
      {desc} {pic !== null && <img src={pic} alt='direction pic' className='direction-img'/>}
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
