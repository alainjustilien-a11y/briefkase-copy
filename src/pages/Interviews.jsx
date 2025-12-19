import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import InterviewCard from "../components/interviews/InterviewCard";
import InterviewForm from "../components/interviews/InterviewForm";

export default function Interviews() {
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const queryClient = useQueryClient();

  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: () => base44.entities.Interview.list('-interview_date'),
    initialData: [],
  });

  const { data: candidates } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => base44.entities.Candidate.list(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Interview.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      setShowForm(false);
      setEditingInterview(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Interview.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      setShowForm(false);
      setEditingInterview(null);
    },
  });

  const handleSubmit = (data) => {
    if (editingInterview) {
      updateMutation.mutate({ id: editingInterview.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (interview) => {
    setEditingInterview(interview);
    setShowForm(true);
  };

  const stats = {
    total: interviews.length,
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    cancelled: interviews.filter(i => i.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">
              HR Interviews
            </h1>
            <p className="text-slate-600 text-lg">
              Schedule and manage candidate interviews
            </p>
          </div>
          <Button 
            onClick={() => {
              setEditingInterview(null);
              setShowForm(!showForm);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg px-6 py-6 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Interview
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-sm text-slate-600">Total</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.scheduled}</div>
                <div className="text-sm text-slate-600">Scheduled</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.completed}</div>
                <div className="text-sm text-slate-600">Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.cancelled}</div>
                <div className="text-sm text-slate-600">Cancelled</div>
              </div>
            </div>
          </motion.div>
        </div>

        {showForm && (
          <InterviewForm
            interview={editingInterview}
            candidates={candidates}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingInterview(null);
            }}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {isLoading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No interviews scheduled</h3>
            <p className="text-slate-600 mb-8">Schedule your first candidate interview</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-xl text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Schedule Interview
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {interviews.map((interview, index) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                index={index}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}