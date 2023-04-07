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
        
    });
    let useBase = false
    let base_id = null

    const setBase_id = (id)=>{
        base_id = id
    }
    const setUseBase = () =>{
        useBase = !useBase
    }

    return {
        data, setData, useBase, base_id, setBase_id, setUseBase
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
        
    },
    setData: () => {},
    useBase: false,
    setUseBase: ()=>{},
    base_id: null,
    setBase_id: ()=>{},
    

    
    }
)

export default RecipeAPIContext
