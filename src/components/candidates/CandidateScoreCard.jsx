import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Mail, ExternalLink, FileText } from "lucide-react";

export default function CandidateScoreCard({ candidate, index }) {
  const [expanded, setExpanded] = useState(false);

  const getRiskColor = (indicator) => {
    switch (indicator) {
      case 'Green': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', emoji: '🟢' };
      case 'Yellow': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', emoji: '🟡' };
      case 'Red': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', emoji: '🔴' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', emoji: '⚪' };
    }
  };

  const riskColors = getRiskColor(candidate.risk_indicator);

  const categories = [
    { 
      label: "Career Consistency", 
      score: candidate.career_consistency_score || 0, 
      max: 25,
      color: "bg-blue-500"
    },
    { 
      label: "Skill Proof & Evidence", 
      score: candidate.skill_proof_score || 0, 
      max: 25,
      color: "bg-purple-500"
    },
    { 
      label: "Role Alignment", 
      score: candidate.role_alignment_score || 0, 
      max: 20,
      color: "bg-amber-500"
    },
    { 
      label: "Professional Presence", 
      score: candidate.professional_presence_score || 0, 
      max: 15,
      color: "bg-green-500"
    },
    { 
      label: "Data Completeness", 
      score: candidate.data_completeness_score || 0, 
      max: 15,
      color: "bg-pink-500"
    }
  ];

  const trustScore = candidate.career_trust_score || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-8 hover:shadow-lg transition-all duration-300 border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Candidate Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {candidate.full_name}
                </h3>
                {candidate.target_role && (
                  <p className="text-lg text-slate-600 mb-1">{candidate.target_role}</p>
                )}
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Score Display */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Career Trust Score</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${riskColors.bg} ${riskColors.text} border ${riskColors.border}`}>
                  {riskColors.emoji} {candidate.risk_indicator || 'Not Scored'}
                </span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-slate-900">{trustScore}</span>
                <span className="text-2xl text-slate-400 mb-2">/ 100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trustScore}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${
                    trustScore >= 80 ? 'bg-green-500' :
                    trustScore >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-3">
              {categories.map((category, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{category.label}</span>
                    <span className="text-sm font-bold text-slate-900">
                      {category.score} / {category.max}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.score / category.max) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                      className={`h-full rounded-full ${category.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Summary */}
            {candidate.analysis_summary && (
              <div className="mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setExpanded(!expanded)}
                  className="w-full justify-between hover:bg-slate-100 rounded-xl p-4"
                >
                  <span className="font-semibold text-slate-900">Why this score?</span>
                  {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </Button>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {candidate.analysis_summary}
                    </p>
                    <p className="text-xs text-slate-500 mt-4 italic">
                      This score supports hiring discussions and does not replace interviews or background checks.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-3 lg:w-48">
            {candidate.resume_file && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(candidate.resume_file, '_blank')}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </Button>
            )}
            {candidate.linkedin_url && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(candidate.linkedin_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = `mailto:${candidate.email}`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}