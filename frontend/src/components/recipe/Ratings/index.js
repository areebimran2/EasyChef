import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import RecipeAPIContext from "../../../contexts/recipeAPIcontext";

const Ratings = () =>{
  const [rating, setRating] = useState(0);
  const {id} = useParams()
  const {rated} = useContext(RecipeAPIContext)

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      setRating(json.ave_rating)})
  },[rated]
  )

  return (
    <>
    <div className="d-flex">
        <i className={rating>=1 ? "mt-auto mb-auto fa-solid fa-star": "mt-auto mb-auto fa-regular fa-star"}></i>
        <i className={rating>=2 ? "mt-auto mb-auto fa-solid fa-star": "mt-auto mb-auto fa-regular fa-star"}></i>
        <i className={rating>=3 ? "mt-auto mb-auto fa-solid fa-star": "mt-auto mb-auto fa-regular fa-star"}></i>
        <i className={rating>=4 ? "mt-auto mb-auto fa-solid fa-star": "mt-auto mb-auto fa-regular fa-star"}></i>
        <i className={rating>=5 ? "mt-auto mb-auto fa-solid fa-star": "mt-auto mb-auto fa-regular fa-star"}></i>
        <p className="mt-auto mb-auto me-1 ms-2">Ratings: {rating}</p>
    </div>
    </>
  )
}

export default Ratings