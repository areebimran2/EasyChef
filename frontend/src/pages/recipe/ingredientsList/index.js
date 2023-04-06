import { useContext } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"



const IngredientsList = () => {
  const {data} = useContext(RecipeAPIContext)
  console.log("data in ing list", data)
  return(
    <>
    <h2>Ingredients</h2>
    <ul class="lh-lg">
      {data.ingredients ? data.ingredients.map(ing => <li key={ing.id}>{ing.quantity + ' ' + ing.units + ' ' + ing.name}</li>) : <></>}
    </ul>
    </>
  )
}
export default IngredientsList