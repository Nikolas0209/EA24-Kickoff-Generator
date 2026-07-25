import { connectDB } from '../db.js';

async function getCollection(name){
  const db = await connectDB();
  const collection = db.collection(name);

  return await collection.find().toArray();
};

export default getCollection;