import './custom.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipe from './pages/addRecipe';
import MyRecipes from './pages/myRecipes';
import ShoppingList from './pages/shoppinglist';
import Layout from './pages/layout';
import Home from './pages/home';
import Recipe from './pages/recipe';
import AddDirection from './pages/addRecipe/addDirection';
import Search from './pages/search';

import RecipeAPIContext from './contexts/recipeAPIcontext';
import { useRecipeAPIContext } from './contexts/recipeAPIcontext';
import AddRecipeBase from './pages/UseBaseRecipe';
import AddDirectionBase from './pages/UseBaseRecipe/addDirectionBase';
import EditRecipe from './pages/editRecipe';
import EditDirection from './pages/editRecipe/editDirections';
import ExtendCreated from './pages/myRecipes/extendCreated';
import ExtendHistory from './pages/myRecipes/extendHistory';
import ExtendFavourites from './pages/myRecipes/extendFavourites';
import UserLogin from './pages/profile';
import ProfileViewPage from './pages/profile/view';
import ProfileEditPage from './pages/profile/edit';
import Register from './pages/profile/register';
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
            <Route path="/recipes/use-base-recipe" element={<AddRecipeBase/>}/>
            <Route path="/recipe/:id/edit" element={<EditRecipe/>}/>
            <Route path="/recipe/:id/base-recipe-add-direction" element={<AddDirectionBase/>}/>
            <Route path='/recipe/:id/add-direction' element={<AddDirection/>}/>
            <Route path='/recipe/:id/edit-direction' element={<EditDirection/>}/>
            <Route path="/my-recipes" element={<MyRecipes/>}/>
            <Route path="/my-recipes/created" element={<ExtendCreated/>}/>
            <Route path="/my-recipes/history" element={<ExtendHistory/>}/>
            <Route path="/my-recipes/favourites" element={<ExtendFavourites/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path='/profile' element={<ProfileViewPage/>}/>
            <Route path='/profile/edit' element={<ProfileEditPage/>}/>
            <Route path="/shoppinglist" element={<ShoppingList/>}/>
            <Route path='/recipes/search' element={<Search/>}/>
            <Route path='/recipe/:id' element={recipe}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
