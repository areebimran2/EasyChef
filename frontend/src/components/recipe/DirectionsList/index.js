import { useContext } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"



const DirectionsList = () => {
  const {data} = useContext(RecipeAPIContext)
  return(
    <>
    <h2>Directions</h2>
    <ol>
      {data.directions ? data.directions.map(d => <li key={d.id}>{d.description}</li>) : <></>}
      {/* should add img after each direction */}
    </ol>
    </>
  )
}
export default DirectionsList