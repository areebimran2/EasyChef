
import { useNavigate, useParams } from "react-router"
import axios from "axios"

const DeleteDirectionButton = (props) => {
  const {id, did} = props
  const token = localStorage.getItem('token')

  const handleClick = (e) =>{
    console.log("parent elemetn",e.currentTarget.parentElement.parentElement)
    let elem = e.currentTarget.parentElement.parentElement
    

    axios.patch(`http://localhost:8000/recipes/recipe/${id}/delete-directions/${did}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log("response status=== ", response.status)
        if (response.status !== 201 && response.status !== 200){
          alert(`An error occurred: ${response.status}`)
          throw new Error(`HTTP error status: ${response.status}`)

        }
        return response.data;
      })
      .then(dat => {
        console.log("response", dat)
        setTimeout(()=>
        elem.remove(), 200)
      })
      .catch(error => {
        console.error(error)
        alert(error)
      })
  }

  return(
    <>
    <button type="button" className="btn btn-outline-brown" onClick={handleClick}>Delete</button>
    </>
  )
}

export default DeleteDirectionButton