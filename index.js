const express = require('express');
const users = require("./Users");
const { findUser } = require('./FindUser');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

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
    users.push(req.body);

    return res.sendStatus(204);

});

app.get('/findUser/:id', (req, res) => {
    let user = findUser(req.params.id, users);

    if(user !== undefined) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

