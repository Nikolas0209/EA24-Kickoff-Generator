import './RerollTeam.css';
import { getRequest } from '../../api/getRequest';
import type { TeamReroll } from '../../types/teamReroll.type';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../utils/createKickoffUI';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';

type Reroll = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setKickoff: React.Dispatch<React.SetStateAction<ClubKickoff | CountryKickoff>>;
  rerollEndpoint: string;
  kickoff: CountryKickoff | ClubKickoff;
  competition?: string;
  mode?: 'club-league';
}

type TeamSide = 'home' | 'away';

function RerollTeam({ setIsSubmitted, setKickoff, kickoff, rerollEndpoint, competition, mode }: Reroll){
 const fetchOneTeam = (excludeId: string, leagueId?: string ) => {
  let query = `reroll?baseTeamId=${excludeId}`;
  
  if(competition){
    query = `reroll?competition=${competition}&baseTeamId=${excludeId}`;
  } else if(mode){
    query = `reroll?leagueId=${leagueId}&baseTeamId=${excludeId}`;  
  }
  
  return getRequest<TeamReroll>(`${rerollEndpoint}/${query}`);
 };

 const {homeTeam, awayTeam} = createKickoffUI(kickoff);

 const rerollTeam = async (side: TeamSide): Promise<void> => {
   setIsSubmitted(false);
   const excludeId = side === 'home' ? awayTeam.id : homeTeam.id;
   const rerolledLeague = side === 'home' ? homeTeam.leagueId : awayTeam.leagueId;

   const rerolledTeam = await fetchOneTeam(excludeId, rerolledLeague);

    setKickoff((prev) => {
      if(!prev) return;

      if(side === 'home'){
        return{
          ...prev,
          homeTeam: rerolledTeam.team
        } as typeof prev
      } else {
        return{
          ...prev,
          awayTeam: rerolledTeam.team,
        } as typeof prev
      }
   })
 };

 return(
  <div className="reroll-div">
    <button className="reroll-button" onClick={() => rerollTeam('home')}>
      Reroll team
    </button>
    <button className="reroll-button" onClick={() => rerollTeam('away')}>
      Reroll team
    </button>
  </div>
 )
}

export default RerollTeam;