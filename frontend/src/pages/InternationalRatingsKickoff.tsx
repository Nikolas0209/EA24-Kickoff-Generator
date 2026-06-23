import './InternationalKickoff.css';
import { useKickoff } from '../hooks/useKickoff';

function InternationalRatingsKickoff(){
  const { kickoff, setKickoff, fetchKickoff } = useKickoff('/api/countries/country-ratings');

  

  return(
    <>
    </>
  )
}

export default InternationalRatingsKickoff;