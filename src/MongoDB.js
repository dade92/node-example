import {MongoClient} from "mongodb";


export const printDatabases = async () => {

    const uri = "mongodb://root:password@localhost:27017/test?authSource=admin";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }

}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};