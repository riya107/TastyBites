import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import AppState from "./context/AppState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavFoot from "./components/NavFoot";
import SignIn from "./pages/SignIn";
import SignUp
 from "./pages/SignUp";
import SideBar from "./components/SideBar";
import PublishRecipe from "./pages/PublishRecipe";
import Recipe from "./pages/Recipe";
import { ToastContainer } from 'react-toastify';
import RecipesByCategory from "./pages/RecipesByCategory";
import FoundRecipes from "./pages/FoundRecipes";
import MyRecipes from "./pages/MyRecipes";

function App() {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route path="/" element={<NavFoot />}>
            <Route index element={<Home />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/publishRecipe" element={<PublishRecipe />}></Route>
            <Route path="/recipe/:id" element={<Recipe />}></Route>
            <Route path="/recipesByCategory/:category" element={<RecipesByCategory />}></Route>
            <Route path="/foundRecipes" element={<FoundRecipes />}></Route>
            <Route path="/myRecipes" element={<MyRecipes />}></Route>
          </Route>
        </Routes>
        <SideBar/>
        <ToastContainer/>
      </Router>
    </AppState>
  );
}

export default App;
