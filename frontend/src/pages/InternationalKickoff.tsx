import './InternationalKickoff.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { KickoffType } from '../enums/kickoffType.enum';
import type { RerollTeam } from '../types/rerollTeam.type';
import BackNavigationButton from '../components/ui/BackNavigationButton';
import { useKickoff } from '../hooks/useKickoff';
import { getRequest } from '../api/getRequest';
import TeamCard from '../components/ui/TeamCard';

function InternationalKickoff(){
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

 const { kickoff, setKickoff, fetchKickoff } = useKickoff('/api/countries');
 
 const fetchOneCountry = async (excludeId: string) => {
  return getRequest<RerollTeam>(`/api/countries/random-team/reroll?baseTeamId=${excludeId}`);
 };
 
 useEffect(() => {
  if(!isSubmitted) return;

  const timer = setTimeout (() => {
    setIsSubmitted(false);
  }, 3000)

  return () => clearTimeout(timer)
 }, [isSubmitted]);

 const generateKickOff = async (): Promise<void> => {
  try{
    await fetchKickoff();
    setIsSubmitted(false);
  } catch(error){
    console.log('The kickoff could not be generated', error)
  }
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

 const isSubmittedButton = async(): Promise<void> => {
  if(isSubmitted) return;
 
  try{
   await axios.post('/api/kickoff-history', {
     homeTeam: kickoff.homeTeam.country,
     awayTeam: kickoff.awayTeam.country,
     type: KickoffType.INTERNATIONAL
   }) 
  
    setIsSubmitted(true);
  } catch(error){
    console.log('The kickoff could not be submitted', error)
  } 
 };

 return(
  <>
   <BackNavigationButton/>

   {kickoff && (
     <div className="kickoff-container" key={kickoff.homeTeam._id}>
       <TeamCard team={kickoff.homeTeam}/>
       
       <div className="kickoff-center">
        <button className="generate-button" onClick={generateKickOff}>
          GENERATE
        </button>
        <button className="submit-button" onClick={isSubmittedButton}>
          {isSubmitted ? 'Submitted' : 'Submit Kickoff'}
        </button>
       </div>

       <TeamCard team={kickoff.awayTeam}/>
     </div>
      )
     }

     <div className="reroll-div">
       <button className="reroll-button" onClick={rerollHome}>
         Reroll team
       </button>
       <button className="reroll-button" onClick={rerollAway}>
         Reroll team
       </button>
     </div>
  </>
 )
}

export default InternationalKickoff;