import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function PortfolioSummary() {
  const urlParams = new URLSearchParams(window.location.search);
  const personId = urlParams.get('id');

  const { data: person, isLoading } = useQuery({
    queryKey: ['salesperson', personId],
    queryFn: () => base44.entities.Salesperson.filter({ id: personId }),
    enabled: !!personId,
    select: (data) => data?.[0],
  });

  const handlePrint = () => {
    toast.info("Select 'Save as PDF' in the print dialog");
    setTimeout(() => window.print(), 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Portfolio not found</p>
      </div>
    );
  }

  const initials = person.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'SP';

  return (
    <div className="bg-white min-h-screen">
      {/* Action Bar - Hidden in Print */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between print:hidden">
        <Link to={createPageUrl(`Portfolio?id=${personId}`)}>
          <Button variant="outline" className="bg-white shadow-lg rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </Link>
        <Button onClick={handlePrint} className="bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg rounded-full">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Page 1: Cover */}
      <div className="page-break bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[100vh] flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl">
            {person.photo_url ? (
              <img src={person.photo_url} alt={person.full_name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-slate-900">{initials}</span>
            )}
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">{person.full_name}</h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-amber-500" />
            <span className="text-lg text-amber-400 font-medium tracking-widest uppercase">Sales Portfolio</span>
            <div className="w-12 h-0.5 bg-amber-500" />
          </div>
          <p className="text-xl text-slate-300">{person.title}</p>
        </div>
      </div>

      {/* Page 2: Dashboard */}
      <div className="page-break bg-white min-h-[100vh] p-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Sales Dashboard</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Quota Attainment", value: "142%" },
            { label: "Revenue Closed", value: "$2.8M" },
            { label: "Pipeline Created", value: "$5.2M" },
            { label: "Win Rate", value: "34%" },
          ].map((kpi, i) => (
            <div key={i} className="bg-slate-900 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">{kpi.value}</div>
              <div className="text-slate-400 text-sm">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 3: Experience */}
      {person.experience?.length > 0 && (
        <div className="page-break bg-slate-50 min-h-[100vh] p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Experience</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {person.experience.map((exp, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                <p className="text-amber-600 font-medium">{exp.company}</p>
                <p className="text-slate-500 text-sm mb-3">{exp.duration}</p>
                {exp.achievements?.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="text-slate-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page 4: Case Study */}
      {person.case_study && (
        <div className="page-break bg-white min-h-[100vh] p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">{person.case_study.headline || "Case Study"}</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-6">
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Client Goal</div>
                <div className="text-slate-900">{person.case_study.challenge}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Solution</div>
                <div className="text-slate-900">{person.case_study.solution}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Your Role</div>
                <div className="text-slate-900">{person.case_study.role}</div>
              </div>
            </div>

            {person.case_study.results?.length > 0 && (
              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {person.case_study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-1">{result.metric}</div>
                      <div className="text-slate-400 text-sm">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page 5: Skills */}
      {person.skills?.length > 0 && (
        <div className="page-break bg-slate-50 min-h-[100vh] p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Skills & Competencies</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {person.skills.map((skill, i) => (
              <span key={i} className="bg-amber-500 text-slate-900 px-5 py-2 rounded-full font-semibold">
                {skill}
              </span>
            ))}
          </div>

          {person.achievements?.length > 0 && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Key Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {person.achievements.map((achievement, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 flex items-start gap-3">
                    <span className="text-amber-500 text-xl">★</span>
                    <span className="text-slate-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Page 6: 30-60-90 Day Plan */}
      {person.day_plan && (
        <div className="page-break bg-white min-h-[100vh] p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">30-60-90 Day Plan</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {['day_30', 'day_60', 'day_90'].map((key, i) => {
              const plan = person.day_plan[key];
              if (!plan) return null;
              return (
                <div key={key} className="bg-slate-900 rounded-2xl p-6">
                  <div className="text-amber-400 font-bold text-lg mb-1">{plan.title || `${(i + 1) * 30} Days`}</div>
                  <div className="text-slate-400 text-sm mb-4">{plan.subtitle}</div>
                  <ul className="space-y-2">
                    {plan.items?.map((item, j) => (
                      <li key={j} className="text-white text-sm flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Page 7: Contact */}
      <div className="page-break bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[100vh] flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-xl text-slate-300 mb-8">Ready to bring results-driven sales leadership to your team?</p>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            {person.email && (
              <div className="text-lg text-slate-300">{person.email}</div>
            )}
            {person.phone && (
              <div className="text-lg text-slate-300">{person.phone}</div>
            )}
          </div>

          <div className="text-3xl font-bold text-amber-400">Thank You</div>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-8" />
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          
          .page-break:last-child {
            page-break-after: avoid;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        }
        
        @page {
          size: A4 landscape;
          margin: 0;
        }
      `}</style>
    </div>
  );
}