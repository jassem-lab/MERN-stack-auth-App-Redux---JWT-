import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types'

// Register the user
export const registerUser = (userData, history) => dispatch => {
    // Redirects to login on successful registration
    axios.post("/api/users/register", userData).then(res => history.push("/login")).catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Login - Gets User Token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login", userData).then(res => {
        // Saves Token to localStorage and Sets Token
        const { token } = res.data
        localStorage.setItem("jwtToken", token)

        // Set Token to Auth Header
        setAuthToken(token);

        // Decode Token to get userData
        const decoded = jwt_decode(token);

        // Set Current User
        dispatch(setCurrentUser(decoded))
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Set Logged In User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Loading User
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

// Log User Out
export const logoutUser = () => dispatch => {
    // Remove Token from localStorage
    localStorage.removeItem("jwtToken");

    // Remove Auth Header
    setAuthToken(false);

    // Set current user to empty object
    dispatch(setCurrentUser({}));
}