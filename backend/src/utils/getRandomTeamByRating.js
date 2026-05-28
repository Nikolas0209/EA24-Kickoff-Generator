import getRandomTeam from './getRandomTeam.js';

function getRandomTeamByRating(teams, baseTeam){
  const getAllRatings = teams.map(team => team.stars);
  const lowestStarsTeam = Math.min(...getAllRatings); 

  const maxRating = baseTeam.stars + 1;
  const minRating = Math.max(baseTeam.stars - 1, lowestStarsTeam);

  const teamRating = teams.filter(team => team.stars >= minRating && team.stars <= maxRating);
  const excludeId = baseTeam._id;

  return getRandomTeam(teamRating, excludeId);
};

export default getRandomTeamByRating;