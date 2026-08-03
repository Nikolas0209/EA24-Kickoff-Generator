import './KickoffActions.css';
import { useEffect } from 'react';
import { KickoffType } from '../../enums/kickoffType.enum';
import axios from 'axios';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../data/createKickoffUI';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';

type KickoffActionsProps = {
 isSubmitted: boolean,
 kickoff: CountryKickoff | ClubKickoff,
 fetchKickoff: () => Promise<void>,
 setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
 kickoffType: KickoffType,
 generateLeagueKickoff?: () => Promise<void>
}

function KickoffActions({ isSubmitted, setIsSubmitted, kickoff, fetchKickoff, kickoffType, generateLeagueKickoff }: KickoffActionsProps){
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);

  useEffect(() => {
    if(!isSubmitted) return;
  
    const timer = setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  
    return () => clearTimeout(timer);
   }, [isSubmitted]);

  const generateKickOff = async (): Promise<void> => {
    try{
      if(generateLeagueKickoff){
       await generateLeagueKickoff();
      } else {
        await fetchKickoff();
      }
      setIsSubmitted(false);
    } catch(error){
      console.log('The kickoff could not be generated', error)
    }
  }; 
  
  const submitKickoff = async(): Promise<void> => {
    if(isSubmitted) return;
   
    try{
     await axios.post('/api/kickoff-history', {
       homeTeam: homeTeam.name,
       awayTeam: awayTeam.name,
       kickoffType
     }) 
    
      setIsSubmitted(true);
    } catch(error){
      console.log('The kickoff could not be submitted', error)
    } 
  };

  return(
    <div className="kickoff-center">
      <button className="action-button" onClick={generateKickOff}>
        GENERATE
      </button>
      <button className="action-button" onClick={submitKickoff}>
        {isSubmitted ? 'Submitted' : 'Submit Kickoff'}
      </button>
    </div>
  )
}

export default KickoffActions;