import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';
import EditRecipeForm from '../../components/form/edit recipe';


function EditRecipe() {

    return (
        <>
            <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Create New Recipe</h1>
                <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
                <EditRecipeForm/>
                </RecipeAPIContext.Provider>
            </div>
            
        </>
    );
   
  }
  
  export default EditRecipe