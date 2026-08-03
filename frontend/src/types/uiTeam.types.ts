import type {StarRating} from './starRating.type';

export type UITeam = {
  id: string,
  name: string,
  logo: string,
  stars: StarRating,
  type: 'club' | 'international',
  league?: string,
  leagueId?: string
}