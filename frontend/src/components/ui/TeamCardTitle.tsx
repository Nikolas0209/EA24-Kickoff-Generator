import './TeamCardTitle.css';
import type { Side } from './TeamCard';

type TeamCardTitleProps = {
  title: string,
  competitionLogo: string,
  side: Side
}

function TeamCardTitle({ title, competitionLogo, side }: TeamCardTitleProps){
  
  return(
    <div className={`subtitle-div-competition ${side}`}>
      {side === 'left' ? (
        <>
          <div>
            <p className="kickoff-subtitle">{title}</p>
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
            <p className="kickoff-subtitle">{title}</p>
          </div>
      
        </>
      )}
    
  </div>
  )
}

export default TeamCardTitle;