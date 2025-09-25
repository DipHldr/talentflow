// New interface for a single timeline event
export interface TimelineEvent {
  id?: number;
  candidateId: number;
  type: 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Note' | 'Status Change';
  title: string;
  details?: string;
  date: Date;
  createdBy: string;
}