import {MongoClient} from "mongodb";

export class CustomerRepository {

    constructor(host, port) {
        const uri = `mongodb://root:password@${host}:${port}?authSource=admin`;
        this.mongoClient = new MongoClient(uri);
        this.client = this.mongoClient.db('test').collection('mongocustomer');
    }

    async query(name) {
        const query = {name: name};

        const result = await this.client.findOne(query);

        if (result) {
            console.log(`Found one user with name ${name}:`);
            console.log(result);
        } else {
            console.log(`No users found`);
        }
        return result
    }

    async insert(customer) {
        const oldUser =  await this.query(customer.name)
        if(oldUser === null) {
            await this.client.insertOne(customer, (err, result) => {
                if (err) throw err;
                console.log("1 document inserted");
            })
        } else {
            throw new Error("User already existing");
        }
    }


}
