import express from 'express';
import getCollection from '../utils/getCollection.js';
import getRandomTeam from '../utils/getRandomTeam.js';
import getRandomTeamByRating from '../utils/getRandomTeamByRating.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const teams = await getCollection('countries');

    if(teams.length < 2){
      return res.status(400).json({error: 'Not enough teams'})
    }

    const homeTeam = getRandomTeam(teams);

    const availableTeams = teams.filter(team => !team._id.equals(homeTeam._id));
    const awayTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)]; 

    const kickOffTeams = {
      homeTeam,
      awayTeam
    }

    res.status(200).json(kickOffTeams);
  } catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/country-ratings', async (req, res) => {
  try{
    const teams = await getCollection('countries');

    if(teams.length < 2){
      return res.status(400).json({error: 'Not enough teams'})
    }

    const homeTeam = getRandomTeam(teams);
    const awayTeam = getRandomTeamByRating(teams, homeTeam);

    const kickOffTeams = {
      homeTeam,
      awayTeam
    };

    res.status(200).json(kickOffTeams);
  }catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/random-team/reroll', async (req, res) => {
  try{
    const { baseTeamId } = req.query;
    const teams = await getCollection('countries');

    const baseTeam = teams.find(team => team._id.equals(baseTeamId));

    if(!baseTeam){
      return res.status(404).json({error: 'Base team not found'})
    }
 
    if(teams.length < 1){
      return res.status(400).json({error: 'Not enough teams'})
    }

    const newTeam = getRandomTeam(teams, baseTeam._id);

    res.status(200).json({team: newTeam});
  } catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/country-ratings/reroll', async (req, res) => {
 try{
  const { baseTeamId } = req.query;
  const teams = await getCollection('countries');

  const baseTeam = teams.find(team => team._id.equals(baseTeamId));

  if(!baseTeam){
   return res.status(404).json({error: 'Base team not found'})
  }

  if(teams.length < 1){
   return res.status(400).json({error: 'Not enough teams'})
  }

  const newTeam = getRandomTeamByRating(teams, baseTeam._id);

  res.status(200).json({team: newTeam});
 } catch(error){
  res.status(500).json({error: 'The kick-off could not be generated'});
 }
});

export default router;
