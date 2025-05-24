import { useEffect, useState } from "react"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'

const FavouriteButton = ({ isFavourite }) => {
  const{id} = useParams()
  const [hasFav, setHasFav] = useState(isFavourite)
  const [fav, setFav] = useState(0);

  const token = localStorage.getItem('token')

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      setFav(json.num_fav)})
  },[hasFav, id]
  )

  useEffect( () => {
    setHasFav(isFavourite)
  }, [isFavourite])

  const handleFav = ()=>{
    if (!hasFav){
      console.log("fav add")
      fetch(`http://localhost:8000/recipes/recipe/${id}/add-favourite/`,{
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
          setHasFav(!hasFav)
          console.log("fav add", dat)
          setFav(dat.num_fav)
          // if (dat.num_fav){
          //   hasFav = true
          //   setFav(dat.num_fav)
          //   console.log("add fav",fav)
          // }
          $('#fav-btn').addClass('clicked')
          $('#fav-btn').removeClass('not-clicked')
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
      console.log("fav remove")
      fetch(`http://localhost:8000/recipes/recipe/${id}/remove-favourite/`,{
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
        .then(dat => {
          setHasFav(!hasFav)
          console.log("fav remove", dat)
          setFav(dat.num_fav)
          // if (dat.num_fav){
          //   hasFav = false
          //   setFav(dat.num_fav)
          //   console.log("remove fav",fav)
          // }
          $('#fav-btn').addClass('not-clicked')
          $('#fav-btn').removeClass('clicked')
        }).catch(error => {
          if (error.message === "401") {
            alert('You have been logged out.\n Please log in again')
          } else {
            console.error(`HTTP error status: ${error.message}`)
          }
        })
      }
  }

  console.log(isFavourite)

  return (
    hasFav ? (
    <>
    <button type="button" id="fav-btn" className={'clicked btn ms-2'} onClick={handleFav}>Unfavourite<i className="fa-regular fa-heart ms-1 me-1"></i>{fav}</button>
    </>) : (
    <>
    <button type="button" id="fav-btn" className={'not-clicked btn ms-2'} onClick={handleFav}>Favourite<i className="fa-regular fa-heart ms-1 me-1"></i>{fav}</button>
    </>)
  )
}

export default FavouriteButton