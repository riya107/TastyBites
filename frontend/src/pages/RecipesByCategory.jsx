import { useEffect, useState } from "react";
import { subCategories } from "../data";
import { useLocation } from 'react-router-dom';
import { fetchRecipesByFilterAPI } from "../api-calls/apiCalls";
import FoodItemCard from "../components/FoodItemCard";

import '../styles/page-styles/RecipesByCategory.css';

const RecipesByCategory = () => {
    const location = useLocation();
    const { category } = location.state;
    const [subcategory, setSubcategory] = useState("");
    const [recipes, setRecipes] = useState([]);

    const changeSubcategory = (e) => {
        setSubcategory(e.target.innerText);
    }

    const resetSubcategory = () => {
        setSubcategory("");
    }

    useEffect(()=>{
        (async () => {
            const filter = {
                category:category,
                subcategory:subcategory
            }
            setRecipes(await fetchRecipesByFilterAPI(filter));
        })();
    },[subcategory, category]);
    const customClass = (""===subcategory)?"sub point p-1 m-1 selected":"sub point p-1 m-1";
    return ( 
        <div className="recipe-by-category">
            <div className="sub-categories f-b">
                <div className={customClass} onClick={resetSubcategory}>All</div>
                {subCategories[category].map((e, i)=>{
                    const customClass = (e===subcategory)?"sub point p-1 m-1 selected":"sub point p-1 m-1";
                    return (
                        <div className={customClass} key={i} onClick={changeSubcategory}>{e}</div>
                    )
                })}
            </div>
            <div className="recipe-label theme-color">Recipes</div>
            <div className="category-recipes">
                    {recipes.map((e, i)=>{
                        return <FoodItemCard key={i} recipe={e}/>
                    })}
            </div>
        </div>
     );
}
 
export default RecipesByCategory;