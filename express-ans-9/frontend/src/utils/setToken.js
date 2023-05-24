const setToken = (token) => {
    localStorage.setItem('token',token);
    return true
}

export default setToken;