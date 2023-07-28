import { FaStar } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import '../styles/components-styles/FoodItemCard.css';
import { useNavigate } from 'react-router-dom';
import { deleteRecipeAPI } from '../api-calls/apiCalls';
import { toast } from 'react-toastify';

const FoodItemCard = ({recipe, dustbin, recipesState, setRecipesState, index}) => {
    const navigate = useNavigate();

    const deleteRecipe = async (e) => {
      e.stopPropagation()
      const status = await deleteRecipeAPI(recipesState[index]._id);
      if(status){
        const recipes = recipesState.slice();
        recipes.splice(index,1);
        setRecipesState(recipes);
        toast('Deletion Successful');
      }
      else{
        toast('Deletion Failed');
      }
    }
    const renderStars = () => {
      const stars = [];
      const rating = Math.round(recipe.rating);
      for (let i = 1; i <= 5; i++) {
        const color = (rating>=i)? "#FFDF00" : "#EEEDED";
        stars.push(<FaStar key={i} size={25} color={color}/>);
      }
      if(dustbin){
        stars.push(<FiTrash2 onClick={deleteRecipe} className='mx-3' key={6} size={25} color='red'/>);
      }
      return stars;
    };
    
    const moveToRecipePage = () => {
      navigate(`/recipe/${recipe._id}`, { state: { recipe } });
    }
    return ( 
        <div onClick={moveToRecipePage} className="food-item point mm-5">
            <img className='food-img' src={recipe.image_url} alt='Loading'></img>
            <div className='content-center'>
            <div className='food-item-name'>{recipe.recipe_name}</div>
            <div className='stars'>
            {renderStars()}
            </div>
            </div>
        </div>
     );
}
 
export default FoodItemCard;