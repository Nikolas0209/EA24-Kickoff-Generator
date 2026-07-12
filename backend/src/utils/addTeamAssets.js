const competitionAssets = {
  UCL: '/leagueLogos/ucl_logo.svg',
  UEL: '/leagueLogos/uel_logo.svg',
  UECL: '/leagueLogos/uecl_logo.svg'
}

export function addTeamAssets(homeTeam, awayTeam){
  let competitionLogo;

  if(homeTeam.competition === awayTeam.competition){
    competitionLogo = competitionAssets[homeTeam.competition]
  } 

  return { homeTeam, awayTeam, competitionLogo }
}

export function addRerollAssets(team, baseTeam){
  let competitionLogo;

  if(team.competition === baseTeam.competition){
    competitionLogo = competitionAssets[team.competition]
  }

  return { team, competitionLogo }
}