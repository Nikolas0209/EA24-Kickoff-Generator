import express from 'express';
import getCollection from '../utils/getCollection.js';
import getRandomTeam from '../utils/getRandomTeam.js';
import getRandomTeamByRating from '../utils/getRandomTeamByRating.js';
import applyFilters from '../utils/applyFilters.js';
import { addTeamAssets, addRerollAssets } from '../utils/addTeamAssets.js';

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
      const awayTeam = getRandomTeam(teamsAway, homeTeam._id);

      const { homeTeam: enrichedHomeTeam, awayTeam: enrichedAwayTeam, homeLeagueLogo, awayLeagueLogo } = addTeamAssets(homeTeam, awayTeam);

     const kickOffTeams = {
       homeTeam: enrichedHomeTeam,
       awayTeam: enrichedAwayTeam,
       homeLeagueLogo,
       awayLeagueLogo
      }

      return res.status(200).json(kickOffTeams);
    };

    if(teams.length < 2){
      return res.status(400).json({error: 'Not enough teams'});
    }

    const homeTeam = getRandomTeam(teams);
    const awayTeam = getRandomTeam(teams, homeTeam._id);

    const { homeTeam: enrichedHomeTeam, awayTeam: enrichedAwayTeam, competitionLogo, homeLeagueLogo, awayLeagueLogo } = addTeamAssets(homeTeam, awayTeam);

    const kickOffTeams = {
      homeTeam: enrichedHomeTeam, 
      awayTeam: enrichedAwayTeam,
      competitionLogo,
      homeLeagueLogo,
      awayLeagueLogo
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
   const { competition, leagueId, baseTeamId } = req.query;
   let teams = await getCollection('clubs');
 
   const baseTeam = teams.find(team => team._id.equals(baseTeamId));

   if(!baseTeam){
    return res.status(404).json({error: 'Base team not found'})
   }

   teams = applyFilters(teams, { competition, leagueId });  

   if(teams.length < 1){
    return res.status(400).json({error: 'Not enough teams'});
   }

   const team = getRandomTeam(teams, baseTeam._id);  
   const { team: newTeam, competitionLogo, leagueLogo } = addRerollAssets(team, baseTeam, leagueId);

   res.status(200).json({
    team: newTeam, 
    competitionLogo,
    leagueLogo
   });

  }catch(error){
    res.status(500).json({error: 'The kick-off could not be generated'});
  }
});

router.get('/club-ratings/reroll', async (req, res) => {
  try{
    const { baseTeamId } = req.query;
    const teams = await getCollection('clubs');
  
    const baseTeam = teams.find(team => team._id.equals(baseTeamId));
   
    if(!baseTeam){
      return res.status(404).json({error: 'Base team not found'});
    }

    if(teams.length < 1){
     return res.status(400).json({error: 'Not enough teams'});
    }

    const newTeam = getRandomTeamByRating(teams, baseTeam);

    res.status(200).json({team: newTeam});
  } catch(error){
   res.status(500).json({error: 'The kick-off could not be generated'});
  }

});

router.get('/leagues', async (req, res) => {
 try{
  const teams = await getCollection('clubs');

  const leagues = teams.map(team => ({
    league: team.leagueName,
    leagueId: team.league
  }))

  const uniqueLeagues = leagues.reduce((uniqueLeagues, currentLeague) => {
   const leagueExists = uniqueLeagues.some(league => currentLeague.leagueId === league.leagueId);

   if(leagueExists){
     return uniqueLeagues;
   } else {
     uniqueLeagues.push(currentLeague);
   }
    
   return uniqueLeagues;
  }, [])

  const sortedClubs = uniqueLeagues.sort((a, b) => {
    const aStartsWithNumber = !isNaN(Number(a.league[0]));
    const bStartsWithNumber = !isNaN(Number(b.league[0]));

    if(aStartsWithNumber && !bStartsWithNumber){
     return 1
    } else if (!aStartsWithNumber && bStartsWithNumber){
     return -1
    } else {
     return a.league.localeCompare(b.league);
    }
  });
  
  res.status(200).json(sortedClubs);

 } catch(error){
  res.status(500).json({error: 'Could not fetch the leagues'});
 };

});

export default router;

