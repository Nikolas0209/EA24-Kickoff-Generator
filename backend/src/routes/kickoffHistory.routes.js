import express from 'express';
import { connectDB } from '../db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

async function getKickoffCollection(){
 const db = await connectDB();
 return db.collection('kickoff-history');
};

router.get('/', async (req, res) => {
 try{
  const { type } = req.query;

  let query = {};
  if(type){
    query.type = type;
  }
 
  const collection = await getKickoffCollection();
  const kickoffHistory = await collection.find(query).toArray();

  res.status(200).json(kickoffHistory);
 }catch(error){
  res.status(500).json({error: 'Failed to fetch kick-off history'})
 }
});

router.post('/', async (req, res) => {
 try{
  const { homeTeam, awayTeam, type } = req.body;
  const collection = await getKickoffCollection();

  if(!homeTeam || !awayTeam || !type){
   return res.status(400).json({error: 'Missing required kick-off data'})
  };

  const kickoff = {
   homeTeam, 
   awayTeam, 
   type, 
   createdAt: new Date()
  };
  await collection.insertOne(kickoff);

  res.status(201).json({kickoff});
 } catch(error){
  res.status(500).json({error: 'Failed to create kick-off'});
 }
});

router.delete('/', async (req, res) => {
 try{
  const collection = await getKickoffCollection();
  await collection.deleteMany({});

  res.status(204).send();
 }catch(error){
  res.status(500).json({error: 'Failed to delete kick-off history'});
 }
});

router.delete('/:id', async (req,res) => {
 try{
  const collection = await getKickoffCollection();
  const kickoffId = req.params.id;

  if(!ObjectId.isValid(kickoffId)){
    return res.status(400).json({ error: 'Invalid kick-off id format' })
  }
 
  const kickoffIdObject = new ObjectId(kickoffId);
  const deleteOneKickoff =  await collection.deleteOne({_id: kickoffIdObject});

  if(!deleteOneKickoff.deletedCount){
    return res.status(404).json({error:'The kick-off could not be found'})
  };

  res.status(204).send();
 } catch(error){
  res.status(500).json({error: 'The kick-off could not be deleted'});
 }
});

export default router;

