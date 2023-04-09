import { useContext } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'


const DirectionsList = () => {
  const {data} = useContext(RecipeAPIContext)
  return(
    <>
    <h2>Directions</h2>
    <ol>
      {data.directions ? data.directions.map(d => 
      <li key={d.id}>{d.description}
      <br/>
      <img src={d.file} alt="" className="dir-img"/>
      </li>) : <></>}
    </ol>
    </>
  )
}
export default DirectionsList