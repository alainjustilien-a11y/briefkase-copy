import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";
import CandidateScoreCard from "../components/candidates/CandidateScoreCard";

export default function Candidates() {
  const { data: candidates, isLoading, error } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => base44.entities.Candidate.list('-created_date'),
    initialData: [],
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to load candidates</h2>
          <p className="text-slate-600 mb-4">Please refresh the page to try again</p>
          <Button onClick={() => window.location.reload()} className="bg-slate-900 hover:bg-slate-800">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

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
              Candidate Intelligence
            </h1>
            <p className="text-slate-600 text-lg">
              Career trust scores and candidate evaluations
            </p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("CareerAgent")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-6 rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                Evaluate Candidate
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{candidates.length}</div>
                <div className="text-sm text-slate-600">Total Candidates</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  {candidates.filter(c => c.risk_indicator === 'Green').length}
                </div>
                <div className="text-sm text-slate-600">Green Risk</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  {candidates.filter(c => c.career_trust_score).length > 0
                    ? Math.round(
                        candidates
                          .filter(c => c.career_trust_score)
                          .reduce((sum, c) => sum + c.career_trust_score, 0) /
                        candidates.filter(c => c.career_trust_score).length
                      )
                    : 0}
                </div>
                <div className="text-sm text-slate-600">Avg Trust Score</div>
              </div>
            </div>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No candidates yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Start evaluating candidates with the Career Intelligence Agent
            </p>
            <Link to={createPageUrl("CareerAgent")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-xl text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Evaluate First Candidate
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {candidates.map((candidate, index) => (
              <CandidateScoreCard key={candidate.id} candidate={candidate} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}