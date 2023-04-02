import './custom.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddRecipe from './pages/addRecipe';
import MyRecipes from './pages/myRecipes';
import Profile from './pages/profile';
import ShoppingList from './pages/shoppinglist';
import Layout from './pages/layout';
import Home from './pages/home';
import Recipe from './pages/recipe';
import AddDirection from './pages/addRecipe/addDirection';

function App() {
  return (
      // browerrouter gives error
      // <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/recipes/add" element={<AddRecipe/>}/>
            <Route path='/recipe/add-direction' element={<AddDirection/>}/>
            <Route path="/my-recipes" element={<MyRecipes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/shoppinglist" element={<ShoppingList/>}/>
            <Route path='/recipe' element={<Recipe/>}/>
          </Route>
        </Routes>
      // </BrowserRouter>
  );
}

export default App;
