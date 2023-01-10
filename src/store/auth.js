import { createSlice } from '@reduxjs/toolkit'

const intialAuthState = { 
    token: localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false, 
}
const authSlice = createSlice({
    name: 'authentication',
    initialState: intialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
        },
        logout(state) { 
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;