import './custom.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipe from './pages/addRecipe';
import MyRecipes from './pages/myRecipes';
import Profile from './pages/profile';
import ShoppingList from './pages/shoppinglist';
import Layout from './pages/layout';
import Home from './pages/home';
import Recipe from './pages/recipe';
import AddDirection from './pages/addRecipe/addDirection';
import Search from './pages/search';

import RecipeAPIContext from './contexts/recipeAPIcontext';
import { useRecipeAPIContext } from './contexts/recipeAPIcontext';
function App() {

  const recipe = (
    <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
      <Recipe/>
    </RecipeAPIContext.Provider> 
  )
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/recipes/add" element={<AddRecipe/>}/>
            <Route path='/recipe/add-direction' element={<AddDirection/>}/>
            <Route path="/my-recipes" element={<MyRecipes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/shoppinglist" element={<ShoppingList/>}/>
            <Route path='/recipes/search' element={<Search/>}/>
            <Route path='/recipe/:id' element={recipe}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
