import React from 'react';
import './Login.css';


import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { userContext } from '../../App';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

//initialize firebase app
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


//main login component function
const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const [user, setUser] = useState({
        isNewUser: true,
        isSignedIn: false,
        userName: '',
        email: '',
        picture: '',
        password: '',
        error: '',
        success: false
    });

    //use context api

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    //for redirect
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    //sign in with google popup
    const handleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
                const { name, email, picture } = result.additionalUserInfo.profile
                const signedInUser = {
                    isSignedIn: true,
                    userName: name,
                    email: email,
                    picture: picture
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(name, email, picture);
                console.log(loggedInUser);
            })
            .catch(error => alert(error))
    }

    //form validation
    const [passwordCheck, setPasswordCheck] = useState('');
    const [emailWarning, setEmailWarning] = useState(false);
    const [passWarning, setPassWarning] = useState(false);
    const [confirmPassWarning, setConfirmPassWarning] = useState(false)


    const handleBlur = (e) => {
        // console.log(e.target.name);
        //name validation
        if (e.target.name === 'name') {
            const newUserInfo = { ...user };
            newUserInfo.userName = e.target.value;
            setUser(newUserInfo);
        }

        //email validation
        if (e.target.name === 'email') {
            let isEmailValid = true;
            isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
            // console.log(isEmailValid);
            if (isEmailValid) {
                setEmailWarning(false);
                const newUserInfo = { ...user };
                newUserInfo.email = e.target.value;
                setUser(newUserInfo);
            }
            else {
                setEmailWarning(true);
                const newUserInfo = { ...user };
                newUserInfo.email = '';
                setUser(newUserInfo);
            }
        }

        //password validation
        if (e.target.name === 'password') {
            let isPasswordValid = e.target.value.length > 5;
            if (isPasswordValid) {
                setPassWarning(false);

                if (passwordCheck !== '' && user.isNewUser) {
                    if (e.target.value !== passwordCheck) {
                        //if first password changed ,show warning again 
                        setConfirmPassWarning(true);
                        //and clear the password from state
                        const newUserInfo = { ...user };
                        newUserInfo.password = '';
                        setUser(newUserInfo)
                    }
                }
                if (!user.isNewUser) {
                    //for login, set the password directly to the state
                    const newUserInfo = { ...user };
                    newUserInfo.password = e.target.value;
                    setUser(newUserInfo);
                    setConfirmPassWarning(false);

                }
                //set the password in a state to match with other passwor field
                setPasswordCheck(e.target.value);
            }
            else {
                //if password invalid, show warning and clear the value of password
                const newUserInfo = { ...user };
                newUserInfo.password = '';
                setUser(newUserInfo);
                setPassWarning(true);
            }
        }

        if (e.target.name === 'confirmPassword') {
            //check two password are same
            if (e.target.value === passwordCheck) {
                setConfirmPassWarning(false);
                const newUserInfo = { ...user };
                newUserInfo.password = e.target.value;
                setUser(newUserInfo);
            }
            else {
                //if not same, show warning
                setConfirmPassWarning(true);

                const newUserInfo = { ...user };
                newUserInfo.password = '';
                setUser(newUserInfo)
            }

        }
        console.log(user);
    }

    //toggle sign in
    const toggleSignIn = () => {
        const newUserInfo = { ...user };
        if (newUserInfo.isNewUser) {
            newUserInfo.isNewUser = false;
        }
        else {
            newUserInfo.isNewUser = true;
        }
        setUser(newUserInfo);
    }


    //handle submit

    const handleSubmit = (e) => {
        if (user.isNewUser) {
            if (user.email && user.password && user.userName) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then((res) => {
                        // Signed in
                        updateUserInfo(user.userName);
                        const newUserInfo = { ...user }
                        newUserInfo.error = '';
                        newUserInfo.success = true;
                        newUserInfo.userName = res.user.displayName;
                        newUserInfo.isSignedIn = true;
                        setUser(newUserInfo);
                        setLoggedInUser(newUserInfo)
                        console.log(loggedInUser);

                    })
                    .catch((error) => {
                        //const errorCode = error.code;
                        const errorMessage = error.message;
                        const newUserInfo = { ...user };
                        newUserInfo.error = errorMessage;
                        newUserInfo.success = false;
                        setUser(newUserInfo);
                    });
            }
            else {
                alert('Please insert valid email and password')
            }
        }

        //sign in handle

        if (!user.isNewUser) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in
                    var signedInUser = res.user;
                    console.log(signedInUser);

                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.userName = res.user.displayName;
                    newUserInfo.email = res.user.email;
                    newUserInfo.isSignedIn = true


                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from)
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    const errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        })
            .then(() => {
                console.log('user name updated');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='form-wrapper' >
            <h2 className='form-heading'>{user.isNewUser ? 'Create an account' : 'Log in with your account'}</h2>

            <form onSubmit={handleSubmit}>
                {
                    user.isNewUser && <input onBlur={handleBlur} type="text" name='name' placeholder='Name' required />
                }

                <input onBlur={handleBlur} type="email" name='email' placeholder='username or email' required />

                {
                    emailWarning && <p className="text-danger">Please input valid email</p>
                }

                <input onBlur={handleBlur} type="password" name='password' placeholder='Password' required />

                {
                    passWarning && <p className="text-danger">Password must be six charecter</p>
                }

                {
                    user.isNewUser && <input onBlur={handleBlur} type="password" name='confirmPassword' placeholder='Confirm Password' required />
                }

                {
                    confirmPassWarning && <p className="text-danger">Password dosen't match</p>
                }

                <button className='btn btn-primary btn-center' type="submit">{user.isNewUser ? 'Create an account' : 'Log in'}</button>
            </form>
            {
                user.success && <p className='text-success text-center'>{user.isNewUser ? 'Regestration' : 'Login'} successful</p>
            }
            <p className="text-danger text-center">{user.error}</p>
            <p className='text-center'>
                {user.isNewUser ? 'Already have an account?' : 'Do not have any account?'}
                <span onClick={toggleSignIn} className='login'>{user.isNewUser ? 'Log in' : 'Create an account'}</span>
            </p>
            <p className="text-center">OR</p>
            <button onClick={handleSignIn} className='large-btn'>continue with google</button>

        </div>
    );
};

export default Login;