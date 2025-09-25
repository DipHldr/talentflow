import { db } from "../../db.ts";
import type { Candidate, PaginatedCandidatesResponse } from "../types/candidates";

interface GetCandidatesOptions {
  search?: string;
  stage?: string;
  page?: number;
  pageSize?: number;
}

export async function getCandidates({
  search = "",
  stage = "",
  page = 1,
  pageSize = 10,
}: GetCandidatesOptions): Promise<PaginatedCandidatesResponse> {
  let candidates: Candidate[] = await db.candidates.toArray();

  // Search filter
  if (search) {
    const s = search.toLowerCase();
    candidates = candidates.filter(
      (c) => c.name.toLowerCase().includes(s) ||
       c.email.toLowerCase().includes(s) || 
       c.portfolio_skills.some(skill => skill.toLowerCase().includes(s))||
       c.portfolio_school.toLowerCase().includes(s)||
       c.portfolio_degree.toLowerCase().includes(s)||
       c.portfolio_summary.toLowerCase().includes(s)
    );
  }

  // Stage filter
  if (stage) {
    const st = stage.toLowerCase();
    candidates = candidates.filter((c) => c.stage.toLowerCase() === st);
  }

  // Pagination
  const total = candidates.length;
  const start = (page - 1) * pageSize;
  const paginated = candidates.slice(start, start + pageSize);

  return {
    total,
    page,
    pageSize,
    data: paginated,
  };
}


export const updateCandidateStage = async (candidateId: number, newStage: string) => {
  const updatedCount = await db.candidates.update(candidateId, { stage: newStage });

  if (updatedCount === 0) {
    throw new Error(`Candidate with ID ${candidateId} not found.`);
  }

  return updatedCount;
};
