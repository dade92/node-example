import express, {json} from 'express';
import {adaptBody, adaptBodyForDB, users} from "./Users.js";
import {findUser} from './FindUser.js';
import {retrieveGithubUsers} from './FetchGithubUsers.js';
import {initConnection, insert, query} from "./MongoDB.js";

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
    return insert(adaptBodyForDB(req.body))
        .then(() => res.sendStatus(204))
        .catch(() => res.sendStatus(500));
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

app.get('/findUser', async (req, res) => {
    let user = await query(req.query.name)

    if (notFound(user)) {
        res.sendStatus(404);
    } else {
        res.send(user);
    }
});

app.get('/databases', (req, res) => {
    initConnection();

    query('Carlo')

    res.sendStatus(204)
})

const notFound = (user) => user === undefined

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

