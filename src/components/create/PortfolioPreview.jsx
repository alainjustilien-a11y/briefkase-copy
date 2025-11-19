import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, X, Plus, Trash2 } from "lucide-react";

export default function PortfolioPreview({ data, onSave, onBack, isSaving }) {
  const [editedData, setEditedData] = useState(data);

  const updateField = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...(editedData[field] || [])];
    newArray[index] = value;
    setEditedData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field, emptyItem) => {
    setEditedData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), emptyItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-8 bg-white border-slate-200 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Edit Portfolio</h2>
          <p className="text-slate-600">Make any necessary adjustments before saving</p>
        </div>

        <div className="space-y-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Full Name</Label>
              <Input
                value={editedData.full_name || ''}
                onChange={(e) => updateField('full_name', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Title</Label>
              <Input
                value={editedData.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Email</Label>
              <Input
                type="email"
                value={editedData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Phone</Label>
              <Input
                value={editedData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label className="text-slate-700 font-semibold mb-2">Professional Summary</Label>
            <Textarea
              value={editedData.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
              className="rounded-xl min-h-32"
            />
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Skills</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('skills', '')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedData.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-1 bg-slate-100 rounded-lg px-3 py-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateArrayItem('skills', index, e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-32"
                  />
                  <button
                    onClick={() => removeArrayItem('skills', index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Key Achievements</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('achievements', '')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Achievement
              </Button>
            </div>
            <div className="space-y-2">
              {editedData.achievements?.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateArrayItem('achievements', index, e.target.value)}
                    className="rounded-lg flex-1"
                    placeholder="e.g., +15% sales to goal achievement"
                  />
                  <button
                    onClick={() => removeArrayItem('achievements', index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 30-60-90 Day Plan */}
          <div>
            <Label className="text-slate-700 font-semibold mb-3 block">30-60-90 Day Plan</Label>
            <div className="grid md:grid-cols-3 gap-4">
              {/* 30 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">30 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_30?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_30?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_30?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>

              {/* 60 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">60 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_60?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_60?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_60?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>

              {/* 90 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">90 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_90?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_90?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_90?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Experience</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', achievements: [] })}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {editedData.experience?.map((exp, index) => (
                <Card key={index} className="p-4 bg-slate-50 border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-900">Experience {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('experience', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Position"
                      value={exp.position || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], position: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], company: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                    <Input
                      placeholder="Duration (e.g., 2020-2023)"
                      value={exp.duration || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], duration: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 rounded-xl py-6"
            disabled={isSaving}
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={() => onSave(editedData)}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Portfolio
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}