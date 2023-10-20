import express, {json} from 'express';
import {adaptResponse} from "./Users.js";
import {retrieveGithubUsers} from './FetchGithubUsers.js';
import {CustomerRepository} from "./MongoDB.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(json());

let DB;

if (process.env.STAGE === 'local') {
    console.log('Running in local env');
    DB = 'localhost';
} else {
    DB = 'mongo';
}

const customerRepository = new CustomerRepository(DB, "27017");

app.get('/githubUsers', async (req, res) => {
    retrieveGithubUsers()
        .then(users => res.json(users))
        .catch(() => res.sendStatus(500))
});

app.post('/addUser', async (req, res) => {
   customerRepository.insert(req.body)
       .then(() => res.sendStatus(204))
       .catch(e => {
           console.log(e);
           res.sendStatus(500)
       })
});

app.get('/findUser', async (req, res) => {
    customerRepository.query(req.query.name).then(user => {
        if (notFound(user)) {
            res.sendStatus(404);
        } else {
            res.send(adaptResponse(user));
        }
    }).catch(e => {
        console.log("Something went wrong trying to find user", e);
    });
});

const notFound = (user) => user === null

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

