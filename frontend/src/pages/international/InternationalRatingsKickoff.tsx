import './InternationalKickoff.css';
import { useKickoff } from '../../hooks/useKickoff';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import KickoffActions from '../../components/ui/KickoffActions';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam'
import type { SubmitMatch } from '../../types/submitMatch.type';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import LoadingComponent from '../../components/ui/LoadingComponent';

function InternationalRatingsKickoff({ isSubmitted, setIsSubmitted}: SubmitMatch){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<CountryKickoff>('/api/countries/country-ratings');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);

  return(
    <div className="page-background">
      {isLoading && kickoff === null ? <LoadingComponent/> : (
        <>
          <BackNavigationButton/>

          {kickoff && (
            <div className="kickoff-container" key={kickoff.homeTeam._id}>
              <TeamCard team={homeTeam} title='INTERNATIONAL RATINGS'/>

              <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
                fetchKickoff={fetchKickoff} kickoffType={KickoffType.INTERNATIONAL} />

              <TeamCard team={awayTeam} title='INTERNATIONAL RATINGS'/>
            </div>
          )}

          <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff}
          rerollEndpoint='/api/countries/country-ratings' />
        </>
      )}
    </div>
  )
}

export default InternationalRatingsKickoff;