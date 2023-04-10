/* eslint-disable no-restricted-globals */
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeBaseForm from '../../components/form/use base recipe';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';


function AddRecipeBase() {

    return (
        <>
            <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Create New Recipe</h1>
                <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
                <RecipeBaseForm/>
                </RecipeAPIContext.Provider>
            </div>
            
        </>
    );
   
  }
  
  export default AddRecipeBase;
  