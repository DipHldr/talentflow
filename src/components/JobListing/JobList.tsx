import { useState,useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import JobCard from "./JobCard";
import type { Job } from "../../mocks/types/jobs";

interface Props {
  jobs: Job[];
}

// Sortable wrapper for each JobCard
function SortableJobCard({ job }: { job: Job }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    touchAction: 'none' as 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <JobCard {...job} />
    </div>
  );
}

export default function JobList({ jobs }: Props) {
  const [jobList, setJobList] = useState(jobs);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = jobList.findIndex((job) => job.id === active.id);
      const newIndex = jobList.findIndex((job) => job.id === over.id);
      setJobList(arrayMove(jobList, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={jobList.map((job) => job.id)} strategy={verticalListSortingStrategy}>
        {jobList.map((job) => (
          <SortableJobCard key={job.id} job={job} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
