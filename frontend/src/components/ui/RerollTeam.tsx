import './RerollTeam.css';
import { getRequest } from '../../api/getRequest';
import type { TeamReroll } from '../../types/teamReroll.type';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../data/createKickoffUI';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';

type Reroll = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setKickoff: React.Dispatch<React.SetStateAction<ClubKickoff | CountryKickoff>>;
  rerollEndpoint: string;
  kickoff: CountryKickoff | ClubKickoff;
  competition?: string;
}

function RerollTeam({ setIsSubmitted, setKickoff, kickoff, rerollEndpoint, competition }: Reroll){
 const fetchOneTeam = (excludeId: string, leagueId?:string ) => {
 
  let query = `reroll?baseTeamId=${excludeId}`;

  if(competition){
    query = `reroll?competition=${competition}&baseTeamId=${excludeId}`;
  } else if(leagueId){
    query = `reroll?leagueId=${leagueId}&baseTeamId=${excludeId}`;
  }
  
  return getRequest<TeamReroll>(`${rerollEndpoint}/${query}`);
 };

 const {homeTeam, awayTeam} = createKickoffUI(kickoff);

 const rerollHome = async (): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = awayTeam.id;
  const rerolledTeam = await fetchOneTeam(excludeId, homeTeam.leagueId);

  setKickoff(prev => {
    if (!prev) return prev;

    return{
      ...prev,
      homeTeam: rerolledTeam.team
    } as typeof prev;
  });
 };

 const rerollAway = async(): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = homeTeam.id;
  const rerolledTeam = await fetchOneTeam(excludeId, awayTeam.leagueId);

  setKickoff((prev) => {
    if(!prev) return prev;

    return{
      ...prev,
      awayTeam: rerolledTeam.team
    } as typeof prev
  })
 };

 return(
  <div className="reroll-div">
    <button className="reroll-button" onClick={rerollHome}>
      Reroll team
    </button>
    <button className="reroll-button" onClick={rerollAway}>
      Reroll team
    </button>
  </div>
 )
}

export default RerollTeam;