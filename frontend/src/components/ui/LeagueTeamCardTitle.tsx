import type { Direction, League } from '../../pages/clubs/ClubLeagueKickoff';
import './LeagueTeamCardTitle.css';
import type { Side } from './TeamCard';
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamCardTitleProps = {
 
  homeLeagueLogo: string,
  awayLeagueLogo: string,
  side: Side,
  currentHomeLeague: League,
  currentAwayLeague: League,
  toggleLeague: () => Promise<void>,
  changeHomeLeague: (direction: Direction) => Promise<void>,
  changeAwayLeague: (direction: Direction) => Promise<void>,
}

function LeagueTeamCardTitle({ side, homeLeagueLogo, awayLeagueLogo, currentHomeLeague, currentAwayLeague, changeHomeLeague, changeAwayLeague }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-league ${side}`}>
      {side === 'left' ? (
        <>
          <div className="arrow-wrapper-left" onClick={() => changeHomeLeague('previous')}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{currentHomeLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={() => changeHomeLeague('next')}>
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
          <div className="arrow-wrapper-left" onClick={() => changeAwayLeague('previous')}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{currentAwayLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={() => changeAwayLeague('next')}>
             <ChevronRight />
          </div>
        </> 
      )}
  </div>
  )
}

export default LeagueTeamCardTitle;