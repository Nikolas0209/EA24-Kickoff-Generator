import express from 'express';
import { connectDB } from '../db.js';

const router = express.Router();

async function getKickoffCollection(){
 const db = await connectDB();
 return db.collection('kickoff-history');
};

router.post('/', async (req, res) => {
 try{
  const {homeTeam, awayTeam, type } = req.body;
  ///let history = await getCollection('kickoff-history');
  const history = await getKickoffCollection();

  if(!homeTeam || !awayTeam || !type){
   return res.status(400).json({error: 'Missing required kickoff data.'});
  }

  const kickoff = { homeTeam, awayTeam, type };
  await history.insertOne(kickoff);

  res.status(201).json({kickoff});
 } catch(error){
 // res.status(500).json({error: 'The kickoff history can not be reached'})
 console.log(error);
 res.status(500).json({error: error.message});
 }
});

export default router;