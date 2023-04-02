import {React, useContext, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate } from "react-router-dom";

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
    navigate('/recipe/:id')
  }

  // cannot use RecipeAPI should create directionAPI
  const {data, onChange} = useContext(RecipeAPIContext)
  const id = data.id
  const addDrection = () => {
    fetch(`http://localhost:8000/recipes/recipe/${id}/add-directions/`,
      {
          method: 'POST', 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => showDirection(data.description, data.file))
      .then(elem => setElements([...elements, elem]))
  }
  
  const showDirection = (desc, pic) => {
    return(
      <>
      <li>{desc} <img src={pic} alt='direction pic'/></li>
      </>
    )
  }

  const addDirectionDiv = <>
    <label className="form-label mt-4">Directions:</label>
    <textarea rows="3" className="form-control mb-2 w-full" name='description' onChange={onChange}></textarea>
    <FormDiv
      id=''
      label='Add pictures'
      type='file'
      name='file'
      onChange={onChange}
    />
    <div>
    <button className='btn btn-brown' onClick={addDrection}> Add</button>
    </div>
  </>

  return(
    <>
      <form className="card bg-light-brown mt-3 p-5">
        {elements.map((element, index) => (
          <ul>
            {element}
          </ul>        
        ))}
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
