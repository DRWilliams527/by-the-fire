const axios = require('axios')

const submit = async (formType, setError, setUser) => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (!username || !password) {setError('Cannot login / register with missing field(s)'); return}

    let response = {}

    if (formType) {
        response = await axios.post('/user/loginUser', {username, password})
    } else {
        response = await axios.post('/user/registeUser', {username, password})
    }

    if (!response.data.error) {
        setUser({
            username: response.data.username,
            books: response.data.books,
            movies: response.data.movies,
            friends: response.data.friends
        })
    } else {
        setError(response.data.error)
    }
}

export default submit
