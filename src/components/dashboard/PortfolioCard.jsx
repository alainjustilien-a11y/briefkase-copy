import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Award } from "lucide-react";

export default function PortfolioCard({ person, index }) {
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