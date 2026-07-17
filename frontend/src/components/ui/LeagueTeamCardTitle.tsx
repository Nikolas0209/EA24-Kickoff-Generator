import './LeagueTeamCardTitle.css';
import type { Side } from './TeamCard';

type TeamCardTitleProps = {
  league: string,
  homeLeagueLogo: string,
  awayLeagueLogo: string,
  side: Side
}

function LeagueTeamCardTitle({ league, side, homeLeagueLogo, awayLeagueLogo }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-league ${side}`}>
      {side === 'left' ? (
        <>
          <div>
            <p className="kickoff-subtitle">{league}</p>
          </div>
          <div>
          <div className='league-logo-wrapper'>
            <img src={homeLeagueLogo} alt="League Logo" className='league-logo'/>
          </div>
          
          </div>
        </>
      ) : (
        <>
          <div className='league-logo-wrapper'>
            <img src={awayLeagueLogo} alt="League Logo" className='league-logo'/>
          </div>
          <div>
            <p className="kickoff-subtitle">{league}</p>
          </div>
      
        </>
      )}
    
  </div>
  )
}

export default LeagueTeamCardTitle;