import './InternationalKickoff.css';
import { useKickoff } from '../hooks/useKickoff';
import BackNavigationButton from '../components/ui/BackNavigationButton';
import KickoffActions from '../components/ui/KickoffActions';
import TeamCard from '../components/ui/TeamCard';
import RerollTeam from '../components/ui/RerollTeam'
import type { SubmitMatch } from '../types/submitMatch.type';

function InternationalRatingsKickoff({ isSubmitted, setIsSubmitted }: SubmitMatch){
  const { kickoff, setKickoff, fetchKickoff } = useKickoff('/api/countries/country-ratings');

  return(
    <>
      <BackNavigationButton/>

      {kickoff && (
        <div className="kickoff-container" key={kickoff.homeTeam._id}>
          <TeamCard team={kickoff.homeTeam} title='INTERNATIONALS RATINGS'/>
    
          <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
           fetchKickoff={fetchKickoff}/>

          <TeamCard team={kickoff.awayTeam} title='INTERNATIONALS RATINGS'/>
        </div>
       )
      }

      <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} rerollEndpoint='/api/countries/country-ratings' />
    </>
  )
}

export default InternationalRatingsKickoff;