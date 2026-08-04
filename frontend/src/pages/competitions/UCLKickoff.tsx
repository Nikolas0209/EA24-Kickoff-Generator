import './CompetitionKickoff.css';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import { useKickoff } from '../../hooks/useKickoff';
import TeamCard from '../../components/ui/teamCard/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import RerollTeam from '../../components/ui/RerollTeam';
import { createKickoffUI } from '../../utils/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';
import ErrorComponent from '../../components/ui/ErrorComponent';

function UCLKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<ClubKickoff>('/api/clubs?competition=UCL');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const competition = 'UCL';
  const competitionLogo = kickoff?.competitionLogo;
  
  return(
    <div className="competition-page ucl-background">
      {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ?
        (<ErrorComponent retryFetch={retryFetch} />) : (
        <>
         <NavigationHeader />
          
          {kickoff && ( 
            <>
              <div className="kickoff-container">
 
               <TeamCard team={homeTeam} title='UEFA CHAMPIONS LEAGUE' competition={competition} 
                competitionLogo={competitionLogo} position='left'/>

               <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff} 
                kickoffType={KickoffType.UCL} fetchKickoff={fetchKickoff} />

               <TeamCard team={awayTeam} title='UEFA CHAMPIONS LEAGUE' competition={competition} 
                competitionLogo={competitionLogo} position='right'/>
              </div>

              <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} 
              rerollEndpoint='/api/clubs/random-team' competition={competition}/>
           </>
          )}
        </>
      )}
    </div>
  )
}

export default UCLKickoff;

