import React from 'react'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'

const authenticationButton = () => {
    const isAuthenticated  = true
    return isAuthenticated ? <LogoutButton /> : <LoginButton />
}
export default authenticationButton
