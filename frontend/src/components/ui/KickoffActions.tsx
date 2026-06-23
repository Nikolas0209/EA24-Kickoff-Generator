import './KickoffActions.css';
import { useEffect } from 'react';
import { KickoffType } from '../../enums/kickoffType.enum';
import axios from 'axios';
import type { Kickoff } from '../../types/kickoff.type';

type Actions = {
 isSubmitted: boolean,
 kickoff: Kickoff,
 fetchKickoff: () => Promise<void>,
 setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

function KickoffActions({ isSubmitted, setIsSubmitted, kickoff, fetchKickoff }: Actions){

  useEffect(() => {
    if(!isSubmitted) return;
  
    const timer = setTimeout(() => {
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
    <div className="kickoff-center">
      <button className="generate-button" onClick={generateKickOff}>
        GENERATE
      </button>
      <button className="submit-button" onClick={isSubmittedButton}>
        {isSubmitted ? 'Submitted' : 'Submit Kickoff'}
      </button>
    </div>
  )
}

export default KickoffActions;