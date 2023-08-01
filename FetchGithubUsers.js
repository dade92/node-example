import fetch from 'node-fetch';

export const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users/github');
    return  await response.json();
}