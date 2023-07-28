import { RiSearchLine } from "react-icons/ri";
import FoodItemCard from "../components/FoodItemCard";

import "../styles/page-styles/Home.css";

import { popular_recipes } from "../data";
import { useEffect, useState } from "react";
import { fetchPopularAPI, searchAPI } from "../api-calls/apiCalls";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const Home = () => {
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const [recipes,setRecipes] = useState([]);

  useEffect(()=>{
    (async ()=>{
      setRecipes(await fetchPopularAPI({ids:popular_recipes}));
    })();
  });

  const handleKeyPress = async (e) => {
    if (text === "") {
      return;
    }
    if (e.key === "Enter") {
        const recipes = await searchAPI({text});
        if(recipes.length===0){
            toast('0 results found for your search.');
            return ;
        }
        navigate('/foundRecipes', { state: { recipes } });
    }
  };
  return (
    <div>
      <div className="main-div">
        <div className="search-head">Find Recipes</div>
        <div className="search-container">
          <RiSearchLine size={50} color="#A1A1A1" />
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            className="search-recipe"
          ></input>
        </div>
      </div>
      <div className="popular-container">
        <div className="popular-head  theme-color center-text pp-5">
          Popular Recipes
        </div>
        <div className="popular-recipes">
          {recipes.map((e, i) => {
            return <FoodItemCard key={i} recipe={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
