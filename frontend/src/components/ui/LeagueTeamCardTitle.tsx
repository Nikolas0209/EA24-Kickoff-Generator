import './LeagueTeamCardTitle.css';
import type { Side } from './TeamCard';
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          <div className="arrow-wrapper-left">
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{league}</p>
          </div>
          <div className="arrow-wrapper-right">
             <ChevronRight />
          </div>
          <div className='league-logo-wrapper'>
            <img src={homeLeagueLogo} alt="League Logo" className='league-logo'/>
          </div>
        </>
      ) : (
        <>
          <div className='league-logo-wrapper'>
            <img src={awayLeagueLogo} alt="League Logo" className='league-logo'/>
          </div>
          <div className="arrow-wrapper-left">
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{league}</p>
          </div>
          <div className="arrow-wrapper-right">
             <ChevronRight />
          </div>
        </> 
      )}
  </div>
  )
}

export default LeagueTeamCardTitle;