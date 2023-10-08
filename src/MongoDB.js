import {MongoClient} from "mongodb";

const uri = "mongodb://root:password@localhost:27017/test?authSource=admin";

const client = new MongoClient(uri);

const customerClient = client.db('test').collection('mongocustomer');


export class CustomerRepository {

    constructor(host, port) {
        const uri = `mongodb://root:password@${host}:${port}?authSource=admin`;
        this.client = new MongoClient(uri).db('test').collection('mongocustomer');
    }

    async query(name) {
        const query = {name: name};

        const result = await customerClient.findOne(query);

        if (result) {
            console.log(`Found one user with name ${name}:`);
            console.log(result);
        } else {
            console.log(`No users found`);
        }
        return result
    }

    async insert(customer) {
        await customerClient.insertOne(customer, (err, result) => {
            if (err) throw err;
            console.log("1 document inserted");
        })
    }


}

export const initConnection = async () => {
    try {
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const query = async (name) => {
    const query = {name: name};

    const result = await customerClient.findOne(query);

    if (result) {
        console.log(`Found one user with name ${name}:`);
        console.log(result);
    } else {
        console.log(`No users found`);
    }
    return result
}

export const insert = async (customer) => {
    await customerClient.insertOne(customer, (err, result) => {
        if (err) throw err;
        console.log("1 document inserted");
    })
}

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};