import type { LeagueSwitcher } from '../../types/clubTypes/leagueNavigation.type';
import './LeagueTeamCardTitle.css';
import type { KickoffTeamPosition } from '../../types/clubTypes/KickoffTeamPosition.type';
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamCardTitleProps = {
  leagueSwitcher: LeagueSwitcher,
  position: KickoffTeamPosition
}

function LeagueTeamCardTitle({ leagueSwitcher, position }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-league ${position}`}>
      {position === 'left' ? (
        <>
          <div className="arrow-wrapper-left" onClick={() => leagueSwitcher.changeLeague('previous')}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{leagueSwitcher.currentLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={() => leagueSwitcher.changeLeague('next')}>
             <ChevronRight />
          </div>
          <div className='league-logo-wrapper'>
            <img src={leagueSwitcher.leagueLogo} alt="League Logo" className='league-logo'/>
          </div>
        </>
      ) : (
        <>
          <div className='league-logo-wrapper'>
            <img src={leagueSwitcher.leagueLogo} alt="League Logo" className='league-logo'/>
          </div>
          <div className="arrow-wrapper-left" onClick={() => leagueSwitcher.changeLeague('previous')}>
             <ChevronLeft />
          </div>
          <div className='kickoff-subtitle-wrapper'>
            <p className="kickoff-subtitle">{leagueSwitcher.currentLeague.league}</p>
          </div>
          <div className="arrow-wrapper-right" onClick={() => leagueSwitcher.changeLeague('next')}>
             <ChevronRight />
          </div>
        </> 
      )}
  </div>
  )
}

export default LeagueTeamCardTitle;