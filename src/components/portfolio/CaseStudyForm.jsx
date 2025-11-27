import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { X, Plus, Trash2, Save, BookOpen } from "lucide-react";

export default function CaseStudyForm({ caseStudy, onSave, onClose }) {
  const [formData, setFormData] = useState(caseStudy || {
    client_name: "",
    problem: "",
    strategy: "",
    execution: "",
    results: [
      { metric: "", label: "" },
      { metric: "", label: "" },
      { metric: "", label: "" },
      { metric: "", label: "" }
    ]
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResultChange = (index, field, value) => {
    setFormData(prev => {
      const newResults = [...prev.results];
      newResults[index] = { ...newResults[index], [field]: value };
      return { ...prev, results: newResults };
    });
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: "", label: "" }]
    }));
  };

  const removeResult = (index) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Edit Case Study</h2>
              <p className="text-slate-500 text-sm">Tell the story of your biggest win</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Client / Company Name
            </label>
            <Input
              value={formData.client_name}
              onChange={(e) => handleChange("client_name", e.target.value)}
              placeholder="e.g., Fortune 500 Tech Company"
              className="h-12"
            />
            <p className="text-xs text-slate-500 mt-1">You can use a general description if you need to keep it confidential</p>
          </div>

          {/* The Problem */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              The Problem
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.problem}
              onChange={(e) => handleChange("problem", e.target.value)}
              placeholder="Describe the challenge or problem the client was facing..."
              className="min-h-[100px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Enterprise client struggling with legacy system migration, causing 40% productivity loss across 500+ users."</p>
          </div>

          {/* The Strategy */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Strategy
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.strategy}
              onChange={(e) => handleChange("strategy", e.target.value)}
              placeholder="What approach did you take to solve this?"
              className="min-h-[100px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Developed phased implementation approach with dedicated success team and custom training program."</p>
          </div>

          {/* The Execution */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              The Execution
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.execution}
              onChange={(e) => handleChange("execution", e.target.value)}
              placeholder="How did you implement the solution?"
              className="min-h-[100px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Led cross-functional team of 8 through 6-month deployment with weekly stakeholder reviews."</p>
          </div>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Key Results & Metrics
                </label>
                <p className="text-xs text-slate-500">Add 3-4 impactful metrics that showcase your success</p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addResult}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Metric
              </Button>
            </div>
            
            <div className="grid gap-3">
              {formData.results.map((result, index) => (
                <Card key={index} className="p-4 border border-slate-200">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input
                        value={result.metric}
                        onChange={(e) => handleResultChange(index, "metric", e.target.value)}
                        placeholder="e.g., $2.4M, 85%, 3x"
                        className="mb-2 font-bold"
                      />
                      <Input
                        value={result.label}
                        onChange={(e) => handleResultChange(index, "label", e.target.value)}
                        placeholder="e.g., Contract Value, Adoption Rate, ROI Achieved"
                        className="text-sm"
                      />
                    </div>
                    {formData.results.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResult(index)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <h4 className="text-amber-400 font-semibold text-sm mb-4">PREVIEW: Results Section</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.results.filter(r => r.metric || r.label).map((result, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{result.metric || "—"}</div>
                  <div className="text-slate-400 text-sm">{result.label || "Label"}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Case Study
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}