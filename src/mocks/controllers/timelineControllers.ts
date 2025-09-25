import {db} from '../../db';
import type { TimelineEvent } from '../types/timeline';

export const getTimelineForCandidate = async (candidateId: number): Promise<TimelineEvent[]> => {
  try {
    // Query the 'timelineEvents' table where the candidateId matches.
    // .reverse().sortBy('date') is an efficient way to sort by date in descending order.
    const events = await db.timelineEvents
      .where('candidateId')
      .equals(candidateId)
      .reverse()
      .sortBy('date');

    return events;
  } catch (error) {
    console.error(`Failed to fetch timeline for candidate ${candidateId}:`, error);
    throw new Error('Could not retrieve the timeline.');
  }
};

