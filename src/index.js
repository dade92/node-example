import {adaptResponse} from "./Users.js";
import {retrieveGithubUsers} from './FetchGithubUsers.js';
import {app, customerRepository} from "./config.js";

const PORT = process.env.PORT || 8080;

app.get('/githubUsers', async (req, res) => {
    retrieveGithubUsers()
        .then(users => res.json(users))
        .catch(() => res.sendStatus(500))
});

app.get('/test', async (req, res) => {
    res.send({message: "Hey!"})
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

