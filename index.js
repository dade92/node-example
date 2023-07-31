const express = require('express');
let users = require("./Users");

const PORT = process.env.PORT || 3000;

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
    let user = users.filter((u) => u.id === parseInt(req.params.id));

    if(user[0] !== undefined) {
        res.send(user[0]);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

