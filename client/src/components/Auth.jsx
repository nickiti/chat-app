import React , {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    username: "",
    fullName: "",
    email: "",
    avatarURL: "",
    password: "",
    confirmPassword:"",

}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);


    //takes user inputs and creates a form
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})

    }


    //submits form then sends to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username, fullName, password, email, avatarURL} = form;

        const URL = 'http://localhost:5000/auth';

        const {data: {token, userId, hashedPassword }} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, email, avatarURL,
        });
        
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId)
        
        if(isSignup) {
            cookies.set('email', email);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword)   
        }

        window.location.reload();
    }


    //switches from sign up to sign in vice versa
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder=''
                                    onChange={handleChange}
                                    required />
                        </div>
                        {isSignup && (
                            <>
                                <div className='auth__form-container_fields-content_input'>
                                        <label htmlFor='FullName'>Full Name</label>
                                        <input
                                            name='fullName'
                                            type='text'
                                            placeholder=''
                                            onChange={handleChange}
                                            required />
                                </div>
                            </> 
                            )}                        
                        {isSignup && (
                            <>
                            <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        name='email'
                                        type='text'
                                        placeholder=''
                                        onChange={handleChange}
                                        required />
                            </div>
                            </> 
                        )} 

                        {isSignup && (
                            <>
                            <div className='auth__form-container_fields-content_input'>
                                    <label htmlFor='avatarURL'>Avatar URL</label>
                                    <input
                                        name='avatarURL'
                                        type='text'
                                        placeholder=''
                                        onChange={handleChange}
                                     />
                            </div>
                            </> 
                        )}       
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                                <input
                                    name='password'
                                    type='password'
                                    placeholder=''
                                    onChange={handleChange}
                                    required />
                        </div>
                        {isSignup && (
                            <>
                                <div className='auth__form-container_fields-content_input'>
                                        <label htmlFor='confirmPassword'>Confirm Password</label>
                                        <input
                                            name='confirmPassword'
                                            type='password'
                                            placeholder=''
                                            onChange={handleChange}
                                            required />
                                </div>
                            </> 
                            )}
                            <div className='auth__form-container_fields-content_button'>
                                <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                            </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup
                            ? "Already have an account?"
                            : "Don't have an account?"
                            }
                            &nbsp;
                            <span onClick={switchMode}> 
                                {isSignup ? 'Sign in' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
