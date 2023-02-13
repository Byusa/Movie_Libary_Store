import { createSlice } from '@reduxjs/toolkit'

const intialAuthState = { 
    token: localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false, 
    expirationTime: localStorage.getItem('expirationTime') || null
}
const authSlice = createSlice({
    name: 'authentication',
    initialState: intialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
            localStorage.setItem('expirationTime', new Date(new Date().getTime() + 3600 * 1000));
        },
        logout(state) { 
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;