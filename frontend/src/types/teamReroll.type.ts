import type { ClubTeam } from "./clubTypes/clubTeam.type";
import type { InternationalTeam } from "./internationalTypes/internationalTeam.type";

export type TeamReroll = {
  team: ClubTeam | InternationalTeam,
  leagueLogo?: string
}