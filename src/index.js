import express, {json} from 'express';
import {adaptBody, adaptBodyForDB, adaptResponse, users} from "./Users.js";
import {findUser} from './FindUser.js';
import {retrieveGithubUsers} from './FetchGithubUsers.js';
import {CustomerRepository} from "./MongoDB.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(json());

let DB = '';

if(process.env.STAGE === 'local') {
    console.log('Running in local env');
    DB = 'localhost';
} else {
    DB = 'db';
}

const customerRepository = new CustomerRepository(DB, "27017");

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/addUser', (req, res) => {
    users.push(adaptBody(req.body));

    return customerRepository.insert(adaptBodyForDB(req.body))
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
    let user = await customerRepository.query(req.query.name)

    if (notFound(user)) {
        res.sendStatus(404);
    } else {
        res.send(adaptResponse(user));
    }
});

const notFound = (user) => user === null

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

