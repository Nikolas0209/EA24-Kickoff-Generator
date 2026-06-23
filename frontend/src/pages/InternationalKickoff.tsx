import './InternationalKickoff.css';
import { useState } from 'react';
import BackNavigationButton from '../components/ui/BackNavigationButton';
import { useKickoff } from '../hooks/useKickoff';
import TeamCard from '../components/ui/TeamCard';
import RerollTeam from '../components/ui/RerollTeam';
import KickoffActions from '../components/ui/KickoffActions';

function InternationalKickoff(){
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
 const { kickoff, setKickoff, fetchKickoff } = useKickoff('/api/countries');
 
 return(
  <>
   <BackNavigationButton/>

   {kickoff && (
     <div className="kickoff-container" key={kickoff.homeTeam._id}>
       <TeamCard team={kickoff.homeTeam}/>
       
       <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff} fetchKickoff={fetchKickoff}/>

       <TeamCard team={kickoff.awayTeam}/>
     </div>
      )
     }

     <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff}/>
  </>
 )
}

export default InternationalKickoff;