import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function InterviewForm({ interview, candidates, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    candidate_id: interview?.candidate_id || '',
    candidate_name: interview?.candidate_name || '',
    interview_date: interview?.interview_date 
      ? new Date(interview.interview_date).toISOString().slice(0, 16)
      : '',
    interview_type: interview?.interview_type || 'phone_screen',
    interviewer: interview?.interviewer || '',
    status: interview?.status || 'scheduled',
    notes: interview?.notes || '',
    rating: interview?.rating || '',
    strengths: interview?.strengths || [],
    concerns: interview?.concerns || [],
    recommendation: interview?.recommendation || ''
  });

  const [newStrength, setNewStrength] = useState('');
  const [newConcern, setNewConcern] = useState('');

  useEffect(() => {
    if (formData.candidate_id && candidates.length > 0) {
      const candidate = candidates.find(c => c.id === formData.candidate_id);
      if (candidate) {
        setFormData(prev => ({ ...prev, candidate_name: candidate.full_name }));
      }
    }
  }, [formData.candidate_id, candidates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      interview_date: new Date(formData.interview_date).toISOString(),
      rating: formData.rating ? Number(formData.rating) : undefined
    };
    onSubmit(submitData);
  };

  const addStrength = () => {
    if (newStrength.trim()) {
      setFormData(prev => ({
        ...prev,
        strengths: [...prev.strengths, newStrength.trim()]
      }));
      setNewStrength('');
    }
  };

  const addConcern = () => {
    if (newConcern.trim()) {
      setFormData(prev => ({
        ...prev,
        concerns: [...prev.concerns, newConcern.trim()]
      }));
      setNewConcern('');
    }
  };

  const removeStrength = (index) => {
    setFormData(prev => ({
      ...prev,
      strengths: prev.strengths.filter((_, i) => i !== index)
    }));
  };

  const removeConcern = (index) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {interview ? 'Edit Interview' : 'Schedule New Interview'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Candidate *
              </label>
              <Select
                value={formData.candidate_id}
                onValueChange={(value) => setFormData({ ...formData, candidate_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  {candidates.map((candidate) => (
                    <SelectItem key={candidate.id} value={candidate.id}>
                      {candidate.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Date & Time *
              </label>
              <Input
                type="datetime-local"
                value={formData.interview_date}
                onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Type
              </label>
              <Select
                value={formData.interview_type}
                onValueChange={(value) => setFormData({ ...formData, interview_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone_screen">Phone Screen</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="panel">Panel</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interviewer
              </label>
              <Input
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating (1-5)
              </label>
              <Input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="1-5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Recommendation
            </label>
            <Select
              value={formData.recommendation}
              onValueChange={(value) => setFormData({ ...formData, recommendation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strong_yes">Strong Yes</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="maybe">Maybe</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="strong_no">Strong No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Interview notes and observations..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Strengths
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newStrength}
                  onChange={(e) => setNewStrength(e.target.value)}
                  placeholder="Add strength..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStrength())}
                />
                <Button type="button" onClick={addStrength} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.strengths.map((strength, i) => (
                  <div key={i} className="flex items-center justify-between bg-green-50 rounded-lg p-2 border border-green-200">
                    <span className="text-sm text-green-900">{strength}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStrength(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Concerns
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newConcern}
                  onChange={(e) => setNewConcern(e.target.value)}
                  placeholder="Add concern..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConcern())}
                />
                <Button type="button" onClick={addConcern} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.concerns.map((concern, i) => (
                  <div key={i} className="flex items-center justify-between bg-red-50 rounded-lg p-2 border border-red-200">
                    <span className="text-sm text-red-900">{concern}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeConcern(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-slate-900 hover:bg-slate-800">
              {isSubmitting ? 'Saving...' : (interview ? 'Update Interview' : 'Schedule Interview')}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}