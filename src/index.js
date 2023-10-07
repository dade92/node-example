import express, {json} from 'express';
import {adaptBody, users} from "./Users.js";
import {findUser} from './FindUser.js';
import {retrieveGithubUsers} from './FetchGithubUsers.js';
import {printDatabases} from "./MongoDB.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(json());

app.get('/status', (request, response) => {
    const status = {
        'Status': 'Running'
    };

    response.send(status);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/addUser', (req, res) => {
    users.push(adaptBody(req.body));

    return res.sendStatus(204);

});

app.get('/githubUsers', async (req, res) => {
    retrieveGithubUsers()
        .then(users => res.json(users))
        .catch(() => res.sendStatus(500))
});

app.get('/findUser/:id', (req, res) => {
    let user = findUser(req.params.id, users);

    if (notFound(user)) {
        res.sendStatus(404);
    } else {
        res.send(user);
    }
});

app.get('/databases', (req, res) => {
    printDatabases()
    res.sendStatus(204)
})

const notFound = (user) => user === undefined

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

