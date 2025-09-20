import { useEffect, useState } from "react";
import { db } from "../../db.ts";

export default function TestDB() {
  const [jobsCount, setJobsCount] = useState(0);
  const [candidatesCount, setCandidatesCount] = useState(0);

  useEffect(() => {
    async function load() {
      const jCount = await db.jobs.count();
      const cCount = await db.candidates.count();
      setJobsCount(jCount);
      setCandidatesCount(cCount);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Database Test</h2>
      <p>Jobs in DB: {jobsCount}</p>
      <p>Candidates in DB: {candidatesCount}</p>
    </div>
  );
}
