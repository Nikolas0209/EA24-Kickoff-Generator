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
 
  const history = await getKickoffCollection();
  const kickoffHistory = await history.find(query).toArray();

  res.status(200).json({kickoffHistory});
 }catch(error){
  res.status(500).json({error: 'The kickoff history can not be reached.'})
 }
});

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

router.delete('/', async (req, res) => {
 try{
  const history = await getKickoffCollection();
  const deleteAllData = await history.deleteMany({});

  res.status(200).json({
    message: 'All kickoffs deleted successfully',
    deletedCount: deleteAllData.deletedCount
  });
 }catch(error){
  res.status(500).json({error: 'Can not delete all history. Please try again later.'});
 }
});

router.delete('/:id', async (req,res) => {
 try{
  const history = await getKickoffCollection();
  const kickoffId = req.params.id;
 
  const kickoffIdObject = new ObjectId(kickoffId);
  const deleteOneKickoff =  await history.deleteOne({_id: kickoffIdObject});

  if(!deleteOneKickoff.deletedCount){
    res.status(404).json({error:'The kickoff could not be found'});
    return
  };

  res.status(200).json({
   message: 'Kickoff deleted successfully',
   deletedCount: deleteOneKickoff.deletedCount
  });
 } catch(error){
  res.status(500).json({error: 'Kickoff can not be deleted.'});
 }
});

export default router;