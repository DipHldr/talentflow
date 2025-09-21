import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, GraduationCap, Briefcase, User, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  DndContext,
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PaginatedCandidatesResponse, Candidate } from '../../mocks/types/candidates';

// --- UI Components (Self-Contained) ---
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ${className}`} {...props}>
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={`flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ${className}`} {...props} />
);

// --- Kanban Board Sub-Components ---

const CandidateProfileCard = ({
  id,
  name,
  email,
  portfolio_experience,
  portfolio_degree,
  portfolio_skills = [],
  onDelete
}: Candidate & { onDelete: (id: number) => void; }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 group relative">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              <Link to={`/candidate/${id}`}>{name}</Link>
            </h3>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label={`Delete ${name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <Mail className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm truncate">{email}</span>
      </div>
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2 text-gray-700">
          <Briefcase className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-sm">
            <span className="font-medium text-gray-900">Experience:</span> {portfolio_experience || 'N/A'} years
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <GraduationCap className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm truncate">{portfolio_degree || 'Not specified'}</span>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {(portfolio_skills || []).slice(0, 5).map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const CandidateCard = ({ candidate, onDelete }: { candidate: Candidate; onDelete: (id: number) => void; }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: candidate.id.toString() });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <CandidateProfileCard {...candidate} onDelete={onDelete} />
    </div>
  );
};

const DroppableColumn = ({ id, title, candidates, onDelete }: { id: string; title: React.ReactNode; candidates: Candidate[]; onDelete: (id: number) => void; }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`rounded-lg p-3 min-h-[500px] transition-colors duration-200 flex flex-col ${isOver ? 'bg-blue-100 border-blue-400 border-2' : 'bg-slate-100 border-slate-200 border-2 border-dashed'}`}>
      {title}
      <div className="mt-3 space-y-4 flex-grow overflow-y-auto pr-2">
        <SortableContext items={candidates.map((c) => c.id.toString())} strategy={verticalListSortingStrategy}>
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onDelete={onDelete} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

type Columns = {
  applied: Candidate[];
  interview: Candidate[];
  accepted: Candidate[];
  rejected: Candidate[];
};

