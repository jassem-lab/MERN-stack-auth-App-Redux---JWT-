import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        // Apply Authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token
    } else {
        // Delete Auth Header
        delete axios.defaults.headers.common["Authoroization"];
    }
}

export default setAuthToken