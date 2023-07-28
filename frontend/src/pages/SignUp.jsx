import { useState, useContext } from 'react';
import '../styles/page-styles/SignUp.css';
import { Button } from 'react-bootstrap';
import {toast} from 'react-toastify';

import { isValidEmail } from '../utils';

import { signUpAPI, userGetterAPI } from '../api-calls/apiCalls';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';

const SignUp = () => {
    const {setUser} = useContext(AppContext);
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({firstName: "", lastName:"", email:"", password:"" });

    const  onChangeUserForm = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    }

    const handleSignUp = async (e) =>{
        e.preventDefault();
        if( isValidEmail(userForm.email) && userForm.firstName!=="" && userForm.lastName!=="" && userForm.password!==""){
            const success = await signUpAPI({
                name: `${userForm.firstName} ${userForm.lastName}`,
                email: userForm.email,
                password: userForm.password
            });
            if(success){
                setUser(await userGetterAPI());
                toast('Sign Up Successful');
                navigate('/');
            }
            else{
                toast('Sign Up Failed');
            }
        }
        else{
            toast('Wrong Credentials');
        }
    }

    return ( 
        <div className="sign-up-container">
        <form className='sign-up-form'>
            <div className='person-name'>
                <input name='firstName' onChange={onChangeUserForm} value={userForm.firstName} className='pp-5 mm-5' type="text" placeholder="First Name"></input>
                <input name='lastName' onChange={onChangeUserForm} value={userForm.lastName} className='pp-5 mm-5' type="text" placeholder="Last Name"></input>
            </div>
            <input name='email' onChange={onChangeUserForm} value={userForm.email} className='pp-5 mm-5' type="email" placeholder="Your Email"></input>
            <input name='password' onChange={onChangeUserForm} value={userForm.password} className='pp-5 mm-5' type="password" placeholder="Your Password"></input>
            <Button className='m-3' variant='danger' onClick={handleSignUp}>Sign Up</Button>
        </form>
        </div>
     );
}
 
export default SignUp;