
import { useNavigate, useParams } from "react-router"

const EditRecipeButton = () => {
  const {id} = useParams()
  localStorage.setItem('edit_id', id)
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/recipe/${id}/edit`)
  }

  return(
    <>
    <button type="button" className="btn btn-outline-brown me-2" onClick={handleClick}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
    </>
  )
}

export default EditRecipeButton