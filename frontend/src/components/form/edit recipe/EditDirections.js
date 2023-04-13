import {React, useContext, useEffect, useState} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery'
import '../../../custom.css'
import axios from 'axios';
import DeleteDirectionButton from './deleteDirection';

const EditDirectionForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data, setData} = useContext(RecipeAPIContext)
  const [elements, setElements] = useState([]);
  let bid = localStorage.getItem('edit_id')

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${bid}/`)
    .then(response => response.json())
    .then(json => {
      setData(json)
    })
  },[bid])

  // add direction div
  const handleAddDirectionDiv =(e)=>{
    e.preventDefault()
    let div = directionDiv()
    setElements([...elements, div])
  }
 
  // handle use base recipe
  const handleCreate = (e) => {
    e.preventDefault()
    console.log("elem",elements)
    if (elements !== []){
      localStorage.setItem('edit_id', null)
      navigate(`/recipe/${id}`)
    }
    else{
      alert('Please add directions!')
    }
  }
  const addDirection =(e)=>{
    e.preventDefault()

    // elements to be disabled
    const disabledElem = [e.currentTarget.parentElement.previousSibling.children[1], e.currentTarget.parentElement.previousSibling.previousSibling, e.currentTarget]
    let desc = e.currentTarget.parentElement.previousSibling.previousSibling.value

    // some validation; description cannot be null
    if (desc === ''){
      $('#desc-error').html('Description cannot be blank!')
      return
    }
    else{
      $('#desc-error').html('')
    }

    // using form data
    const formData = new FormData();
    formData.append('description', e.currentTarget.parentElement.previousSibling.previousSibling.value)
    formData.append('file', e.currentTarget.parentElement.previousSibling.children[1].files[0] || '');
    let did =  e.currentTarget.id

    const token = localStorage.getItem('token')
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
        disabledElem.map(elem => {
          elem.disabled = true})
      }).catch(error => {
        console.error(error)
      })
  }

  // add direction API call
  const editDirection = (e) => {
    e.preventDefault()

    // elements to be disabled
    const disabledElem = [e.currentTarget.parentElement.previousSibling.children[1], e.currentTarget.parentElement.previousSibling.previousSibling, e.currentTarget]
    let desc = e.currentTarget.parentElement.previousSibling.previousSibling.value

    // some validation; description cannot be null
    if (desc === ''){
      $('#desc-error').html('Description cannot be blank!')
      return
    }
    else{
      $('#desc-error').html('')
    }

    // using form data
    const formData = new FormData();
    formData.append('description', e.currentTarget.parentElement.previousSibling.previousSibling.value)
    formData.append('file', e.currentTarget.parentElement.previousSibling.children[1].files[0] || '');
    let did =  e.currentTarget.id

    const token = localStorage.getItem('token')
    axios.patch(`http://localhost:8000/recipes/recipe/${id}/edit-directions/${did}/`, formData, {
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
        disabledElem.map(elem => {
          elem.disabled = true})
      }).catch(error => {
        console.error(error)
      })
  }

  const directionDiv = () => {
    return(
      <>
      <label className="form-label mt-4">Directions:</label>
        <textarea rows="3" className="form-control mb-2 w-full"></textarea>
        <FormDiv
          id='direction-file'
          label='Add pictures'
          type='file'
          name='file'
        />
        <div>
        <button className='btn btn-brown' onClick={addDirection}> Add</button>
        </div>
      </>
    )
  }


  return(
    <>
      <form className="card bg-light-brown mt-3 p-5">
        {data.directions? data.directions.map((d, index)=>(

          <div key={index} className='w-full d-grid'>
            <label className="form-label mt-4">Directions:</label>
            <textarea rows="4" className="form-control mb-2 w-full" defaultValue={d.description}></textarea>
            <FormDiv
              id='direction-file'
              label='Add pictures'
              type='file'
              name='file'
            />
            <div>
            <button id={d.id} className='btn btn-brown me-2' onClick={editDirection}> Add</button>
            <DeleteDirectionButton id={id} did={d.id}/>
          </div>
          </div>
        )) : ""}
        
        <label className="form-label mt-4">Directions:</label>
        <textarea id='description' rows="4" className="form-control mb-2 w-full" name='description'></textarea>
        <FormDiv
          id='direction-file'
          label='Add pictures'
          type='file'
          name='file'
        />
        <div>
        <button className='btn btn-brown' onClick={addDirection}> Add</button>
        </div>

        {elements.map((element, index) => (
                <div key={index} className='d-grid'>{element}</div>
            ))}

        <div>
        <button className='btn' onClick={handleAddDirectionDiv}>Add new direction</button>
        </div>
        
        <div id='desc-error'></div>
  
        <div className='d-flex justify-content-end'>
        {/* <button className='btn btn-outline-brown me-3'>Cancel</button> */}
        <button className='btn btn-brown' onClick={handleCreate}>Edit Recipe</button>
        </div>
      </form>
    </>
  )


}
export default EditDirectionForm
