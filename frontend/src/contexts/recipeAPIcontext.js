import { createContext, useState } from "react";

export const useRecipeAPIContext = () => {
    const [data, setData] = useState({
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
        picture: null,
        num_fav: null,
        num_likes: null,
        ave_ratings: null,
        base_recipe: null
        
    });

    return {
        data, setData
    }
}
  

const RecipeAPIContext = createContext(
    { data: {
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
        picture: null,
        num_fav: null,
        num_likes: null,
        ave_ratings: null,
        base_recipe: null
        
    },
    setData: () => {},
    

    
    }
)

export default RecipeAPIContext
