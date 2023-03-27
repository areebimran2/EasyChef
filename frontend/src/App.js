import logo from './logo.svg';
import './custom.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import AddRecipe from './pages/addRecipe';

function App() {
  return (
    <>  
      <header>
        <Navbar />
      </header>
        
        <Routes>
          <Route path="/addRecipe" element={<AddRecipe/>}/>
        </Routes>
          
      <footer class="mt-5 p-2 d-flex flex-column-reverse" id="homepageFooter">
      <p class="container m-0">copyrights@ UTM CSC309 Group 196</p>
    </footer>
    </>
  );
}

export default App;
