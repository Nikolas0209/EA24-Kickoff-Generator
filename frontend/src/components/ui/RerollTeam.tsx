import './RerollTeam.css';
import { getRequest } from '../../api/getRequest';
import type { TeamReroll } from '../../types/teamReroll.type';
import type { Kickoff } from '../../types/kickoff.type';

type Props = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setKickoff: React.Dispatch<React.SetStateAction<Kickoff | null>>;
  team: Kickoff;
}

function RerollTeam({ setIsSubmitted, setKickoff, team }: Props){

 const fetchOneCountry = async (excludeId: string) => {
    return getRequest<TeamReroll>(`/api/countries/random-team/reroll?baseTeamId=${excludeId}`);
 };

 const rerollHome = async(): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = team.awayTeam._id;
  const country = await fetchOneCountry(excludeId);
  
  setKickoff((prev) => ({
    ...prev,
    homeTeam: country.team   
  }))
 };

 const rerollAway = async(): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = team.homeTeam._id;
  const country = await fetchOneCountry(excludeId);

  setKickoff((prev) => ({
    ...prev,
    awayTeam: country.team
  }))
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