import './UELKickoff.css';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import TeamCard from '../../components/ui/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import { KickoffType } from '../../enums/kickoffType.enum';
import RerollTeam from '../../components/ui/RerollTeam';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';

function UELKickoff(){
 const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs?competition=UEL'); 
 const {homeTeam, awayTeam} = createKickoffUI(kickoff);
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
 
 const competition = 'UEL';

 return(
   <div className="uel-page">
    {isLoading && kickoff === null ? <LoadingComponent/> : (
      <>
        <NavigationHeader/>
    
        {kickoff && (
          <div className="kickoff-container" key={kickoff.homeTeam._id}>
       
            <TeamCard team={homeTeam} title='UEFA EUROPA LEAGUE'/>

            <KickoffActions setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} fetchKickoff={fetchKickoff}
              kickoff={kickoff} kickoffType={KickoffType.UEL}/>

            <TeamCard team={awayTeam} title='UEFA EUROPA LEAGUE'/>
          </div>
        )}

        <RerollTeam setKickoff={setKickoff} kickoff={kickoff} setIsSubmitted={setIsSubmitted}
         rerollEndpoint={'/api/clubs/random-team'} competition={competition}/>
      </>
    )}
   </div>
  )
}

export default UELKickoff;