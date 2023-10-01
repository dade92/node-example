import fetch from 'node-fetch';

export const fetchUsers = () => {
    return fetch('https://api.github.com/users/dade92')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return {};
            }
        })
        .catch(e => {
            console.log(e);
        });
}