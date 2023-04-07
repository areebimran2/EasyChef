import { useContext } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"



const IngredientsList = () => {
  const {data} = useContext(RecipeAPIContext)
  return(
    <>
    <h2>Ingredients</h2>
    <ul className="lh-lg">
      {data.ingredients ? data.ingredients.map((ing, index) => <li key={index}>{ing.quantity + ' ' + ing.units + ' ' + ing.name}</li>) : <></>}
    </ul>
    </>
  )
}
export default IngredientsList