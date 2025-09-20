import React, { useState } from 'react';
import { Filter, X, MapPin, Briefcase, GraduationCap, DollarSign, Building } from 'lucide-react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import type { JobFilters } from '../../mocks/types/jobs1';

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

const JobFiltersComponent: React.FC<JobFiltersProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead' }
  ];

  const departments = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const handleCheckboxChange = (
    category: keyof Pick<JobFilters, 'type' | 'experience' | 'department'>,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[category];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFiltersChange({
      ...filters,
      [category]: newValues
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      type: [],
      experience: [],
      location: '',
      salaryMin: 0,
      salaryMax: 200000,
      department: []
    });
  };

  const hasActiveFilters = 
    filters.type.length > 0 ||
    filters.experience.length > 0 ||
    filters.location ||
    filters.salaryMin > 0 ||
    filters.salaryMax < 200000 ||
    filters.department.length > 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-slate-600 hover:text-slate-900"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700">Location</label>
            </div>
            <Input
              placeholder="Enter city or 'Remote'"
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            />
          </div>

          {/* Job Type Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700">Job Type</label>
            </div>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.type.includes(type.value)}
                    onChange={(e) => handleCheckboxChange('type', type.value, e.target.checked)}
                    className="rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700">Experience Level</label>
            </div>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(level.value)}
                    onChange={(e) => handleCheckboxChange('experience', level.value, e.target.checked)}
                    className="rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700">Department</label>
            </div>
            <div className="space-y-2">
              {departments.map((dept) => (
                <label key={dept.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.department.includes(dept.value)}
                    onChange={(e) => handleCheckboxChange('department', dept.value, e.target.checked)}
                    className="rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{dept.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <label className="text-sm font-medium text-slate-700">Salary Range (USD)</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Min</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.salaryMin || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    salaryMin: parseInt(e.target.value) || 0 
                  })}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Max</label>
                <Input
                  type="number"
                  placeholder="200000"
                  value={filters.salaryMax || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    salaryMax: parseInt(e.target.value) || 200000 
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFiltersComponent;