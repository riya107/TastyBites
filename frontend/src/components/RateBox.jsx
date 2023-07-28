import { Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import '../styles/components-styles/RateBox.css';
import { useState } from 'react';
import { rateRecipeAPI } from '../api-calls/apiCalls';
import { toast } from 'react-toastify';
import { fetchRecipeAPI } from '../api-calls/apiCalls';

const RateBox = ({recipeState, setRecipeState}) => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (i) => {
        setRating(i);
    }

    const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const color = rating >= i ? "#FFDF00" : "#EEEDED";
      stars.push(<FaStar onClick={()=>handleStarClick(i)} className='point' key={i} size={30} color={color} />);
    }
    return stars;
  };
    const handleRate = async () => {
        if(rating===0){
            toast('Select stars first');
            return;
        }
        const data = {rating:rating, recipe_id:recipeState._id};
        const status = await rateRecipeAPI(data);
        if(status){
            toast("Rating Successful");
            setRecipeState( await fetchRecipeAPI({recipe_id:recipeState._id}));
        }
        else{
            toast('Rating Failed')
        }
    }
    return ( 
        <div className="rate-box mb-3">
            <div>{renderStars()}</div>
            <Button onClick={handleRate} className='mx-3' variant="danger">Rate</Button>
        </div>
     );
}
 
export default RateBox;