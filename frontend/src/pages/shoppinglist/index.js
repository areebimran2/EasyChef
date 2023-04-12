import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import ShoppingListComp from '../../components/shoppinglist';

function ShoppingList() {
    return (
      <>
      <div className="container-1000 mt-8 ms-auto me-auto">
                <h1>My Shopping List</h1>
              <ShoppingListComp url={'http://localhost:8000/recipes/shoppinglist'}/>
      </div>
      </>   
    )
  }
  
  export default ShoppingList;
  