import type { ClubKickoff } from "../types/clubTypes/clubKickoff.type"
import type { ClubTeam } from "../types/clubTypes/clubTeam.type";
import type { CountryKickoff } from "../types/internationalTypes/countryKickoff.type"
import type { UITeam } from '../types/uiTeam.types';
import type { InternationalTeam } from "../types/internationalTypes/internationalTeam.type";

export function createKickoffUI(kickoff: CountryKickoff | ClubKickoff | null){
  const getLogoPath = (logo: string) => `/assets${logo}.svg`;
  
  if(!kickoff){
    return {homeTeam: null, awayTeam: null};
  }

  function normaliseTeam(team: ClubTeam | InternationalTeam): UITeam {
    return {
      id: team._id,
      name: 'club' in team ? team.club : team.country, 
      logo: getLogoPath(team.logo),
      stars: team.stars,
      type: 'club' in team ? 'club' : 'international',
      league: 'club' in team ? team.leagueName : undefined,
      leagueId: 'club' in team ? team.league : undefined
    }
  }
  
  return {
    homeTeam: normaliseTeam(kickoff.homeTeam), 
    awayTeam: normaliseTeam(kickoff.awayTeam)
  }
}




