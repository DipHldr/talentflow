import React from 'react';
import { Calendar, FileText, MessageSquare, UserCheck, Clock } from 'lucide-react';
import type { TimelineEvent } from '../mockType';

interface TimelineTabProps {
  events: TimelineEvent[];
}

const TimelineTab: React.FC<TimelineTabProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    const icons = {
      application: <FileText className="w-5 h-5" />,
      assessment: <Clock className="w-5 h-5" />,
      interview: <MessageSquare className="w-5 h-5" />,
      status_change: <UserCheck className="w-5 h-5" />,
      note: <MessageSquare className="w-5 h-5" />
    };
    return icons[type as keyof typeof icons] || icons.note;
  };

  const getEventColor = (type: string) => {
    const colors = {
      application: 'bg-blue-100 text-blue-600',
      assessment: 'bg-purple-100 text-purple-600',
      interview: 'bg-green-100 text-green-600',
      status_change: 'bg-orange-100 text-orange-600',
      note: 'bg-gray-100 text-gray-600'
    };
    return colors[type as keyof typeof colors] || colors.note;
  };

  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Timeline</h3>
        <span className="text-sm text-gray-500">{events.length} events</span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>

        <div className="space-y-6">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4">
              {/* Timeline dot */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>

              {/* Event content */}
              <div className="flex-1 bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-600 mb-3">
                  {event.description}
                </p>

                {event.status && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Status:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {event.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Timeline Events</h3>
          <p className="text-gray-500">No events have been recorded for this candidate yet.</p>
        </div>
      )}
    </div>
  );
};

export default TimelineTab;