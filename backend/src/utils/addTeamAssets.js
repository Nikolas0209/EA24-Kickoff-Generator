const competitionAssets = {
  UCL: '/leagueLogos/ucl_logo.svg',
  UEL: '/leagueLogos/uel_logo.svg',
  UECL: '/leagueLogos/uecl_logo.svg'
}

const leagueAssets = {
 'a-league': '/leagueLogos/a_league_logo.svg',
 'allsvenskan': '/leagueLogos/allsvenskan_logo.svg',
 'austrian-bundesliga': '/leagueLogos/austrian_bundesliga_logo.svg',
 'bundesliga': '/leagueLogos/bundesliga_logo.svg',
 'bundesliga-2': '/leagueLogos/bundesliga2_logo.svg',
 'championship': '/leagueLogos/championship_logo.svg',
 'chinese-super-league': '/leagueLogos/chinese_super_league_logo.svg',
 'danish-superliga': '/leagueLogos/danish_superliga_logo.svg',
 '3-liga': '/leagueLogos/dritte_liga_logo.svg',
 'ekstraklasa': '/leagueLogos/ekstraklasa_logo.svg',
 'eliteserien': '/leagueLogos/eliteserien_logo.svg',
 'eredivisie': '/leagueLogos/eredivisie_logo.svg',
 'indian-super-league': '/leagueLogos/indian_super_league_logo.svg',
 'k-league-1': '/leagueLogos/k_league1_logo.svg',
 'laliga': '/leagueLogos/laliga_logo.svg',
 'laliga2': '/leagueLogos/laliga2_logo.svg',
 'league-one': '/leagueLogos/league_one_logo.svg',
 'league-two': '/leagueLogos/league_two_logo.svg',
 'liga-portugal': '/leagueLogos/liga_portugal_logo.svg',
 'liga-profesional-de-futbol': '/leagueLogos/liga_profesional_de_futbol_logo.svg',
 'ligue-1': '/leagueLogos/ligue1_logo.svg',
 'ligue-2': '/leagueLogos/ligue2_logo.svg',
 'mls': '/leagueLogos/mls_logo.svg',
 'premier-division': '/leagueLogos/premier_division_logo.svg',
 'premier-league': '/leagueLogos/premier_league_logo.svg',
 'belgian-pro-league': '/leagueLogos/pro_league_logo.svg',
 'rest-of-world': '/leagueLogos/rest_of_world_logo.svg',
 'saudi-pro-league': '/leagueLogos/saudi_pro_league_logo.svg',
 'scottish-premiership': '/leagueLogos/scottish_premiership_logo.svg',
 'serie-a': '/leagueLogos/seriea_logo.svg',
 'serie-b': '/leagueLogos/serieb_logo.svg',
 'super-lig': '/leagueLogos/super_lig_logo.svg',
 'superliga': '/leagueLogos/super_liga_romaniei_logo.svg',
 'swiss-super-league': '/leagueLogos/swiss_super_league_logo.svg'
}

export function addTeamAssets(homeTeam, awayTeam){
  let competitionLogo;
  let homeLeagueLogo;
  let awayLeagueLogo;

  if(homeTeam.competition === awayTeam.competition){
    competitionLogo = competitionAssets[homeTeam.competition];
  } 

  homeLeagueLogo = leagueAssets[homeTeam.league];
  awayLeagueLogo = leagueAssets[awayTeam.league];

  return { homeTeam, awayTeam, competitionLogo, homeLeagueLogo, awayLeagueLogo }
}

export function addRerollAssets(team, baseTeam, league){
  let competitionLogo;
  let leagueLogo;
  
  if(team.competition === baseTeam.competition){
    competitionLogo = competitionAssets[team.competition]
  }

  if(team.league === league){
   leagueLogo = leagueAssets[team.league]
  }
  
  return { team, competitionLogo, leagueLogo }
}