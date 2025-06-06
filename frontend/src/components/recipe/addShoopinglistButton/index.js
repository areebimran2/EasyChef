import { useContext, useEffect, useState } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'
import './style.css'
const AddShoplistButton = ({ inShoppingList }) => {
  const{id} = useParams()
  const [hasClicked, setHasClicked] = useState(inShoppingList);

  const token = localStorage.getItem('token')

  useEffect( () => {
    setHasClicked(inShoppingList)
  }, [inShoppingList])

  const handleShoppingList = ()=>{
    if (!hasClicked){
      console.log("add to shoppinglist: ", !hasClicked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/shopping-list/add/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        } else {
          return response.json()
        }})
        .then(dat => {
          setHasClicked(!hasClicked);
          console.log("success add", dat)
          $('#add-btn').addClass('clicked')
          $('#add-btn').removeClass('not-clicked')
        })
        .catch(error => {
          if (error.message === "401") {
            alert('You have been logged out.\n Please log in again')
          } else {
            console.error(`HTTP error status: ${error.message}`)
          }
        })
    }
    else{
      console.log("remove from list: ", !hasClicked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/shopping-list/remove/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        } else {
          return response.json()
        }})
        .then(dat =>{
          setHasClicked(!hasClicked);
          console.log("dat remove:", dat)
          $('#add-btn').addClass('not-clicked')
          $('#add-btn').removeClass('clicked')
        }
        ).catch(error => {
          if (error.message === "401") {
            alert('You have been logged out.\n Please log in again')
          } else {
            console.error(`HTTP error status: ${error.message}`)
          }
        })
      }
  }

  return (
    hasClicked ? (
    <>
    <button type="button" id="add-btn" className={'clicked btn me-2'} onClick={handleShoppingList}><i className="fa-solid fa-cart-shopping"></i> Remove</button>
    </>) : (
    <>
    <button type="button" id="add-btn" className={'not-clicked btn me-2'} onClick={handleShoppingList}><i className="fa-solid fa-cart-shopping"></i> Add</button>
    </>)
  )
}

export default AddShoplistButton