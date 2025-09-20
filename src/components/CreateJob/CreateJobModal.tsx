import React, { useState } from 'react';
import { Plus, X, DollarSign, Calendar, MapPin, Building2 } from 'lucide-react';
import { Modal } from '../ui/modal.tsx';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import type { CreateJobData } from '../../mocks/types/jobs1';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: CreateJobData) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<CreateJobData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    experience: 'mid',
    salaryMin: 0,
    salaryMax: 0,
    currency: 'USD',
    description: '',
    requirements: [''],
    benefits: [''],
    deadline: '',
    department: ''
  });

  const [errors, setErrors] = useState<Partial<CreateJobData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateJobData> = {};

    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';
    if (formData.salaryMin >= formData.salaryMax) {
      newErrors.salaryMin = 0;
      alert('Minimum salary must be less than maximum salary');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Filter out empty requirements and benefits
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim())
      };
      
      onSubmit(cleanedData);
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'full-time',
        experience: 'mid',
        salaryMin: 0,
        salaryMax: 0,
        currency: 'USD',
        description: '',
        requirements: [''],
        benefits: [''],
        deadline: '',
        department: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleArrayInputChange = (
    field: 'requirements' | 'benefits',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayInput = (field: 'requirements' | 'benefits') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayInput = (field: 'requirements' | 'benefits', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Job Posting" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Job Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior Frontend Developer"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Building2 className="inline h-4 w-4 mr-1" />
              Company *
            </label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. TechCorp Inc."
              className={errors.company ? 'border-red-500' : ''}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Location *
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. San Francisco, CA or Remote"
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department *
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department:e.target.value })}
              className={errors.department ? 'border-red-500' : ''}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Job Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value as any })}
            >
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </div>

        {/* Salary Information */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Salary Range *
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Minimum"
                value={formData.salaryMin || ''}
                onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) || 0 })}
                className={errors.salaryMin ? 'border-red-500' : ''}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Maximum"
                value={formData.salaryMax || ''}
                onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          {errors.salaryMin && <p className="text-red-500 text-xs mt-1">{errors.salaryMin}</p>}
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Application Deadline *
          </label>
          <Input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className={errors.deadline ? 'border-red-500' : ''}
          />
          {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Job Description *
          </label>
          <Textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the role, responsibilities, and what makes this position exciting..."
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Requirements
          </label>
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={req}
                  onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                  placeholder="e.g. 5+ years of React experience"
                />
                {formData.requirements.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayInput('requirements', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayInput('requirements')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Requirement
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Benefits
          </label>
          <div className="space-y-2">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleArrayInputChange('benefits', index, e.target.value)}
                  placeholder="e.g. Health Insurance"
                />
                {formData.benefits.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayInput('benefits', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayInput('benefits')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Benefit
            </Button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Job Posting
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateJobModal;