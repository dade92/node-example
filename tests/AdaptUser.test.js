import {adaptBody} from "../src/Users.js";
import expect from "expect";

describe('AdaptUser', () => {
    it('adapt correctly', () => {
        const actual = adaptBody({name: 'ciccio', email: 'pasticio@gmail.com'})

        expect(actual).toEqual({id: 5, name: 'ciccio', email: 'pasticio@gmail.com'})
    })
});