import fetch from 'node-fetch';

export const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users/github');
    const body = await response.json();
    console.log(body);
    return body;
}