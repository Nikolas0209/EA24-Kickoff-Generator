import './InternationalKickoff.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { KickoffType } from '../enums/kickoffType.enum';
import BackNavigationButton from '../components/ui/BackNavigationButton';
import { useKickoff } from '../hooks/useKickoff';

import TeamCard from '../components/ui/TeamCard';
import RerollTeam from '../components/ui/RerollTeam';

function InternationalKickoff(){
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
 const { kickoff, setKickoff, fetchKickoff } = useKickoff('/api/countries');
 
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

     <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} team={kickoff}/>
  </>
 )
}

export default InternationalKickoff;