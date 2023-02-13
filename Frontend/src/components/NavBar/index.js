import React from 'react'
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector( state => state.auth.isAuthenticated )

    const onLogoutHandler = () => {
        dispatch(authActions.logout());
        navigate('/auth'); 
        console.log('logout');
    }
    return (
    <> 
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>ReadWatch</div>
            </Link>
        <nav>
            <ul>
            {!isAuth && (
                <li>
                <Link to='/auth'>Login/Register</Link>
                </li>
            )}
            {isAuth && (
                <li>
                <Link to='/profile'>Profile</Link>
                </li>
            )}
            {isAuth && (
            <li>
                <button onClick={onLogoutHandler}>Logout</button>
            </li>
            )}
            </ul>
        </nav>
        </header>
    </> 
    )
}
export default NavBar;