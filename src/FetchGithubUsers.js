import fetch from 'node-fetch';

export const retrieveGithubUsers = () =>
    fetch('https://api.github.com/users/dade92')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw Error
            }
        })
        .catch(e => {
            console.log(e);
        })

