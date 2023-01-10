import { createSlice } from '@reduxjs/toolkit'

const intialAuthState = { isAuthenticated : false, token: null }
const authSlice = createSlice({
    name: 'authentication',
    initialState: intialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token
        },
        logout(state) { 
            state.isAuthenticated = false
            state.token = null
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;