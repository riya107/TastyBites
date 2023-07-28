import { MdClose } from 'react-icons/md';
import TastyBites from '../images/tastyBites.png';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import AppContext from '../context/AppContext';
import { useContext, useEffect } from 'react';

import '../styles/components-styles/SideBar.css';
import { useNavigate, Link} from 'react-router-dom';
import { fetchMyRecipesAPI, userGetterAPI } from '../api-calls/apiCalls';
import { toast } from 'react-toastify';

const SideBar = () => {
    
    const {user, setUser, sideBarState, setSideBarState } = useContext(AppContext);

    useEffect(()=>{
        (async ()=>{
          setUser(await userGetterAPI());
        })();
      },[setUser]);

    const sideBarClasses = `side-bar pp-5 ${sideBarState}`;

    const navigate = useNavigate();

    const closeSideBar = () =>{
        setSideBarState("close");
    }

    const moveToSignIn = () => {
        navigate('/signIn');
        setSideBarState("close");
    }

    const moveToPublishPage = () => {
        navigate("/publishRecipe");
        setSideBarState("close");
    }

    const moveToHomePage = () => {
        navigate("/");
        setSideBarState("close");
    }

    const moveToRecipesByCategory = (e) => {
        navigate(`/recipesByCategory/${e.target.innerText}`,{ state: { category: e.target.innerText } });
        setSideBarState("close");
    }

    const moveToMyRecipes = async () => {
        const recipes = await fetchMyRecipesAPI();
        if(recipes.length===0){
            toast('You have not published any recipe');
        }
        else{
            navigate('/myRecipes',{ state: { recipes: recipes } } );
        }
        setSideBarState("close");
    }
    return ( 
        <div className={sideBarClasses}>
            <MdClose onClick={closeSideBar} className='cross point second-color' size={30}/>
            <img className='side-logo' src={TastyBites} alt='Loading'></img>
            <div className='categories mm-5 pp-5'>
                <div className='pp-5 point' onClick={moveToHomePage}>Home</div>
                <div onClick={moveToRecipesByCategory} className='pp-5 point'>Recipes</div>
                <div onClick={moveToRecipesByCategory} className='pp-5 point'>Quick & Easy</div>
                <div onClick={moveToRecipesByCategory} className='pp-5 point'>Holidays & Seasons</div>
                {user && <div className='pp-5 point' onClick={moveToPublishPage}>Publish Recipe</div>}
                {user && <div onClick={moveToMyRecipes} className='pp-5 point'>My Recipes</div>}
            </div>
            <ul className='side-icons'>
                    <li className='mm-5 point'><Link target='_blank' to='https://www.instagram.com/iitbhilai'><FaInstagram size={25} color='#F6412F'/></Link> </li>
                    <li className='mm-5 point'><Link target='_blank' to='https://www.facebook.com/iit.bh'><FaFacebook size={25} color='#F6412F'/></Link></li>
                    <li className='mm-5 point'><Link target='_blank' to='https://twitter.com/IIT_Bhilai'><FaTwitter size={25} color='#F6412F'/></Link></li>
                </ul>
            {!user && <div className='point mm-5 pp-5 side-sign' onClick={moveToSignIn}>Sign In</div>}
        </div>
     );
}
 
export default SideBar;