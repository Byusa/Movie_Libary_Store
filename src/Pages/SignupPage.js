import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/auth' 

const SignupPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const isAuth = useSelector( state => state.auth.isAuthenticated )

    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const loginHandler = (event) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
        console.log(isAuth)
        dispatch(authActions.login())
    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                <label htmlFor='email'> Email </label>
                <input type='email' id='email' value={email} onChange={emailChangeHandler}/>
            </div>
            <div>
                <label htmlFor='Password'> Password </label>
                <input type='password' id='password' value={password} onChange={passwordChangeHandler}/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )

}
export default SignupPage