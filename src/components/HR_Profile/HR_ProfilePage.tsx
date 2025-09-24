import { useState } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { TabNavigation } from './components/TabNavigation';
import { AssessmentsTab } from './components/AssessmentsTab';
import { CandidatesTab } from './components/CandidatesTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { ResultsTab } from './components/ResultsTab';
import { PostedJobs } from './components/PostedJobs';
const HRProfilePage=()=> {
  const [activeTab, setActiveTab] = useState('assessments');

  const hrData = {
    name: 'Sarah Martinez',
    email: 'sarah.martinez@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Senior HR Manager',
    location: 'San Francisco, CA',
    avatar: '/api/placeholder/80/80',
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <PostedJobs/>
      case 'assessments':
        return <AssessmentsTab />;
      case 'candidates':
        return <CandidatesTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'results':
        return <ResultsTab />;
      default:
        return <AssessmentsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader hrData={hrData} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default HRProfilePage;