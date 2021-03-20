import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <div className='form-wrapper' >
            <h2 className='form-heading'>Create an account</h2>
            <form>
                <input type="text" name='name' placeholder='Name' />
                <input type="email" name='email' placeholder='username or email' />
                <input type="password" name='password' placeholder='Password' />
                <input type="password" name='confirm-password' placeholder='Confirm Password' />
                <button className='btn btn-primary btn-center' type="submit">Create an account</button>
            </form>
            <p className='text-center'>Already have an account?<span className='login'>Login</span></p>
            <p className="text-center">OR</p>
            <button className='large-btn'>continue with google</button>

        </div>
    );
};

export default Login;