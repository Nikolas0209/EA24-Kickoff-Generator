function applyFilters(teams, {competition, league}){
  if(competition){
   return teams.filter(team => team.competition?.toUpperCase() === competition.toUpperCase());
  }else if(league){
   return teams.filter(team => team.league === league);
  }else {
    return teams;
  }
} 

export default applyFilters;