const { findUser } = require("./FindUser")

describe('FindUser', () => {
    it('finds the user and returns it', () => {
        let user = findUser(1, [
            {id: 1, name: 'Davide', email: 'email1'},
            {id: 2, name: 'Sergio', email: 'email2'}
        ]);

        expect(user).toEqual({id: 1, name: 'Davide', email: 'email1'});
    })

    it('returns undefined if user not found', () => {
        let user = findUser(3, [
            {id: 1, name: 'Davide', email: 'email1'},
            {id: 2, name: 'Sergio', email: 'email2'}
        ]);

        expect(user).toEqual(undefined);
    })
})