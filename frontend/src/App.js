import logo from './logo.svg';
import './custom.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddRecipe from './pages/addRecipe';
import MyRecipes from './pages/myRecipes';
import Profile from './pages/profile';
import ShoppingList from './pages/shoppinglist';
import Layout from './pages/layout';
import Home from './pages/home';

function App() {
  return (
      // browerrouter gives error
      // <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/addRecipe" element={<AddRecipe/>}/>
            <Route path="/myRecipes" element={<MyRecipes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/shoppinglist" element={<ShoppingList/>}/>
          </Route>
        </Routes>
      // </BrowserRouter>
  );
}

export default App;
