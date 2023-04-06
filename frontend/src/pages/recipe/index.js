import { useContext, useEffect } from 'react';
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeAPIContext from '../../contexts/recipeAPIcontext';
import { useParams } from 'react-router';
import IngredientsList from './ingredientsList';
import DirectionsList from './DirectionsList';

function Recipe() {
  const {data, setData} = useContext(RecipeAPIContext)
  const {id} = useParams()

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setData(json)})
  },[]
  )


  return (
    <>
    <div className="container-1000 ms-auto me-auto">
      <div className="d-flex justify-content-between" >
          <h1 className="mt-8">{data.name}</h1>
          {/* component buttons */}
      </div>
      {data.picture ? <img className="img-fluid rounded w-75 h-auto mt-2 mb-2" src={data.picture} alt="pancake"></img> : <></>}

      {/* component button */}

      <div className="card col-5 p-4 bg-light-brown mb-4">
        <ul className="list-unstyled mb-0 lh-lg">
            <li><span className="fw-bold">Diet:</span> {data.diet}</li>
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