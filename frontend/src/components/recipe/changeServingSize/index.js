import { useContext } from "react"
import { useParams } from "react-router"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import $ from 'jquery'

const ChangeServingButton = () =>{
  const token = localStorage.getItem('token')
  const {id} = useParams()
  const {data, setData} = useContext(RecipeAPIContext)

  const handleClick = (e) => {
    e.preventDefault()
    let num = $('#serving-input').val()
    console.log("num", num)
    fetch(`http://localhost:8000/recipes/recipe/${id}/edit-serving-size/`, {
      method: 'PATCH', 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({'serving_size': num})
    }).then(response =>{
      console.log("response", response)
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.json()
    }).then(dat => setData(dat))
    .catch(err=> console.error(err))
  }

  return(
    <>
    <form className="bg-light-50">
        <input type="number" id="serving-input" className="ms-5 me-2 rounded p-1" style={{width: "100px"}} placeholder={data.serving_size}/>
        <button onClick={handleClick} className="btn btn-brown">Change</button>
      </form>
    </>
  )
}

export default ChangeServingButton