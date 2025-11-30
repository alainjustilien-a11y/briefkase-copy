import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sparkles, Wand2, RefreshCw, Check, ChevronDown, ChevronUp, Target, FileText, Calendar } from "lucide-react";

// Summary Tone Generator
export function SummaryEnhancer({ currentSummary, experience, title, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const generateVariations = async () => {
    setLoading(true);
    setExpanded(true);
    
    const context = `Title: ${title}\nExperience: ${experience?.map(e => `${e.position} at ${e.company}`).join(', ') || 'Not provided'}\nCurrent Summary: ${currentSummary || 'Not provided'}`;
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate 3 variations of a professional sales portfolio summary based on this person's background. Each variation should have a different tone and style.

${context}

Create summaries that are 2-3 sentences each, highlighting sales expertise and achievements. Return exactly 3 variations.`,
      response_json_schema: {
        type: "object",
        properties: {
          formal: { type: "string", description: "Professional, executive tone" },
          energetic: { type: "string", description: "Dynamic, results-driven tone" },
          concise: { type: "string", description: "Brief, impactful tone" }
        }
      }
    });

    setVariations([
      { label: "Formal", tone: "Professional & Executive", text: result.formal },
      { label: "Energetic", tone: "Dynamic & Results-Driven", text: result.energetic },
      { label: "Concise", tone: "Brief & Impactful", text: result.concise }
    ]);
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={generateVariations}
        disabled={loading}
        className="rounded-lg text-amber-600 border-amber-200 hover:bg-amber-50"
      >
        {loading ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        {loading ? "Generating..." : "Generate AI Variations"}
      </Button>

      {variations.length > 0 && (
        <div className="mt-3 space-y-2">
          {variations.map((v, i) => (
            <Card
              key={i}
              className="p-3 cursor-pointer hover:border-amber-400 transition-all"
              onClick={() => onSelect(v.text)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-amber-600 uppercase">{v.label}</span>
                  <span className="text-xs text-slate-400 ml-2">{v.tone}</span>
                  <p className="text-sm text-slate-700 mt-1">{v.text}</p>
                </div>
                <Check className="w-4 h-4 text-slate-300 hover:text-amber-500 flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Skills Suggester
export function SkillsSuggester({ currentSkills, experience, title, onAddSkill }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const suggestSkills = async () => {
    setLoading(true);
    setExpanded(true);
    
    const context = `Title: ${title}\nExperience: ${JSON.stringify(experience || [])}\nCurrent Skills: ${currentSkills?.join(', ') || 'None listed'}`;
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Based on this sales professional's background, suggest 10 relevant skills and keywords that would strengthen their portfolio and help with ATS systems.

${context}

Focus on:
- Sales methodologies (MEDDIC, SPIN, Challenger, etc.)
- CRM and sales tools
- Industry-specific skills
- Soft skills valuable in sales

Only suggest skills NOT already in their current skills list.`,
      response_json_schema: {
        type: "object",
        properties: {
          skills: { 
            type: "array", 
            items: { type: "string" },
            description: "List of 10 suggested skills"
          }
        }
      }
    });

    setSuggestions(result.skills || []);
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={suggestSkills}
        disabled={loading}
        className="rounded-lg text-amber-600 border-amber-200 hover:bg-amber-50"
      >
        {loading ? (
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Target className="w-4 h-4 mr-2" />
        )}
        {loading ? "Analyzing..." : "Suggest Skills with AI"}
      </Button>

      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((skill, i) => (
            <button
              key={i}
              onClick={() => {
                onAddSkill(skill);
                setSuggestions(suggestions.filter((_, idx) => idx !== i));
              }}
              className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm hover:bg-amber-100 transition-colors flex items-center gap-1"
            >
              <span>+ {skill}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 30-60-90 Day Plan Generator
export function DayPlanGenerator({ title, experience, currentPlan, onApply }) {
  const [loading, setLoading] = useState(false);
  const [targetJob, setTargetJob] = useState("");
  const [industry, setIndustry] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    setExpanded(true);
    
    const context = `Current Title: ${title}\nTarget Role: ${targetJob || title}\nIndustry: ${industry || 'General Sales'}\nExperience: ${experience?.map(e => `${e.position} at ${e.company}`).join(', ') || 'Sales professional'}`;
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Create a compelling 30-60-90 day plan for a sales professional transitioning into a new role.

${context}

The plan should be specific, actionable, and tailored to the target role/industry. Each phase should have:
- A clear title
- A subtitle describing the focus
- 4-5 specific action items

Make it impressive and show strategic thinking.`,
      response_json_schema: {
        type: "object",
        properties: {
          day_30: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              items: { type: "array", items: { type: "string" } }
            }
          },
          day_60: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              items: { type: "array", items: { type: "string" } }
            }
          },
          day_90: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              items: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    });

    setGeneratedPlan(result);
    setLoading(false);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-3">
        <Input
          placeholder="Target job title (optional)"
          value={targetJob}
          onChange={(e) => setTargetJob(e.target.value)}
          className="rounded-lg flex-1"
        />
        <Input
          placeholder="Industry (optional)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-lg flex-1"
        />
        <Button
          type="button"
          size="sm"
          onClick={generatePlan}
          disabled={loading}
          className="rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Calendar className="w-4 h-4" />
          )}
        </Button>
      </div>

      {generatedPlan && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-amber-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Generated Plan
            </span>
            <Button
              size="sm"
              onClick={() => onApply(generatedPlan)}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
            >
              <Check className="w-4 h-4 mr-1" />
              Apply Plan
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-3">
            {['day_30', 'day_60', 'day_90'].map((phase, i) => (
              <div key={phase} className="bg-white rounded-lg p-3">
                <div className="font-semibold text-slate-900">{generatedPlan[phase]?.title}</div>
                <div className="text-xs text-slate-500 mb-2">{generatedPlan[phase]?.subtitle}</div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {generatedPlan[phase]?.items?.slice(0, 3).map((item, j) => (
                    <li key={j} className="flex items-start gap-1">
                      <span className="text-amber-500">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                  {generatedPlan[phase]?.items?.length > 3 && (
                    <li className="text-slate-400">+{generatedPlan[phase].items.length - 3} more...</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}