export type League = {
  league: string,
  leagueId: string,
 };
 
export type Direction = 'next' | 'previous';

export type LeagueSwitcher = {
 leagueLogo: string,
 currentLeague: League
 changeLeague: (direction: Direction) => Promise<void>
}

export type KickoffLeagueSwitchers = {
  home: LeagueSwitcher,
  away: LeagueSwitcher
}

