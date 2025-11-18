import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import FileUpload from "../components/create/FileUpload";
import ProcessingState from "../components/create/ProcessingState";
import PortfolioPreview from "../components/create/PortfolioPreview";

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [step, setStep] = useState('upload');

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Salesperson.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salespeople'] });
      navigate(createPageUrl("Dashboard"));
    },
    onError: (error) => {
      toast.error("Failed to save portfolio. Please try again.");
      console.error("Error saving portfolio:", error);
    }
  });

  const handleProcess = async () => {
    if (!resumeFile || !photoFile) return;
    
    setProcessing(true);
    setStep('processing');

    try {
      const [resumeUpload, photoUpload] = await Promise.all([
        base44.integrations.Core.UploadFile({ file: resumeFile }),
        base44.integrations.Core.UploadFile({ file: photoFile })
      ]);

      const schema = await base44.entities.Salesperson.schema();
      
      const extractResult = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url: resumeUpload.file_url,
        json_schema: schema
      });

      if (extractResult.status === 'success') {
        const data = {
          ...extractResult.output,
          photo_url: photoUpload.file_url,
          resume_url: resumeUpload.file_url
        };
        setExtractedData(data);
        setStep('preview');
      } else {
        toast.error("Failed to extract data from resume. Please try again.");
        setStep('upload');
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Error processing files. Please try again.");
      setStep('upload');
    }
    
    setProcessing(false);
  };

  const handleSave = (editedData) => {
    createMutation.mutate(editedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
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
            Create Portfolio
          </h1>
          <p className="text-slate-600 text-lg">
            Upload resume and photo to generate a stunning portfolio
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <FileUpload
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
              onProcess={handleProcess}
              processing={processing}
            />
          )}

          {step === 'processing' && (
            <ProcessingState />
          )}

          {step === 'preview' && extractedData && (
            <PortfolioPreview
              data={extractedData}
              onSave={handleSave}
              onBack={() => setStep('upload')}
              isSaving={createMutation.isPending}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}