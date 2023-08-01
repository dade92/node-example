const { fetch } = require('node-fetch');

const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users/github');
    return response.json();
}

module.exports = {fetchUsers};