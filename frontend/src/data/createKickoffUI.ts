import type { ClubKickoff } from "../types/clubTypes/clubKickoff.type"
import type { CountryKickoff } from "../types/internationalTypes/countryKickoff.type"
import type { UITeam } from '../types/uiTeam.types';

export function createKickoffUI(kickoff: CountryKickoff | ClubKickoff | null){

  const getLogoPath = (logo: string) => {
    return`/assets${logo}.svg`
  };

  if(!kickoff){
    return {homeTeam: null, awayTeam: null};
  }
  
  const home = kickoff.homeTeam;
  const away = kickoff.awayTeam;

  const homeTeam: UITeam = {
    id: home._id,
    name: 'club' in home ? home.club : home.country,
    logo: getLogoPath(home.logo),
    stars: kickoff.homeTeam.stars,
    type: 'club' in home ? 'club' : 'international', 
    league: 'club' in home ? home.leagueName : undefined,
    leagueId: 'club' in home ? home.league : undefined
  }
 
  const awayTeam: UITeam = {
    id: away._id,
    name: 'club' in away ? away.club : away.country, 
    logo: getLogoPath(away.logo),
    stars: kickoff.awayTeam.stars,
    type: 'club' in away ? 'club' : 'international',
    league: 'club' in away ? away.leagueName : undefined,
    leagueId: 'club' in away ? away.league : undefined
  }

  return {homeTeam, awayTeam}
}



