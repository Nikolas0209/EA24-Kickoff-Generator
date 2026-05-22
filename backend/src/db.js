import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
let db = null;

export async function connectDB(){
  try{
    if(db){
      return db
    }

    await client.connect();
    console.log('Connect to MongoDB');

    db = client.db('EAkickoffGenerator');
    return db;
  } catch(error){
    console.error('Backend connection failed', error);
    throw error;
  }
};