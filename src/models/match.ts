// src/models/match.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interfaces for the players and match data
interface IPlayerStats {
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  wickets: number;
  runsConceded: number;
}

interface ITeamStats {
  totalRuns: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
  };
  wickets: number;
}

interface IMatch extends Document {
  teamA: ITeamStats;
  teamB: ITeamStats;
  currentStriker: IPlayerStats;
  currentNonStriker: IPlayerStats;
  bowler: IPlayerStats;
  overs: number;
  currentOver: number;
  ballsInOver: number;
  isMatchComplete: boolean;
}

const PlayerStatsSchema = new Schema<IPlayerStats>({
  runs: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
});

const TeamStatsSchema = new Schema<ITeamStats>({
  totalRuns: { type: Number, default: 0 },
  extras: {
    wides: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legByes: { type: Number, default: 0 },
  },
  wickets: { type: Number, default: 0 },
});

const MatchSchema = new Schema<IMatch>({
  teamA: { type: TeamStatsSchema, required: true },
  teamB: { type: TeamStatsSchema, required: true },
  currentStriker: { type: PlayerStatsSchema, required: true },
  currentNonStriker: { type: PlayerStatsSchema, required: true },
  bowler: { type: PlayerStatsSchema, required: true },
  overs: { type: Number, default: 0 },
  currentOver: { type: Number, default: 0 },
  ballsInOver: { type: Number, default: 0 },
  isMatchComplete: { type: Boolean, default: false },
});

export const Match = mongoose.model<IMatch>('Match', MatchSchema);