// --- API & Hooks ---
const fetchCandidates = async (searchTerm: string, page: string, pageSize: string): Promise<PaginatedCandidatesResponse> => {
  const params = new URLSearchParams({ search: searchTerm, page, pageSize });
  const response = await fetch(`/api/candidates?${params.toString()}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// --- Main Page Component ---
const CandidatePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Fetch a larger batch of candidates
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery<PaginatedCandidatesResponse, Error>({
    queryKey: ['candidates', debouncedSearchTerm, pageNumber, pageSize],
    queryFn: () => fetchCandidates(debouncedSearchTerm, String(pageNumber), String(pageSize)),
    staleTime: 5 * 60 * 1000,
  });

  const [columns, setColumns] = useState<Columns>({ applied: [], interview: [], accepted: [], rejected: [] });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(null);

//   useEffect(() => {
//     if (data?.data) {
//       setColumns(prevColumns => {

//         const allManagedCandidates = new Map(Object.values(prevColumns).flat().map(c => [c.id, c]));
//         data.data.forEach(candidateFromApi => {
//           if (allManagedCandidates.has(candidateFromApi.id)) {
//             const existing = allManagedCandidates.get(candidateFromApi.id)!;
//             Object.assign(existing, { ...candidateFromApi, stage: existing.stage });
//           } else {
//             allManagedCandidates.set(candidateFromApi.id, candidateFromApi);
//           }
//         });
//         const newColumns: Columns = { applied: [], interview: [], accepted: [], rejected: [] };
//         allManagedCandidates.forEach(candidate => {
//           const stage = candidate.stage as keyof Columns;
//           if (newColumns[stage]) {
//             newColumns[stage].push(candidate);
//           } else {
//             newColumns.applied.push(candidate);
//           }
//         });
//         return newColumns;
//       });
//     }
//   }, [data]);

// ADD THIS ENTIRE BLOCK ▼

useEffect(() => {
  if (data?.data) {
    setColumns(prevColumns => {
      // 1. First, we preserve the columns that you have manually organized.
      const preservedColumns = {
        interview: prevColumns.interview,
        accepted: prevColumns.accepted,
        rejected: prevColumns.rejected,
      };

      // 2. We create a list of all candidate IDs that are already in those preserved columns.
      const preservedIds = new Set(
        Object.values(preservedColumns).flat().map(c => c.id)
      );

      // 3. The "Applied" list is now built ONLY from the new API data,
      //    but we filter out any candidates who are already in one of your organized columns.
      const newAppliedCandidates = data.data.filter(
        candidateFromApi => !preservedIds.has(candidateFromApi.id)
      );

      // 4. Finally, we combine your preserved columns with the new, correctly filtered "Applied" list.
      return {
        applied: newAppliedCandidates,
        ...preservedColumns,
      };
    });
  }
}, [data]);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const findCandidate = (id: string): Candidate | undefined => Object.values(columns).flat().find(c => c.id === parseInt(id, 10));
  const findColumn = (id: string): keyof Columns | undefined => {
    if (id in columns) return id as keyof Columns;
    return (Object.keys(columns) as Array<keyof Columns>).find(key => columns[key].some(item => item.id === parseInt(id, 10)));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setDraggedCandidate(findCandidate(active.id as string) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setDraggedCandidate(null);
    if (!over) return;
    const sourceColumn = findColumn(active.id as string);
    const destColumn = findColumn(over.id as string);
    if (!sourceColumn || !destColumn) return;
    const activeIdNum = parseInt(active.id as string, 10);
    const overIdNum = parseInt(over.id as string, 10);
    setColumns(prev => {
      if (sourceColumn === destColumn) {
        if (activeIdNum === overIdNum) return prev;
        const oldIndex = prev[sourceColumn].findIndex(c => c.id === activeIdNum);
        const newIndex = prev[sourceColumn].findIndex(c => c.id === overIdNum);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return { ...prev, [sourceColumn]: arrayMove(prev[sourceColumn], oldIndex, newIndex) };
      } else {
        const sourceItems = [...prev[sourceColumn]];
        const destItems = [...prev[destColumn]];
        const activeIndex = sourceItems.findIndex(c => c.id === activeIdNum);
        if (activeIndex === -1) return prev;
        const [movedItem] = sourceItems.splice(activeIndex, 1);
        movedItem.stage = destColumn;
        const overIndex = destItems.findIndex(c => c.id === overIdNum);
        if (overIndex !== -1) destItems.splice(overIndex, 0, movedItem);
        else destItems.push(movedItem);
        return { ...prev, [sourceColumn]: sourceItems, [destColumn]: destItems };
      }
    });
  };

  const handleDelete = (id: number) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      Object.keys(newColumns).forEach(key => {
        newColumns[key as keyof Columns] = newColumns[key as keyof Columns].filter(c => c.id !== id);
      });
      return newColumns;
    });
  };

  const columnTitles: Record<keyof Columns, React.ReactNode> = {
    applied: (<div className='bg-gradient-to-tr from-[#2f3743] via-[#293e69] to-[#031534] rounded-md p-3 flex justify-center items-center mb-2'><p className="bg-gradient-to-r from-[#e7f2f0] to-[#bfc8d5] bg-clip-text text-lg font-bold text-transparent">Applied ({columns.applied.length})</p></div>),

    interview: (<div className='bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] rounded-md p-3 flex justify-center items-center mb-2'><p className="text-white text-lg font-bold">Interview ({columns.interview.length})</p></div>),

    accepted: (<div className='bg-gradient-to-br from-[#166534] via-[#22c55e] to-[#15803d] rounded-md p-3 flex justify-center items-center mb-2'><p className="text-white text-lg font-bold">Accepted ({columns.accepted.length})</p></div>),

    rejected: (<div className='bg-gradient-to-tl from-[#991b1b] via-[#ef4444] to-[#b91c1c] rounded-md p-3 flex justify-center items-center mb-2'><p className="text-white text-lg font-bold">Rejected ({columns.rejected.length})</p></div>)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-screen-2xl mx-auto">

        <div className="bg-blue-white rounded-2xl shadow-xl border p-2 w-full mt-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 flex items-center space-x-3 pl-4">
                <Search className="h-5 w-5 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="flex-1 border-0 outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl">
                Search
              </Button>
            </div>
          </div>

        <div className="w-full mt-8">
          {isError && <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200"><p className="text-red-600">Error: {error?.message}</p></div>}
          {isLoading && <div className="text-center p-8"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div><p className="text-slate-500 mt-2">Loading...</p></div>}
          {!isLoading && !isError && (
             <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(Object.keys(columns) as Array<keyof Columns>).map((colId) => (
                  <DroppableColumn key={colId} id={colId} title={columnTitles[colId]} candidates={columns[colId]} onDelete={handleDelete} />
                ))}
              </div>
              <DragOverlay>{activeId && draggedCandidate ? <div className="transform rotate-2 opacity-95 shadow-2xl"><CandidateProfileCard {...draggedCandidate} onDelete={() => {}} /></div> : null}</DragOverlay>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;

