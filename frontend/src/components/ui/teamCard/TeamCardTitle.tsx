import './TeamCardTitle.css';
import type { KickoffTeamPosition } from '../../../types/clubTypes/KickoffTeamPosition.type';

type TeamCardTitleProps = {
  title: string,
  competitionLogo: string,
  position: KickoffTeamPosition
}

function TeamCardTitle({ title, competitionLogo, position }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-competition ${position}`}>
      {position === 'left' ? (
        <>
          <div>
            <p className="kickoff-subtitle left-subtitle">{title}</p>
          </div>
          <div>
          <div className='competition-logo-wrapper'>
            <img src={competitionLogo} alt="Competition Logo" className='competition-logo'/>
          </div>
          
          </div>
        </>
      ) : (
        <>
          <div className='competition-logo-wrapper'>
            <img src={competitionLogo} alt="Competition Logo" className='competition-logo'/>
          </div>
          <div>
            <p className="kickoff-subtitle right-subtitle">{title}</p>
          </div>
      
        </>
      )}
    
  </div>
  )
}

export default TeamCardTitle;