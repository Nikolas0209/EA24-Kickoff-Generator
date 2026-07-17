export type UITeam = {
  id: string,
  name: string,
  logo: string,
  stars: number,
  type: 'club' | 'international',
  league?: string,
  leagueId?: string
}