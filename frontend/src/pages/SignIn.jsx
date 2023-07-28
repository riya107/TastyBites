import { useNavigate } from 'react-router-dom';
import '../styles/page-styles/SignIn.css'
import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { signInAPI } from '../api-calls/apiCalls';
import {toast} from 'react-toastify';
import { isValidEmail } from '../utils';
import AppContext from '../context/AppContext';
import { userGetterAPI } from '../api-calls/apiCalls';

const SignIn = () => {
    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const moveToSignUp = () => {
        navigate('/signUp');
    }

    const [userForm, setUserForm] = useState({email:"", password:"" });

    const  onChangeUserForm = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    }

    const handleSignIn = async (e) =>{
        if(isValidEmail(userForm.email) && userForm.password!==""){
            e.preventDefault();
            const success = await signInAPI({
                email: userForm.email,
                password: userForm.password
            });
            if(success){
                setUser(await userGetterAPI());
                toast('Sign In Successful');
                navigate('/');
            }
            else{
                toast('Sign In Failed');
            }
        }
        else{
            toast('Wrong Credentials');
        }
    }

    return (
        <div className="sign-in-container">
        <form className='sign-in-form'>
            <input onChange={onChangeUserForm} value={userForm.email} name='email' className='pp-5 mm-5' type="email" placeholder="Your Email"></input>
            <input onChange={onChangeUserForm} value={userForm.password} name='password' className='pp-5 mm-5' type="password" placeholder="Your Password"></input>
            <Button onClick={handleSignIn} className='m-3' variant='danger'>Sign In</Button>
            <div className='sign-up-text'>
            <div className='mm-5'>Don't have an account?</div>
            <div className='f-b mm-5 point theme-color' onClick={moveToSignUp}>Sign Up</div>
            </div>
        </form>
        </div>
     );
}
 
export default SignIn;