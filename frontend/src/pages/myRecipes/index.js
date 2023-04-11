import RecipeLists from '../../components/MyRecipes';
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';

function MyRecipes() {
    return (
      <>
        <div class="container container-1000 container-min-1000 mt-8">
          <RecipeLists />
        </div>
      </>   
    );
  }
  
  export default MyRecipes;
  