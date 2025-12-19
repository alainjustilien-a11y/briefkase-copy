import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Star, Edit, ThumbsUp, ThumbsDown } from "lucide-react";
import { format } from "date-fns";

export default function InterviewCard({ interview, index, onEdit }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'no_show': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      phone_screen: 'Phone Screen',
      technical: 'Technical',
      behavioral: 'Behavioral',
      panel: 'Panel',
      final: 'Final'
    };
    return types[type] || type;
  };

  const getRecommendationDisplay = (rec) => {
    const recommendations = {
      strong_yes: { label: 'Strong Yes', color: 'text-green-600', icon: ThumbsUp },
      yes: { label: 'Yes', color: 'text-green-500', icon: ThumbsUp },
      maybe: { label: 'Maybe', color: 'text-yellow-600', icon: null },
      no: { label: 'No', color: 'text-red-500', icon: ThumbsDown },
      strong_no: { label: 'Strong No', color: 'text-red-600', icon: ThumbsDown }
    };
    return recommendations[rec] || { label: rec, color: 'text-slate-600', icon: null };
  };

  const recommendation = interview.recommendation ? getRecommendationDisplay(interview.recommendation) : null;
  const Icon = recommendation?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {interview.candidate_name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge className={`${getStatusColor(interview.status)} border`}>
                    {interview.status?.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-slate-300">
                    {getTypeLabel(interview.interview_type)}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(interview.interview_date), 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {format(new Date(interview.interview_date), 'h:mm a')}
                  </span>
                  {interview.interviewer && (
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {interview.interviewer}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(interview)}
                className="hover:bg-slate-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {interview.rating && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-slate-600">Rating:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < interview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {recommendation && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-slate-600">Recommendation:</span>
                <span className={`flex items-center gap-1 font-semibold ${recommendation.color}`}>
                  {Icon && <Icon className="w-4 h-4" />}
                  {recommendation.label}
                </span>
              </div>
            )}

            {interview.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Notes:</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {interview.notes}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {interview.strengths && interview.strengths.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-2">Strengths:</h4>
                  <ul className="space-y-1">
                    {interview.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {interview.concerns && interview.concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-2">Concerns:</h4>
                  <ul className="space-y-1">
                    {interview.concerns.map((concern, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">-</span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}