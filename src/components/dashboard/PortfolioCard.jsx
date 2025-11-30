import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/25549073/ukizo90/";

export default function PortfolioCard({ person, index }) {
  const [sendingToZapier, setSendingToZapier] = useState(false);

  const handleSendToZapier = async () => {
    setSendingToZapier(true);
    try {
      const payload = {
        id: person.id,
        full_name: person.full_name,
        title: person.title,
        email: person.email,
        phone: person.phone,
        photo_url: person.photo_url,
        summary: person.summary,
        resume_url: person.resume_url,
        template: person.template,
        skills: person.skills || [],
        achievements: person.achievements || [],
        hobbies: person.hobbies || [],
        experience: person.experience || [],
        education: person.education || [],
        day_plan: person.day_plan || {},
        case_study: person.case_study || {},
        created_date: person.created_date,
        updated_date: person.updated_date,
        created_by: person.created_by,
        portfolio_url: `${window.location.origin}/Portfolio?id=${person.id}`,
      };

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      toast.success(`Sent ${person.full_name}'s portfolio to Zapier!`);
    } catch (error) {
      console.error('Zapier error:', error);
      toast.error('Failed to send to Zapier');
    }
    setSendingToZapier(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden bg-white border-slate-200 hover:shadow-2xl transition-all duration-500">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
          {person.photo_url && (
            <img
              src={person.photo_url}
              alt={person.full_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-1">{person.full_name}</h3>
            <p className="text-amber-400 font-semibold">{person.title}</p>
          </div>
        </div>
        
        <div className="p-6">
          {person.skills && person.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {person.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {person.skills.length > 3 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                  +{person.skills.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Link to={createPageUrl("Portfolio") + `?id=${person.id}`} className="flex-1">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl border-slate-300"
              onClick={handleSendToZapier}
              disabled={sendingToZapier}
              title="Send to Zapier"
            >
              {sendingToZapier ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-300">
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}