import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ExecutiveTemplate from "../components/portfolio-templates/ExecutiveTemplate";
import ModernTemplate from "../components/portfolio-templates/ModernTemplate";
import CreativeTemplate from "../components/portfolio-templates/CreativeTemplate";
import ClassicTemplate from "../components/portfolio-templates/ClassicTemplate";
import BoldTemplate from "../components/portfolio-templates/BoldTemplate";
import ProfessionalBlueTemplate from "../components/portfolio-templates/ProfessionalBlueTemplate";
import PaginatedTemplate from "../components/portfolio-templates/PaginatedTemplate";
import MinimalistTemplate from "../components/portfolio-templates/MinimalistTemplate";
import DarkAnimatedTemplate from "../components/portfolio-templates/DarkAnimatedTemplate";
import VideoBackgroundTemplate from "../components/portfolio-templates/VideoBackgroundTemplate";
import BriefkasePremiumTemplate from "../components/portfolio-templates/BriefkasePremiumTemplate";
import TemplateSwitcher from "../components/portfolio/TemplateSwitcher";
import CaseStudyForm from "../components/portfolio/CaseStudyForm";
import PortfolioActions from "../components/portfolio/PortfolioActions";

const templates = {
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
  bold: BoldTemplate,
  professional_blue: ProfessionalBlueTemplate,
  paginated: PaginatedTemplate,
  minimalist: MinimalistTemplate,
  dark_animated: DarkAnimatedTemplate,
  video_background: VideoBackgroundTemplate,
  briefkase_premium: BriefkasePremiumTemplate,
};

export default function Portfolio() {
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const personId = urlParams.get('id');
  const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);
  const [showCaseStudyForm, setShowCaseStudyForm] = useState(false);

  const { data: person, isLoading, error } = useQuery({
    queryKey: ['salesperson', personId],
    queryFn: async () => {
      const people = await base44.entities.Salesperson.list();
      return people.find(p => p.id === personId);
    },
    enabled: !!personId,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: (template) => base44.entities.Salesperson.update(personId, { template }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesperson', personId] });
      setShowTemplateSwitcher(false);
    },
    onError: (error) => {
      console.error("Error updating template:", error);
      alert("Failed to update template. Please try again.");
    }
  });

  const updateCaseStudyMutation = useMutation({
    mutationFn: (caseStudy) => base44.entities.Salesperson.update(personId, { case_study: caseStudy }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesperson', personId] });
      setShowCaseStudyForm(false);
    },
    onError: (error) => {
      console.error("Error updating case study:", error);
      alert("Failed to update case study. Please try again.");
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4" />
          <div className="text-white text-xl">Loading portfolio...</div>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Portfolio not found</h2>
          <p className="text-slate-300 mb-4">The portfolio you're looking for doesn't exist</p>
          <Button onClick={() => window.location.href = '/'} className="bg-amber-400 text-slate-900 hover:bg-amber-500">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const templateKey = person.template || 'executive';
  const SelectedTemplate = templates[templateKey];

  if (!SelectedTemplate) {
    console.error('Template not found:', templateKey);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template Error</h2>
          <p className="mb-4">Template "{templateKey}" not found</p>
          <Button onClick={() => updateTemplateMutation.mutate('executive')}>
            Use Default Template
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SelectedTemplate 
        person={person} 
        onChangeTemplate={() => setShowTemplateSwitcher(true)}
        onEditCaseStudy={templateKey === 'briefkase_premium' ? () => setShowCaseStudyForm(true) : undefined}
      />

      <PortfolioActions person={person} />

      {showTemplateSwitcher && (
        <TemplateSwitcher
          currentTemplate={templateKey}
          onSelect={(template) => updateTemplateMutation.mutate(template)}
          onClose={() => setShowTemplateSwitcher(false)}
          person={person}
        />
      )}

      {showCaseStudyForm && (
        <CaseStudyForm
          caseStudy={person.case_study}
          onSave={(caseStudy) => updateCaseStudyMutation.mutate(caseStudy)}
          onClose={() => setShowCaseStudyForm(false)}
        />
      )}
    </>
  );
  }