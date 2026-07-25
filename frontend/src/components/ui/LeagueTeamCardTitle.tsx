import type { League } from '../../pages/clubs/ClubLeagueKickoff';
import './LeagueTeamCardTitle.css';
import type { Side } from './TeamCard';
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamCardTitleProps = {
 
  homeLeagueLogo: string,
  awayLeagueLogo: string,
  side: Side,
  nextHomeLeague: () => void,
  previousHomeLeague: () => void,
  nextAwayLeague: () => void,
  previousAwayLeague: () => void,
  currentHomeLeague: League,
  currentAwayLeague: League,
  toggleLeague: () => Promise<void>
}

function LeagueTeamCardTitle({ side, homeLeagueLogo, awayLeagueLogo, nextHomeLeague, previousHomeLeague, nextAwayLeague, previousAwayLeague, currentHomeLeague, currentAwayLeague }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-league ${side}`}>
      {side === 'left' ? (
        <>
          <div className="arrow-wrapper-left" onClick={previousHomeLeague}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{currentHomeLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={nextHomeLeague}>
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
          <div className="arrow-wrapper-left" onClick={previousAwayLeague}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{currentAwayLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={nextAwayLeague}>
             <ChevronRight />
          </div>
        </> 
      )}
  </div>
  )
}

export default LeagueTeamCardTitle;