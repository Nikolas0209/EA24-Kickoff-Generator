import './RerollTeam.css';
import { getRequest } from '../../api/getRequest';
import type { TeamReroll } from '../../types/teamReroll.type';
import type { CountryKickoff } from '../../types/countryKickoff.type';

type Props = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setKickoff: React.Dispatch<React.SetStateAction<CountryKickoff | null>>;
  kickoff: CountryKickoff;
  rerollEndpoint: string
}

function RerollTeam({ setIsSubmitted, setKickoff, kickoff, rerollEndpoint }: Props){

 const fetchOneCountry = async (excludeId: string) => {
    return getRequest<TeamReroll>(`${rerollEndpoint}/reroll?baseTeamId=${excludeId}`);
 };

 const rerollHome = async(): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = kickoff.awayTeam._id;
  const country = await fetchOneCountry(excludeId);
  
  setKickoff((prev) => ({
    ...prev,
    homeTeam: country.team   
  }))
 };

 const rerollAway = async(): Promise<void> => {
  setIsSubmitted(false);
  const excludeId = kickoff.homeTeam._id;
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