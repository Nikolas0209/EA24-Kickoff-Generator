import type { StarRating } from "../starRating.type"

export type InternationalTeam = {
  _id: string,
  country: string,
  stars: StarRating,
  logo: string,
  type: string
}