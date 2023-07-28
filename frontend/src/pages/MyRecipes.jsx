import FoodItemCard from "../components/FoodItemCard";
import { useLocation } from "react-router-dom";
import '../styles/page-styles/MyRecipes.css';
import { useState } from "react";
const MyRecipes = () => {
    const location = useLocation();
    const { recipes } = location.state;
    const [recipesState, setRecipesState] = useState(recipes);
    return ( 
        <div className="my-recipes">
            {recipesState.map((e, i) => {
                return <FoodItemCard index={i} recipesState={recipesState} setRecipesState={setRecipesState} key={i} recipe={e} dustbin={true}/>;
            })}
        </div>
     );
}
 
export default MyRecipes;