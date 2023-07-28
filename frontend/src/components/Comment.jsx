import '../styles/components-styles/Comment.css';
import { formatDate } from '../utils';

const Comment = ({comment}) => {
    return ( 
        <div className='comment mb-3'>
            <div>
                <div className='theme-color f-b'>{comment.commentor_name}</div>
                <div className='second-color date'>{formatDate(comment.createdAt)}</div>
            </div>
            <div>{comment.comment}</div>
            <hr className='rule'></hr>
        </div>
     );
}
 
export default Comment;