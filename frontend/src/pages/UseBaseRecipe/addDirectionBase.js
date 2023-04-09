import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';
import AddBaseDirectionForm from '../../components/form/use base recipe/addDirections';


function AddDirectionBase() {

    return (
        <>
            <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Add directions</h1>
                <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
                <AddBaseDirectionForm/>
                </RecipeAPIContext.Provider>
            </div>
            
        </>
    );
   
  }
  
  export default AddDirectionBase;
  