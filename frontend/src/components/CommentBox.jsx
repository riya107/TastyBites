import { useContext, useState } from 'react';
import '../styles/components-styles/CommentBox.css';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import { commentAPI, fetchRecipeAPI } from '../api-calls/apiCalls';
import { toast } from 'react-toastify';

const CommentBox = ({recipeState, setRecipeState}) => {
    const {user} = useContext(AppContext)
    const [comment, setComment] = useState("");
    const handleComment = async () => {
        if(comment===""){
            toast("Write something in comment")
            return ;
        }
        const data = {
            recipe_id:recipeState._id,
            comment:comment
        }
        const status = await commentAPI(data);
        if(status){
            setComment('');
            setRecipeState( await fetchRecipeAPI({recipe_id:recipeState._id}));
        }
        else{
            toast('Comment Failed');
        }
    }
    return ( 
        <div className='comment-box'>
        <div className='f-b mb-2'>{user.name}</div>
        <input value={comment} onChange={(e)=>{setComment(e.target.value)}} className='type-comment mb-2' type="text"></input>
        <Button onClick={handleComment} className='comment-btn' variant="danger">Comment</Button>
        </div>
     );
}
 
export default CommentBox;