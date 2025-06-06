import { useContext, useEffect, useState } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'
const LikeButton = ({ isLiked }) => {
  const{id} = useParams()
  const [hasLiked, setHasLiked] = useState(isLiked);
  const [likes, setLikes] = useState(0);

  const token = localStorage.getItem('token')

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      setLikes(json.num_likes)})
  },[hasLiked, id]
  )

  // need userContext to see if user has liked?
  useEffect( () => {
    setHasLiked(isLiked)
  }, [isLiked])

  const handleLike = ()=>{
    if (!hasLiked){
      console.log("add like: ", !hasLiked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/add-like/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 201 || response.status === 200){
          console.log("successful request")
          return response.json()
        }
        else if (!response.ok){
          throw new Error(response.status)
        }
        return response.json()})
        .then(dat => {
          setHasLiked(!hasLiked);
          setLikes(dat.num_likes)
          $('#like-btn').addClass('clicked')
          $('#like-btn').removeClass('not-clicked')
        })
        .catch(error => {
          if (error.message === "401") {
            alert('You have been logged out.\n Please log in again')
          } else {
            console.error(`HTTP error status: ${error.message}`)
          }
        })
    }
    else{
      console.log("remove like: ", !hasLiked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/remove-like/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        } else {
          return response.json()
        }})
        .then(dat =>{
          setHasLiked(!hasLiked);
          console.log("dat remove:", dat)
          setLikes(dat.num_likes)
          $('#like-btn').addClass('not-clicked')
          $('#like-btn').removeClass('clicked')
        }
        ).catch(error => {
          if (error.message === "401") {
            alert('You have been logged out.\n Please log in again')
          } else {
            console.error(`HTTP error status: ${error.message}`)
          }
        })
      }
  }

  return (
    hasLiked ? (
    <>
    <button type="button" id="like-btn" className={'clicked btn'} onClick={handleLike}>Unlike<i className="fa-regular fa-thumbs-up ms-1 me-1"></i>{likes}</button>
    </>) : (
    <>
    <button type="button" id="like-btn" className={'not-clicked btn'} onClick={handleLike}>Like<i className="fa-regular fa-thumbs-up ms-1 me-1"></i>{likes}</button>
    </>)
  )
}

export default LikeButton