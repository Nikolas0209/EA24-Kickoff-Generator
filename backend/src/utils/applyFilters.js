function applyFilters(teams, {competition, leagueId}){
  if(competition){
   return teams.filter(team => team.competition?.toUpperCase() === competition.toUpperCase());
  }else if(leagueId){
   return teams.filter(team => team.league === leagueId)
  }else {
    return teams;
  }
} 


export default applyFilters;