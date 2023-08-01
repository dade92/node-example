findUser = (id, users) => {
    let user = users.filter((u) => u.id === parseInt(id));

    if(user[0] !== undefined) {
        return user[0];
    } else {
        return undefined
    }
}

module.exports = {findUser};