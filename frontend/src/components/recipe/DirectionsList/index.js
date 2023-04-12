import { useContext } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'


const DirectionsList = () => {
  const {data} = useContext(RecipeAPIContext)
  if (data.directions){
    data.directions.map(elem => {
      if (elem.file){
        elem['ext'] = elem.file && elem.file.split('.').pop();
      }
    })
  }
  
  return(
    <>
    <h2>Directions</h2>
    <ol>
      {data.directions ? data.directions.map(d => 
      <li key={d.id}>{d.description}
      <br/>
      {d.file && d.ext !== 'mp4'? <img src={d.file} alt="" className="dir-img"/> : ''}
      {d.file && d.ext === 'mp4'? <video controls className='dir-img'>
          <source src={d.file} type={`video/mp4`} />
        </video> : ''}
      
      </li>) : <></>}
    </ol>
    </>
  )
}
export default DirectionsList