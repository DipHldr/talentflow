import  { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, FileText, Clock } from 'lucide-react';
import type { Candidate, } from '../../mocks/types/candidates.ts';
import ProfileHeader from './ProfileComponents/ProfileHeader';
import JobApplicationsTab from './ProfileComponents/JobApplicationsTab';
import AssessmentsTab from './ProfileComponents/AssesmentsTab';
import TimelineTab from './ProfileComponents/TimelineTab';
// import { mockJobApplications, mockAssessments, mockTimelineEvents } from './mockData.ts';
import type {JobApplication} from '../../mocks/types/jobs1.ts';
import type { AssessmentResult,CreatedAssesment } from '../../mocks/types/assesment.ts';
import type { TimelineEvent } from '@/mocks/types/timeline.ts';

export type EnrichedAssessmentResult = AssessmentResult & {
  assessmentTitle: string;
};

export const fetchCandidateApplicationsAPI = async (candidateId: number): Promise<JobApplication[]> => {
  const response = await fetch(`/api/candidates/${candidateId}/applications`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Could not fetch applications.');
  }

  return response.json();
};




type TabType = 'jobs' | 'assessments' | 'timeline';

const CandidateProfilePage: React.FC = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState<Candidate>();

  const [assessments, setAssessments] = useState<EnrichedAssessmentResult[]>([]);
  // We'll use empty arrays for these until you have APIs for them
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]); 
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [pendingAssessments, setPendingAssessments] = useState<CreatedAssesment[]>([]); // Assuming CreatedAssesment is the type returned

  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   try {
  //       // 3. Use the candidateId directly in your API call.
  //   fetch(`/api/candidates/${candidateId}`)
  //         .then(res => res.json())
  //         .then(data => setCandidate(data));
        
  //   } catch (error) {
  //        console.error('Error fetching candidate:', error);
  //   }finally{
  //       setLoading(false);
  //   }
  
  // }, [candidateId]);



  // Replace your existing useEffect with this one

useEffect(() => {
  // Ensure candidateId exists before fetching
  if (!candidateId) {
    setLoading(false);
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch candidate details and their assessment results concurrently
      const [
        candidateResponse,
        assessmentsResponse,
        pendingAssessmentsResponse,
        applications,
        timelineResponse,] = await Promise.all([
        fetch(`/api/candidates/${candidateId}`),
        fetch(`/api/candidates/${candidateId}/results`),
        fetch(`/api/assessments/assigned?candidateId=${candidateId}`),
        fetchCandidateApplicationsAPI(parseInt(candidateId)),
        fetch(`/api/candidates/${candidateId}/timeline`),
      ]);

      if (!candidateResponse.ok) {
        // If the candidate isn't found, stop here
        throw new Error('Candidate not found');
      }

      const candidateData = await candidateResponse.json();
      const assessmentsData = await assessmentsResponse.json();
      const pendingAssessmentsData = await pendingAssessmentsResponse.json();
      const timelineData=await timelineResponse.json();

      setCandidate(candidateData);
      setAssessments(assessmentsData);
      setPendingAssessments(pendingAssessmentsData);
      setJobApplications(applications);
      setTimelineEvents(timelineData);
      // setTimelineEvents(timelineData);

    } catch (error) {
      console.error('Error fetching candidate data:', error);
      // Set candidate to null or undefined so the "Not Found" message appears
      setCandidate(undefined);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [candidateId]);
  console.log('data: ',candidate);

  const tabs = [
    { id: 'jobs', label: 'Job Applications', icon: Briefcase, count: jobApplications.length },
    { id: 'assessments', label: 'Assessments', icon: FileText, count: pendingAssessments.length },
    { id: 'timeline', label: 'Timeline', icon: Clock, count: timelineEvents.length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidate profile...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate Not Found</h2>
          <p className="text-gray-600 mb-4">The candidate with ID {candidateId} could not be found.</p>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobApplicationsTab applications={jobApplications} />;
      case 'assessments':
        return <AssessmentsTab assessments={pendingAssessments} />;
      case 'timeline':
        return <TimelineTab events={timelineEvents} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Candidates
        </button>

        {/* Profile Header */}
        <ProfileHeader candidates={candidate} />

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`relative flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;