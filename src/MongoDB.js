import {MongoClient} from "mongodb";

const uri = "mongodb://root:password@localhost:27017/test?authSource=admin";

const client = new MongoClient(uri);

export const initConnection = async () => {
    try {
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }

}

export const query = async (name) => {
    var query = {name: name}

    const result = await client.db('test').collection('mongocustomer').findOne(query);

    if (result) {
        console.log(`Found one user with name ${name}:`);
        console.log(result);
    } else {
        console.log(`No users found`);
    }
}

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};