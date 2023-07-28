import "../styles/page-styles/Recipe.css";
import { FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import CommentBox from "../components/CommentBox";
import Comment from "../components/Comment";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { ratedByMeAPI, userGetterAPI } from "../api-calls/apiCalls";
import { formatDate } from "../utils";
import RateBox from "../components/RateBox";

const Recipe = () => {
  const {user} = useContext(AppContext);
  const location = useLocation();
  const { recipe } = location.state;
  const [recipeState, setRecipeState] = useState(recipe);
  const { setUser } = useContext(AppContext);
  const [rated, setRated] = useState(true);

  useEffect(()=>{
    (async ()=>{
      const res = await userGetterAPI();
      setUser(res);
      if(res){
        setRated(await ratedByMeAPI({recipe_id:recipeState._id}));
      }
    })();
  },[setUser,recipeState]);

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(recipeState.rating);
    for (let i = 1; i <= 5; i++) {
      const color = rating >= i ? "#FFDF00" : "#EEEDED";
      stars.push(<FaStar key={i} size={25} color={color} />);
    }
    return stars;
  };

  const methodSteps = () => {
    const delimitersRegex = /\n|\\n/;
    const steps = recipeState.method.split(delimitersRegex);
    return steps;
  }
  return (
    <div className="recipe-page">
    <div className="recipe-name theme-color">{recipeState.recipe_name}</div>
      <div className="mb-2">{recipeState.summary}</div>
      <div>
        <div className="recipe-creator">
          <div>By</div>
          <div className=" creator-name f-b">{recipeState.creator_name}</div>
        </div>
        <div className="updated-date-wrapper mb-2">
          <div>Published</div>
          <div className="updated-date f-b">{formatDate(recipeState.createdAt)}</div>
        </div>
      </div>
      <div className="star-comment">
        <div>{renderStars()}</div>
        <div>
          <AiOutlineMessage size={30} color="#F6412F"/> {recipeState.comments.length} Comments
        </div>
      </div>
      <hr className="rule"></hr>
      <img src={recipeState.image_url} alt="Loading" className="food-picture mb-3"></img>
      <div className="f-b theme-color">Ingredients</div>
      <ul>
      {recipeState.ingredients.map((e,i)=>{
        return (
            <li key={i}>{e}</li>
        )
      })}
      </ul>
      <div className="f-b theme-color">Method</div>
      <ul className="mb-5">
      {methodSteps().map((e,i)=>{
        return (
            <li key={i}>{e}</li>
        )
      })}
      </ul>
      {user && !rated && <RateBox recipeState={recipeState} setRecipeState={setRecipeState}/>}
      <div className="comment-section theme-color">Comment Section</div>
      {user && <CommentBox recipeState={recipeState} setRecipeState={setRecipeState}/>}
      <div className="mm-5 pp-5">
        {recipeState.comments.map((e,i)=>{
            return (
                <Comment key={i} comment={e}/>
            )
        })}
      </div>
    </div>
  );
};

export default Recipe;
