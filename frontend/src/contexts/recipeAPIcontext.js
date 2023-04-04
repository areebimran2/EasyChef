import { createContext, useState } from "react";

export const useRecipeAPIContext = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [cooking_time, setCookingTime] = useState(0);
    const [prep_time, setPrepTime] = useState(0);
    const [ingredients_list, setIngredientsList] = useState('');
    const [pictures, setPictures] = useState('');
    const [directions, setDirections] = useState('');
    const [num_fav, setNumFav] = useState(0);
    const [num_likes, setNumLikes] = useState(0);
    const [ave_ratings, setAveRatings] = useState(0);

    return {
        id, name, diet, cuisine, cooking_time, prep_time, ingredients_list, pictures, directions, num_fav, num_likes, ave_ratings, setName, setDiet, setCookingTime, setCuisine, setPictures, setPrepTime, setId,
        setIngredientsList, setDirections, setNumFav, setNumLikes, setAveRatings
    }
}
  

const RecipeAPIContext = createContext(
    {
        id: null,
        name: null,
        diet: null,
        cuisine: null,
        serving_size: null,
        cooking_time: null,
        prep_time: null,
        ingredients: null,
        ingredients_list: null,
        directions: null,
        pictures: null,
        num_fav: null,
        num_likes: null,
        ave_ratings: null,
        setId: () => {},
        setName: () => {},
        setDiet: () => {},
        setCuisine: () => {},
        setServingSize: () => {},
        setCookingTime: () => {},
        setPrepTime: () => {},
        setIngredientsList: () => {},
        setPictures: () => {},
        setDirections: () => {},
        setNumFav: () => {},
        setNumLikes: () => {},
        setAveRatings: () => {},

    
    }
)

export default RecipeAPIContext
