import AddDirectionForm from '../../components/form/recipe/addDirections';
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';

function Recipe() {
    return (
      <>
      <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Add directions</h1>
                {/* <RecipeAPIContext.Provider value={useRecipeAPIContext()}> */}
                <AddDirectionForm/>
                {/* </RecipeAPIContext.Provider> */}
            </div>
      </>   
    );
  }
  
  export default Recipe;