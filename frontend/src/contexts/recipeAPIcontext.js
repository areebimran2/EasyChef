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
        pictures: null,
    });
    
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const setValue = (name, val) => {
        setData({ ...data, [name]: val });
    };

    const resetData = () => {
        setData({ 
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
            pictures: null
        });
    };

    return {
        data, setData, onChange, resetData, setValue
    }
}
  

const RecipeAPIContext = createContext(
    {data: null,
    setValue: null}
)

export default RecipeAPIContext

/*
    const [name, setName] = useState('');
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [cooking_time, setCookingTime] = useState(0);
    const [prep_time, setPrepTime] = useState(0);
    const [ingredients_list, setIngredientsList] = useState('');
    const [pictures, setPictures] = useState('');
    const [directions, setDirections] = useState('');

    return {
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
    }

const RecipeAPIContext = createContext(
    {recipe: {
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

        setName: () => {},
        setDiet: () => {},
        setCuisine: () => {},
        setServingSize: () => {},
        setCookingTime: () => {},
        setPrepTime: () => {},
        setIngredientsList: () => {},
        setPictures: () => {},
        setDirections: () => {},
        }
    
    }
)
*/ 