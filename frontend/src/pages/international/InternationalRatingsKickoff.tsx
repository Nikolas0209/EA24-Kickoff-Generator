import '../KickoffContainer.css';
import { useKickoff } from '../../hooks/useKickoff';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import KickoffActions from '../../components/kickoff/KickoffActions';
import TeamCard from '../../components/ui/teamCard/TeamCard';
import RerollTeam from '../../components/kickoff/RerollTeam'
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../utils/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';
import ErrorComponent from '../../components/ui/ErrorComponent';

function InternationalRatingsKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<CountryKickoff>('/api/countries/country-ratings');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return(
    <div className="page-background">
      {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ? 
       (<ErrorComponent retryFetch={retryFetch}/>) : (
        <>
          <NavigationHeader/>

          {kickoff && (
           <>
             <div className="kickoff-container">
               <TeamCard team={homeTeam} title='INTERNATIONAL RATINGS'/>

               <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
                fetchKickoff={fetchKickoff} kickoffType={KickoffType.INTERNATIONAL_RATINGS} />

               <TeamCard team={awayTeam} title='INTERNATIONAL RATINGS'/>
             </div>

             <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff}
              rerollEndpoint='/api/countries/country-ratings' />
           </>
          )}
        </>
      )}
    </div>
  )
}

export default InternationalRatingsKickoff;