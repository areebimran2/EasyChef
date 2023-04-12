import { useParams } from "react-router"
import {React, useContext} from 'react'
import $ from 'jquery'
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"

const RateButton = () => {
  const token = localStorage.getItem('token')
  const {id} = useParams()
  const {rated, setRated} = useContext(RecipeAPIContext)

  const handleClick = (e) =>{
    e.preventDefault()
    let num = $('#rate-input').val()
    if (num < 1 || num > 5){
      return
    }
    fetch(`http://localhost:8000/recipes/recipe/${id}/rate/`,{
      method: 'PATCH', 
      headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({'ave_rating': num})

    }).then(response => {
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
      }
      setRated(!rated)
      console.log("rating success!", response.status)
      return response.json()})
    .catch(err => console.error(err))
  }

  return (
    <>
      <form className="bg-light-50">
        <input type="number" id="rate-input" className="ms-5 me-2 rounded p-1" style={{width: "100px"}} placeholder-shown="rate from 1-5"/>
        <button onClick={handleClick} className="btn btn-brown">Rate</button>
      </form>
    </>
  )
}

export default RateButton