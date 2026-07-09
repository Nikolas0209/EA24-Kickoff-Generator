import { KickoffType } from "../enums/kickoffType.enum";

export type HistoryKickoff = {
  homeTeam: string,
  awayTeam: string,
  kickoffType: KickoffType,
  _id: string,
  createdAt: string
}