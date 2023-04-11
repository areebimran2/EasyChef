import { useContext, useEffect, useState } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'
const LikeButton = () => {
  const{id} = useParams()
  const [hasLiked, setHasLiked] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      setLikes(json.num_likes)})
  },[hasLiked, id]
  )
  // need userContext to see if user has liked?

  const token = localStorage.getItem('token')
  const handleLike = ()=>{
    setHasLiked(!hasLiked);
    if (hasLiked){
      console.log("add like: ", hasLiked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/add-like/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 401){
          alert('You have been logged out.\n Please log in again')
        }else{
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()})
        .then(dat => {
          setLikes(dat.num_likes)
          $('#like-btn').addClass('clicked')
          $('#like-btn').removeClass('not-clicked')
        })
        .catch(error => console.error(error))
        
    }
    else{
      console.log("remove like: ", hasLiked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/remove-like/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok){
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()})
        .then(dat =>{
          console.log("dat remove:", dat)
          setLikes(dat.num_likes)
          $('#like-btn').addClass('not-clicked')
          $('#like-btn').removeClass('clicked')
        }
        ).catch(err => console.error(err))
        
      }
    
  }
  return(
    <>
    <button type="button" id="like-btn" className={'not-clicked btn'} onClick={handleLike}>Like<i className="fa-regular fa-thumbs-up ms-1 me-1"></i>{likes}</button>
    </>
  )
}

export default LikeButton