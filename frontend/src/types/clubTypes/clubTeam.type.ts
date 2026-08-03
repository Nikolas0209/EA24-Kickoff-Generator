import type { StarRating } from "../starRating.type"

export type ClubTeam = {
 _id: string, 
 club: string,
 stars: StarRating,
 competition: string | null,
 leagueName: string,
 league: string,
 logo: string,
 type: string
}