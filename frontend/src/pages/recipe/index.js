import { useContext, useEffect, useState } from 'react';
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
import EditRecipeButton from '../../components/recipe/editRecipeButton';
import CommentForm from '../../components/form/comments';
import AddShoplistButton from '../../components/recipe/addShoopinglistButton';
import ChangeServingButton from '../../components/recipe/changeServingSize';

function Recipe() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const {data, setData} = useContext(RecipeAPIContext)
  const {id} = useParams()

  const [inFavourite, setInFavourite] = useState(false)
  const [inLiked, setInLiked] = useState(false)
  const [inShoppingList, setInShoppingList] = useState(false)

  const [isOwner, setIsOwner] = useState(false)

  useEffect( () => {
    fetch(`http://localhost:8000/recipes/recipe/${id}/`, {
      method: 'GET',
      headers: token === null ? {} : {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(json => {
      console.log("ok")
      setData(json)})
  },[id]
  )

  useEffect( () => {
    fetch(`http://localhost:8000/recipes/recipe/${id}/interaction-status/`, {
      method: 'GET',
      headers: token === null ? {} : {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(json => {
      setInLiked(json.liked)
      setInFavourite(json.in_favourites)
      setInShoppingList(json.in_shopping_list)
    })
  }, [])

  useEffect( () => {
    fetch(`http://localhost:8000/recipes/recipe/${id}/verify/`, {
      method: 'GET',
      headers: token === null ? {} : {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(json => {
      setIsOwner(json.is_owner)
    })
  }, [])

  let hasBaseRecipe = data.base_recipe? true: false
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
            <AddShoplistButton inShoppingList={inShoppingList}/>
            {isOwner ? (
              <EditRecipeButton/>
            ) : <></>}
            <UseBaseRecipeButton/>
          </div>
      </div>
      <Ratings/>
      {data.picture ? <img className="img-fluid rounded w-75 h-auto mt-2 mb-2" src={data.picture} alt="pancake"></img> : <></>}
      
      {/* component button */}
      <div className="d-flex justify-content-between mb-4">
          <div className='d-flex'>
              <LikeButton isLiked={inLiked}/>
              <FavouriteButton isFavourite={inFavourite}/>
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
            <li><div className='d-flex flex-row h-[3.23rem]'><span className="fw-bold">Servings: </span><ChangeServingButton/></div></li> 
        </ul>
      </div>
      <div className="col-8">
          <IngredientsList/>
          <DirectionsList/>
          
      </div>
        <CommentForm/>

    </div>
    </>   
  );
}

export default Recipe;