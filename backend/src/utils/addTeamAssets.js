const competitionAssets = {
  UCL: '/src/assets/leagueLogos/ucl-logo.svg',
  UEL: '/src/assets/leagueLogos/uel-logo.svg',
  UECL: '/src/assets/leagueLogos/uecl-logo.svg'
}

export function addTeamAssets(homeTeam, awayTeam){
  let competitionLogo;

  if(homeTeam.competition === awayTeam.competition){
    competitionLogo = competitionAssets[homeTeam.competition]
  } 

  return { homeTeam, awayTeam, competitionLogo }
}