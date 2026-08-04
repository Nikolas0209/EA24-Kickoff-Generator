import '../KickoffContainer.css';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import { useKickoff } from '../../hooks/useKickoff';
import TeamCard from '../../components/ui/teamCard/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../utils/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';
import ErrorComponent from '../../components/ui/ErrorComponent';

function InternationalKickoff(){
 const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<CountryKickoff>('/api/countries');
 const {homeTeam, awayTeam} = createKickoffUI(kickoff);
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

 return(
   <div className="page-background">
     {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ? 
      (<ErrorComponent retryFetch={retryFetch} />) : (
       <>
         <NavigationHeader/>

         {kickoff && (
          <>
           <div className="kickoff-container">
             <TeamCard team={homeTeam} title='INTERNATIONAL RANDOM'/>
     
             <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
             fetchKickoff={fetchKickoff} kickoffType={KickoffType.INTERNATIONAL_RANDOM} />

             <TeamCard team={awayTeam} title='INTERNATIONAL RANDOM'/>
           </div>

           <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} 
           rerollEndpoint='/api/countries/random-team' />
          </>
         )}
        </>
     )}
   </div>
 )
}

export default InternationalKickoff;