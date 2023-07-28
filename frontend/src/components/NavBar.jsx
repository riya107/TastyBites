import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { userGetterAPI } from '../api-calls/apiCalls';
import '../styles/components-styles/NavBar.css';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const {user, setUser, setSideBarState } = useContext(AppContext);
    useEffect(()=>{
        (async ()=>{
          setUser(await userGetterAPI());
        })();
      },[setUser]);

    const navigate = useNavigate();

    const openSideBar = () => {
        setSideBarState("open");
    }

    const moveToSignIn = () => {
        navigate('/signIn');
    }

    return ( 
        <nav className='nav-bar'>
            <div className='mm-5 point'>
                <FiMenu onClick={openSideBar} size={30} color='#A1A1A1'/>
            </div>
            <div className='main-heading theme-color'>
                tastyBites
            </div>
            <div>
                <ul className='nav-icons'>
                    <li className='mm-5 point'><Link target='_blank' to='https://www.instagram.com/iitbhilai'><FaInstagram size={25} color='#F6412F'/></Link> </li>
                    <li className='mm-5 point'><Link target='_blank' to='https://www.facebook.com/iit.bh'><FaFacebook size={25} color='#F6412F'/></Link></li>
                    <li className='mm-5 point'><Link target='_blank' to='https://twitter.com/IIT_Bhilai'><FaTwitter size={25} color='#F6412F'/></Link></li>
                    {!user && <li className='mm-5 second-color point f-b' onClick={moveToSignIn}>Sign In</li>}
                </ul>
            </div>
        </nav>
     );
}
 
export default NavBar;