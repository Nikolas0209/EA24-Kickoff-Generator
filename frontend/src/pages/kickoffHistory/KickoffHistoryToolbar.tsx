import './KickoffHistoryToolbar.css';
import type { HistoryKickoff } from './KickoffHistory';
import { KickoffType } from '../../enums/kickoffType.enum';

type Toolbar = {
  kickoffHistory: HistoryKickoff[],
  isDropDown: boolean,
  openDropDownMenu: () => void,
  chooseFilter: (selectFilter: KickoffType) => void,
  deleteAllButton: () => void,
  filteredKickoffHistory: HistoryKickoff[]
}

function KickoffHistoryToolbar({ kickoffHistory, isDropDown, openDropDownMenu, chooseFilter, 
deleteAllButton, filteredKickoffHistory }: Toolbar){
  return(
    <>
    <div className="drop-down-menu">
      <button disabled={kickoffHistory.length === 0} 
        className={`drop-down-button ${!isDropDown ? 'dropdown-closed' : ''} ${kickoffHistory.length === 0 ? 'disable-button' : ''}`}
        onClick={openDropDownMenu}>
          Filter
      </button>
      {isDropDown && (
      <ul className="dropdown-list">
        <li onClick={() => chooseFilter(KickoffType.ALL)} 
          className="list-item">
            ALL
        </li>
        <li onClick={() => chooseFilter(KickoffType.CLUB_RANDOM)} 
          className="list-item">
            CLUB RANDOM
        </li>
        <li onClick={() => chooseFilter(KickoffType.CLUB_RATINGS)}
          className="list-item">
            CLUB RATINGS 
        </li>
        <li onClick={() => chooseFilter(KickoffType.INTERNATIONAL_RANDOM)} 
          className="list-item">
            INTERNATIONAL RANDOM
        </li>
        <li onClick={() => chooseFilter(KickoffType.INTERNATIONAL_RATINGS)} 
          className="list-item">
            INTERNATIONAL RATINGS
        </li>
        <li onClick={() => chooseFilter(KickoffType.UCL)}
          className="list-item">
            UCL
        </li>
        <li onClick={() => chooseFilter(KickoffType.UEL)} 
          className="list-item">
            UEL
        </li>
        <li onClick={() => chooseFilter(KickoffType.UECL)} 
          className="list-item">
            UECL
        </li>
      </ul>
      )}
    </div>

    <button disabled={filteredKickoffHistory.length === 0}
      className={`delete-button ${filteredKickoffHistory.length === 0 ? 'disable-button': ''}`}
      onClick={deleteAllButton}>
        Delete All
    </button>
    </>
  )
}

export default KickoffHistoryToolbar;