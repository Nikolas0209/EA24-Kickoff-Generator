import type { ClubTeam } from "./clubTeam.type";

export type ClubKickoff = {
  homeTeam: ClubTeam,
  awayTeam: ClubTeam,
  competitionLogo?: string
}