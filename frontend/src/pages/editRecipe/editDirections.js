import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';
import EditDirectionForm from '../../components/form/edit recipe/EditDirections';


function EditDirection() {

    return (
        <>
            <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Add directions</h1>
                <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
                <EditDirectionForm/>
                </RecipeAPIContext.Provider>
            </div>
            
        </>
    );
   
  }
  
  export default EditDirection;