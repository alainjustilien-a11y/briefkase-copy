import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, Mail, Phone, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

export default function PortfolioSummary() {
  const urlParams = new URLSearchParams(window.location.search);
  const personId = urlParams.get('id');
  
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPerson() {
      if (!personId) {
        setError('No ID provided');
        setIsLoading(false);
        return;
      }
      
      try {
        const people = await base44.entities.Salesperson.filter({ id: personId });
        if (people && people.length > 0) {
          setPerson(people[0]);
        } else {
          setError('Portfolio not found');
        }
      } catch (err) {
        console.error('Error loading portfolio:', err);
        setError(err.message);
      }
      setIsLoading(false);
    }
    
    loadPerson();
  }, [personId]);

  const handlePrint = () => {
    toast.info("Select 'Save as PDF' in the print dialog");
    setTimeout(() => window.print(), 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg text-slate-600 mb-4">{error || 'Portfolio not found'}</p>
          <Link to={createPageUrl('Dashboard')}>
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const initials = person.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'SP';

  // Build pages array dynamically
  const pages = [];

  // Page 1: Cover - Always show
  pages.push(
    <div key="cover" className="slide bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-12">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl overflow-hidden">
          {person.photo_url ? (
            <img src={person.photo_url} alt={person.full_name} className="w-full h-full object-cover" />
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
  );

  // Page 2: Dashboard - Always show
  pages.push(
    <div key="dashboard" className="slide bg-white flex flex-col items-center justify-center p-12">
      <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Sales Dashboard</h2>
      <div className="w-20 h-1 bg-amber-500 mx-auto mb-12" />
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
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
  );

  // Page 3: Experience
  if (person.experience?.length > 0) {
    pages.push(
      <div key="experience" className="slide bg-slate-50 flex flex-col p-12 overflow-auto">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Experience</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {person.experience.slice(0, 3).map((exp, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
              <p className="text-amber-600 font-medium text-sm">{exp.company} • {exp.duration}</p>
              {exp.achievements?.slice(0, 2).map((achievement, j) => (
                <p key={j} className="text-slate-600 text-sm mt-2 flex items-start gap-2">
                  <span className="text-amber-500">•</span>{achievement}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Page 4: Case Study
  if (person.case_study) {
    pages.push(
      <div key="casestudy" className="slide bg-white flex flex-col p-12 overflow-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">{person.case_study.headline || "Case Study"}</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6" />
        <div className="max-w-4xl mx-auto w-full space-y-4">
          <div className="grid grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4">
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Challenge</div>
              <div className="text-slate-900 text-sm">{person.case_study.challenge}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Solution</div>
              <div className="text-slate-900 text-sm">{person.case_study.solution}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Role</div>
              <div className="text-slate-900 text-sm">{person.case_study.role}</div>
            </div>
          </div>
          {person.case_study.results?.length > 0 && (
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Results</h3>
              <div className="grid grid-cols-4 gap-4">
                {person.case_study.results.slice(0, 4).map((result, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-amber-400">{result.metric}</div>
                    <div className="text-slate-400 text-xs">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Page 5: Skills
  if (person.skills?.length > 0) {
    pages.push(
      <div key="skills" className="slide bg-slate-50 flex flex-col items-center justify-center p-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">Skills & Competencies</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
          {person.skills.map((skill, i) => (
            <span key={i} className="bg-amber-500 text-slate-900 px-5 py-2 rounded-full font-semibold">
              {skill}
            </span>
          ))}
        </div>
        {person.achievements?.length > 0 && (
          <div className="mt-8 w-full max-w-4xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Key Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {person.achievements.slice(0, 4).map((achievement, i) => (
                <div key={i} className="bg-white rounded-xl p-3 flex items-start gap-2">
                  <span className="text-amber-500">★</span>
                  <span className="text-slate-700 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Page 6: 30-60-90 Day Plan
  if (person.day_plan) {
    pages.push(
      <div key="dayplan" className="slide bg-white flex flex-col items-center justify-center p-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 text-center">30-60-90 Day Plan</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
        <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
          {['day_30', 'day_60', 'day_90'].map((key, i) => {
            const plan = person.day_plan[key];
            if (!plan) return <div key={key} />;
            return (
              <div key={key} className="bg-slate-900 rounded-2xl p-5">
                <div className="text-amber-400 font-bold text-lg mb-1">{plan.title || `${(i + 1) * 30} Days`}</div>
                <div className="text-slate-400 text-xs mb-3">{plan.subtitle}</div>
                <ul className="space-y-1">
                  {plan.items?.slice(0, 4).map((item, j) => (
                    <li key={j} className="text-white text-xs flex items-start gap-2">
                      <span className="text-amber-400">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Page 7: Contact - Always show
  pages.push(
    <div key="contact" className="slide bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-12">
      <div className="text-center">
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
        <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
        <p className="text-xl text-slate-300 mb-8">Ready to bring results-driven sales leadership to your team?</p>
        <div className="flex flex-col items-center gap-3 mb-8">
          {person.email && (
            <div className="flex items-center gap-2 text-lg text-slate-300">
              <Mail className="w-5 h-5 text-amber-400" />
              {person.email}
            </div>
          )}
          {person.phone && (
            <div className="flex items-center gap-2 text-lg text-slate-300">
              <Phone className="w-5 h-5 text-amber-400" />
              {person.phone}
            </div>
          )}
        </div>
        <div className="text-3xl font-bold text-amber-400">Thank You</div>
        <div className="w-20 h-1 bg-amber-500 mx-auto mt-8" />
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Action Bar - Hidden in Print */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between no-print">
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

      {/* All slides */}
      {pages}

      {/* Styles */}
      <style>{`
        .slide {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          box-sizing: border-box;
        }
        
        .no-print {
          display: flex;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .slide {
            width: 100vw !important;
            height: 100vh !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          .slide:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
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