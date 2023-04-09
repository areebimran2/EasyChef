import { useContext, useEffect } from 'react';
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeAPIContext from '../../contexts/recipeAPIcontext';
import { useNavigate, useParams } from 'react-router';
import IngredientsList from '../../components/recipe/ingredientsList';
import DirectionsList from '../../components/recipe/DirectionsList';
import UseBaseRecipeButton from '../../components/recipe/useBaseRecipeButton';
import FavouriteButton from '../../components/recipe/FavoriteButton';
import LikeButton from '../../components/recipe/LikeButton';
import Ratings from '../../components/recipe/Ratings';
import RateButton from '../../components/recipe/Ratings/RateButton';
import { Link } from 'react-router-dom';

function Recipe() {
  const nav = useNavigate()
  const {data, setData} = useContext(RecipeAPIContext)
  const {id} = useParams()
  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setData(json)})
  },[id]
  )
  let hasBaseRecipe = data.base_recipe? true: false
  console.log("has base recipe", hasBaseRecipe)
  const handleDisabledView = (event) => {
    if (!hasBaseRecipe) {
      event.preventDefault(); // prevent the link from being clicked
    }
    else{
      nav(`/recipe/${data.base_recipe}`)
    }
  }

  return (
    <>
    <div className="container-1000 ms-auto me-auto mt-8">
      <div className="d-flex justify-content-between" >
          <h1>{data.name}</h1>
          {/* component buttons */}
          <div>
            <UseBaseRecipeButton/>
          </div>
      </div>
      <Ratings/>
      {data.picture ? <img className="img-fluid rounded w-75 h-auto mt-2 mb-2" src={data.picture} alt="pancake"></img> : <></>}
      
      {/* component button */}
      <div className="d-flex justify-content-between mb-4">
          <div className='d-flex'>
              <LikeButton/>
              <FavouriteButton/>
              <RateButton/>
          </div>
          <div>
          <Link to={`/recipe/${data.base_recipe}`} className={hasBaseRecipe? '':'disabled-link'} onClick={handleDisabledView}>View Base Recipe</Link>
          </div>
      </div>

      <div className="card col-5 p-4 bg-light-brown mb-4">
        <ul className="list-unstyled mb-0 lh-lg">
            <li><span className="fw-bold">Diet:</span> {data.diet ? data.diet.map(x => x + ' ') : []}</li>
            <li><span className="fw-bold">Cuisine:</span> {data.cuisine}</li>
            <li><span className="fw-bold">Prep time:</span> {data.prep_time} minutes</li>
            <li><span className="fw-bold">Cooking time:</span> {data.cooking_time} minutes</li>
            <li><span className="fw-bold">Servings: </span>{data.serving_size} edit serving size</li> 
            {/* add component for editing serving size */}
        </ul>
      </div>
      <div className="col-8">
          <IngredientsList/>
          <DirectionsList/>
          
      </div>
      {/* comments */}

    </div>
    </>   
  );
}

export default Recipe;