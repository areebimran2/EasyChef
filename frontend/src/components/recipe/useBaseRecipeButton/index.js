import { useContext, useEffect } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import { useNavigate, useParams } from "react-router"

const UseBaseRecipeButton = () =>{
  const {id} = useParams()
  localStorage.setItem('base_id', id)
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/recipes/use-base-recipe`)
  }

  return(
    <>
    <button type="button" className="btn btn-outline-brown" onClick={handleClick}>Use as base recipe</button>
    </>
  )
}

export default UseBaseRecipeButton