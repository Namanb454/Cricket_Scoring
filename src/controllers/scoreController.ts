// src/controllers/scoreController.ts
import { Request, Response } from 'express';
import { Match } from '../models/match';

const updateScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matchId, eventType, runs, extras, isWicket } = req.body;

    const match = await Match.findById(matchId);

    if (!match) {
      res.status(404).json({ error: 'Match not found' });
      return;
    }

    switch (eventType) {
      case 'wide': {
        match.teamA.extras.wides += 1;
        match.teamA.totalRuns += runs;
        match.bowler.runsConceded += 1;
        break;
      }
      case 'noball': {
        match.teamA.extras.noBalls += 1;
        match.bowler.runsConceded += runs;
        match.teamA.totalRuns += runs;
        if (extras.bye) {
          match.teamA.extras.byes += extras.bye;
        } else if (extras.legBye) {
          match.teamA.extras.legByes += extras.legBye;
        }
        break;
      }
      case 'bye': {
        match.teamA.extras.byes += runs;
        match.teamA.totalRuns += runs;
        break;
      }
      case 'legbye': {
        match.teamA.extras.legByes += runs;
        match.teamA.totalRuns += runs;
        break;
      }
      case 'overthrow': {
        match.teamA.totalRuns += runs;
        match.currentStriker.runs += runs;
        break;
      }
      case 'runs': {
        match.currentStriker.runs += runs;
        match.teamA.totalRuns += runs;
        match.bowler.runsConceded += runs;
        break;
      }
      case 'wicket': {
        match.teamA.wickets += 1;
        match.bowler.wickets += 1;
        break;
      }
      default:
        res.status(400).json({ error: 'Invalid event type' });
        return;
    }

    await match.save();
    res.json(match); // Send the response after the save operation
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export { updateScore };
