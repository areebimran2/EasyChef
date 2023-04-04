import {React, useContext, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
const AddDirectionForm = () => {
  const navigate = useNavigate()
  const [elements, setElements] = useState([]);

  const handleClick= (event) =>{
    event.preventDefault()
    setElements([...elements, addDirectionDiv]);
  }

  const handleCreate = () => {
    // validation if blank?
    // id ?
    // navigate('/recipe/:id')
  }
  const {id, setId} = useContext(RecipeAPIContext)
  setId(1)
  const data = {
    description: $('#description').val(),
    file: $('#direction-pic').val()
  }
  const addDrection = (e) => {
    e.preventDefault()
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
        console.log("status", response.status)
        return response.json()
      })
      .then(data => {
        console.log("data:", data)
        return showDirection(data.description, data.file)})
      .then(elem => setElements([...elements, elem]))
  }
  
  const showDirection = (desc, pic) => {
    console.log("desc + pic", desc, pic)
    return(
      <>
      {desc} {pic !== '' && <img src={pic} alt='direction pic' />}
      </>
    )
  }

  const addDirectionDiv = <>
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
  </>

  return(
    <>
      <form className="card bg-light-brown mt-3 p-5">
        {
          <ul>
            {elements.map((element, index) => (
                <li key={index}>{element}</li>
            ))}
          </ul>
        }
        
        {addDirectionDiv}
        <div>
        <button className='btn' onClick={handleClick}><i className="fa-solid fa-plus"></i> add more direction</button>
        </div>

        <div className='d-flex justify-content-end'>
        {/* <button className='btn btn-outline-brown me-3'>Cancel</button> */}
        <button className='btn btn-brown' onClick={handleCreate}>Create Recipe</button>
        </div>
      </form>
    </>
  )


}
export default AddDirectionForm
