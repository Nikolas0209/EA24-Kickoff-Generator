import express from 'express';
import getCollection from '../utils/getCollection.js';
import getRandomTeam from '../utils/getRandomTeam.js';
import getRandomTeamByRating from '../utils/getRandomTeamByRating.js';
import applyFilters from '../utils/applyFilters.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const { competition, league, homeLeague, awayLeague } = req.query; 
    let teams = await getCollection('clubs');
    teams = applyFilters(teams, {competition, league});

    if(homeLeague && awayLeague){
      let teamsHome = teams.filter(team => team.league === homeLeague);
      let teamsAway = teams.filter(team => team.league === awayLeague);

      if(teamsHome.length < 1 || teamsAway.length < 1){
       return res.status(400).json({error: 'Not enough teams in one of the leagues'});
      }

      const homeTeam = getRandomTeam(teamsHome);
      const awayTeam = getRandomTeam(teamsAway);

      const kickOffTeams = {
       homeTeam,
       awayTeam
      }

      return res.status(200).json(kickOffTeams);
    };

    if(teams.length < 2){
      return res.status(400).json({error: 'Not enough teams'});
    }

    const homeTeam = getRandomTeam(teams);
    const awayTeam = getRandomTeam(teams, homeTeam._id);

    const kickOffTeams = {
      homeTeam,
      awayTeam
    };

    res.status(200).json(kickOffTeams);
  }catch(error){
   res.status(500).json({error: 'The kick-off could not be generated.'});
  }
});

router.get('/club-ratings', async (req, res) => {
  try{
    const teams = await getCollection('clubs');

    if(teams.length < 2){
      return res.status(400).json({error: 'Not enough teams'});
    };

    const homeTeam = getRandomTeam(teams);
    const awayTeam = getRandomTeamByRating(teams, homeTeam);

    const kickOffTeams = {
      homeTeam,
      awayTeam
    }

    res.status(200).json(kickOffTeams);
  }catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/random-team/reroll', async (req, res) => {
  try{
   const { competition, league, excludeId } = req.query;
   let teams = await getCollection('clubs');
   teams = applyFilters(teams, { competition,league });

   if(teams.length < 1){
    return res.status(400).json({error: 'Not enough teams'});
   }

   const newTeam = getRandomTeam(teams, excludeId);

   res.status(200).json({newTeam});
  }catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/club-ratings/reroll', async (req, res) => {
  try{
    const { baseTeamId } = req.query;
    let teams = await getCollection('clubs');
  
    const baseTeam = teams.find(team => team._id.equals(baseTeamId));
   
    if(!baseTeam){
      return res.status(404).json({error: 'Base team not found'});
    }

    if(teams.length < 1){
     return res.status(400).json({error: 'Not enough teams'});
    }

    const newTeam = getRandomTeamByRating(teams, baseTeam);

    res.status(200).json({newTeam});
  } catch(error){
   res.status(500).json({error: 'The kickoff could not be generated'});
  }
});

export default router;

