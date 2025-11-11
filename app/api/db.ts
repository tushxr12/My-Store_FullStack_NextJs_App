import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient : MongoClient | null = null;
let cachedDb : any | null = null;

export async function connectToDatabase() {

    if(cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb};
    }
    
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@my-store-cluster.xj8ip4g.mongodb.net/?appName=my-store-cluster`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    cachedClient = client;
    cachedDb = client.db('my-store-db');
    return {client, db: client.db('my-store-db')};
}