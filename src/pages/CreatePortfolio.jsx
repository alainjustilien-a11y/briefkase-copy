import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "../components/create/FileUpload";
import ProcessingState from "../components/create/ProcessingState";
import TemplateSelector from "../components/create/TemplateSelector";
import PortfolioPreview from "../components/create/PortfolioPreview";

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [step, setStep] = useState('upload');

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Salesperson.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salespeople'] });
      navigate(createPageUrl("Dashboard"));
    },
    onError: (error) => {
      console.error("Error saving portfolio:", error);
      alert("Failed to save portfolio. Please try again.");
    }
  });

  const handleProcess = async () => {
    if (!resumeFile || !photoFile) return;
    
    setProcessing(true);
    setStep('processing');

    try {
      console.log("Uploading files...");
      const [resumeUpload, photoUpload] = await Promise.all([
        base44.integrations.Core.UploadFile({ file: resumeFile }),
        base44.integrations.Core.UploadFile({ file: photoFile })
      ]);

      console.log("Files uploaded:", resumeUpload, photoUpload);
      
      const schema = {
        type: "object",
        properties: {
          full_name: { type: "string" },
          title: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          summary: { type: "string" },
          experience: {
            type: "array",
            items: {
              type: "object",
              properties: {
                company: { type: "string" },
                position: { type: "string" },
                duration: { type: "string" },
                achievements: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            }
          },
          skills: {
            type: "array",
            items: { type: "string" }
          },
          achievements: {
            type: "array",
            items: { type: "string" }
          },
          education: {
            type: "array",
            items: {
              type: "object",
              properties: {
                degree: { type: "string" },
                institution: { type: "string" },
                year: { type: "string" }
              }
            }
          }
        }
      };
      
      console.log("Extracting data from resume...");
      const extractResult = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url: resumeUpload.file_url,
        json_schema: schema
      });

      console.log("Extract result:", extractResult);

      if (extractResult.status === 'success') {
        const data = {
          ...extractResult.output,
          photo_url: photoUpload.file_url,
          resume_url: resumeUpload.file_url,
          template: selectedTemplate
        };
        console.log("Extracted data:", data);
        setExtractedData(data);
        setStep('template');
      } else {
        console.error("Extraction failed:", extractResult);
        alert("Failed to extract data from resume: " + (extractResult.details || "Unknown error"));
        setStep('upload');
      }
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files: " + error.message);
      setStep('upload');
    }
    
    setProcessing(false);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setExtractedData(prev => ({ ...prev, template }));
    setStep('preview');
  };

  const handleSave = (editedData) => {
    createMutation.mutate({ ...editedData, template: selectedTemplate });
  };

  const getStepTitle = () => {
    switch(step) {
      case 'upload': return 'Upload Files';
      case 'processing': return 'Processing...';
      case 'template': return 'Choose Template';
      case 'preview': return 'Review & Edit';
      default: return 'Create Portfolio';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="mb-4 hover:bg-slate-100 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            {getStepTitle()}
          </h1>
          <p className="text-slate-600 text-lg">
            {step === 'upload' && 'Upload resume and photo to generate a stunning portfolio'}
            {step === 'processing' && 'Extracting information from your resume...'}
            {step === 'template' && 'Select a design template that matches your style'}
            {step === 'preview' && 'Review and customize your portfolio details'}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`flex-1 h-2 rounded-full transition-all ${step === 'upload' || step === 'processing' ? 'bg-slate-900' : 'bg-slate-300'}`} />
            <div className={`flex-1 h-2 rounded-full transition-all ${step === 'template' ? 'bg-slate-900' : 'bg-slate-300'}`} />
            <div className={`flex-1 h-2 rounded-full transition-all ${step === 'preview' ? 'bg-slate-900' : 'bg-slate-300'}`} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <FileUpload
              key="upload"
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
              onProcess={handleProcess}
              processing={processing}
            />
          )}

          {step === 'processing' && (
            <ProcessingState key="processing" />
          )}

          {step === 'template' && extractedData && (
            <TemplateSelector
              key="template"
              selectedTemplate={selectedTemplate}
              onSelect={handleTemplateSelect}
              previewData={extractedData}
            />
          )}

          {step === 'preview' && extractedData && (
            <PortfolioPreview
              key="preview"
              data={extractedData}
              onSave={handleSave}
              onBack={() => setStep('template')}
              isSaving={createMutation.isPending}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}