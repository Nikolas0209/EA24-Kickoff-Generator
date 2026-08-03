import './CompetitionKickoff.css';
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
import ErrorComponent from '../../components/ui/ErrorComponent';

function UELKickoff(){
 const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<ClubKickoff>('/api/clubs?competition=UEL'); 
 const {homeTeam, awayTeam} = createKickoffUI(kickoff);
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
 
 const competition = 'UEL';
 const competitionLogo = kickoff?.competitionLogo;

 return(
   <div className="competition-page uel-background">
    {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ? 
     (<ErrorComponent retryFetch={retryFetch}/>) : (
      <>
        <NavigationHeader/>
    
        {kickoff && (
          <>
            <div className="kickoff-container">
       
              <TeamCard team={homeTeam} title='UEFA EUROPA LEAGUE' competitionLogo={competitionLogo} 
               position='left' competition={competition}/>

              <KickoffActions setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} fetchKickoff={fetchKickoff}
               kickoff={kickoff} kickoffType={KickoffType.UEL}/>

              <TeamCard team={awayTeam} title='UEFA EUROPA LEAGUE' competitionLogo={competitionLogo}
               position='right' competition={competition}/>
            </div>

            <RerollTeam setKickoff={setKickoff} kickoff={kickoff} setIsSubmitted={setIsSubmitted}
            rerollEndpoint={'/api/clubs/random-team'} competition={competition}/>
          </>
        )}
      </>
    )}
   </div>
  )
}

export default UELKickoff;