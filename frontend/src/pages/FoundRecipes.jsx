import "../styles/page-styles/FoundRecipes.css";
import { useLocation } from "react-router-dom";
import FoodItemCard from "../components/FoodItemCard";

const FoundRecipes = () => {
  const location = useLocation();
  const { recipes } = location.state;
  return (
    <div className="found-recipes">
      {recipes.map((e, i) => {
        return <FoodItemCard key={i} recipe={e} />;
      })}
    </div>
  );
};

export default FoundRecipes;
